import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { generateReferenceCode, generatePIN, hashPIN } from '@/lib/utils';
import { smsManager } from '@/lib/sms';

type RequestType = 'COMPLAINT' | 'REPORT' | 'INFORMATION_REQUEST';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      type,
      isAnonymous,
      firstName,
      lastName,
      phone,
      email,
      region,
      city,
      description,
    } = body;

    if (!type || !phone || !region || !city || !description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const referenceCode = generateReferenceCode();
    const pin = generatePIN();
    const pinHash = await hashPIN(pin);

    const { data: ticket, error } = await supabase
      .from('request_tickets')
      .insert({
        reference_code: referenceCode,
        pin_hash: pinHash,
        type: type as RequestType,
        is_anonymous: Boolean(isAnonymous),
        first_name: isAnonymous ? null : firstName,
        last_name: isAnonymous ? null : lastName,
        phone,
        email: email || null,
        region,
        city,
        description,
        status: 'RECEIVED',
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating ticket:', error);
      throw error;
    }

    await smsManager.queueSMS(
      phone,
      `MSPI: Votre demande ${referenceCode} a été enregistrée. PIN: ${pin}. Conservez ce code pour suivre votre demande.`,
      'AIRTEL'
    );

    return NextResponse.json({
      success: true,
      referenceCode,
      pin,
      ticketId: ticket.id,
    });
  } catch (error) {
    console.error('Error submitting complaint:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
