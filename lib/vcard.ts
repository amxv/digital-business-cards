import type { Contact } from '@/db/schema';
import { appConfig } from '@/lib/app-config';

export function generateVCard(contact: Contact): string {
  // Split name into first and last name for N field
  const nameParts = contact.nameEn.split(' ');
  const lastName = nameParts.length > 1 ? nameParts.pop() : '';
  const firstName = nameParts.join(' ');

  // Clean phone number (remove spaces for tel URI)
  const cleanPhone = contact.phone.replace(/\s+/g, '');

  const vcard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${contact.nameEn}`,
    `N:${lastName};${firstName};;;`,
    `ORG:${appConfig.organizationName}`,
    `TITLE:${contact.positionEn}`,
    `TEL;TYPE=CELL:${cleanPhone}`,
    `EMAIL:${contact.email}`,
    `URL:https://${contact.website || appConfig.defaultWebsite}`,
    `ADR;TYPE=WORK:;;${contact.location};;;;`,
    'END:VCARD',
  ].join('\r\n');

  return vcard;
}
