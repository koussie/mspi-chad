import { supabase } from './supabase';

type SmsProvider = 'AIRTEL' | 'MOOV';

export interface SmsService {
  sendSMS(phone: string, message: string): Promise<boolean>;
}

class AirtelProvider implements SmsService {
  async sendSMS(phone: string, message: string): Promise<boolean> {
    console.log('[Airtel] SMS would be sent to:', phone);
    console.log('[Airtel] Message:', message);
    return false;
  }
}

class MoovProvider implements SmsService {
  async sendSMS(phone: string, message: string): Promise<boolean> {
    console.log('[Moov] SMS would be sent to:', phone);
    console.log('[Moov] Message:', message);
    return false;
  }
}

export class SmsManager {
  private smsEnabled: boolean;
  private providers: Map<SmsProvider, SmsService>;

  constructor() {
    this.smsEnabled = process.env.SMS_ENABLED === 'true';
    this.providers = new Map();
    this.providers.set('AIRTEL', new AirtelProvider());
    this.providers.set('MOOV', new MoovProvider());
  }

  async queueSMS(
    phone: string,
    message: string,
    providerHint?: SmsProvider
  ): Promise<void> {
    await supabase
      .from('sms_outbox')
      .insert({
        phone,
        message,
        provider_hint: providerHint,
        status: 'PENDING',
      });

    console.log('[SMS] Queued SMS to:', phone);
  }

  async processPendingSMS(): Promise<void> {
    if (!this.smsEnabled) {
      console.log('[SMS] SMS sending is disabled. Check sms_outbox table.');
      return;
    }

    const { data: pending } = await supabase
      .from('sms_outbox')
      .select()
      .eq('status', 'PENDING')
      .limit(10);

    if (!pending) return;

    for (const sms of pending) {
      try {
        const provider = this.providers.get(sms.provider_hint || 'AIRTEL');
        if (provider) {
          const success = await provider.sendSMS(sms.phone, sms.message);
          await supabase
            .from('sms_outbox')
            .update({ status: success ? 'SENT' : 'FAILED' })
            .eq('id', sms.id);
        }
      } catch (error) {
        await supabase
          .from('sms_outbox')
          .update({
            status: 'FAILED',
            last_error: error instanceof Error ? error.message : 'Unknown error',
          })
          .eq('id', sms.id);
      }
    }
  }
}

export const smsManager = new SmsManager();
