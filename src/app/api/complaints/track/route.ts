import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { verifyPIN } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    const { referenceCode, pin } = await request.json();

    if (!referenceCode || !pin) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const { data: ticket, error } = await supabase
      .from('request_tickets')
      .select()
      .eq('reference_code', referenceCode)
      .maybeSingle();

    if (error) {
      console.error('Error fetching ticket:', error);
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }

    if (!ticket) {
      return NextResponse.json(
        { error: 'Ticket not found' },
        { status: 404 }
      );
    }

    const isPinValid = await verifyPIN(pin, ticket.pin_hash);

    if (!isPinValid) {
      return NextResponse.json(
        { error: 'Invalid PIN' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      ticket: {
        referenceCode: ticket.reference_code,
        type: ticket.type,
        status: ticket.status,
        createdAt: ticket.created_at,
        updatedAt: ticket.updated_at,
        lastPublicMessageFr: ticket.last_public_message_fr,
        lastPublicMessageAr: ticket.last_public_message_ar,
      },
    });
  } catch (error) {
    console.error('Error tracking complaint:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
