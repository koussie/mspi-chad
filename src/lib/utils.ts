import { customAlphabet } from 'nanoid';
import bcrypt from 'bcryptjs';

export function generateReferenceCode(): string {
  const year = new Date().getFullYear();
  const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', 6);
  return `MSP-${year}-${nanoid()}`;
}

export function generatePIN(): string {
  const nanoid = customAlphabet('0123456789', 6);
  return nanoid();
}

export async function hashPIN(pin: string): Promise<string> {
  return bcrypt.hash(pin, 10);
}

export async function verifyPIN(pin: string, hash: string): Promise<boolean> {
  return bcrypt.compare(pin, hash);
}

export function formatDate(date: Date, locale: string): string {
  return new Intl.DateTimeFormat(locale === 'fr' ? 'fr-FR' : 'ar-TN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}
