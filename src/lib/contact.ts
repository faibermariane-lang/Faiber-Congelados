import { CONTACT, MESSAGES } from '@/content';

export const whatsappHref = (text: string = MESSAGES.default) =>
  `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(text)}`;

export const mailHref = (subject = 'Contato pelo site') =>
  `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}`;
