import { CONTACT, MESSAGES } from '../content/site';

export const whatsappHref = (message: string = MESSAGES.default) =>
  `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`;

export const mailHref = (subject: string = MESSAGES.emailSubject, body: string = MESSAGES.emailBody) =>
  `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
