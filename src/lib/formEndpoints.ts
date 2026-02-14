const DEFAULT_INBOX = "tylerngo198@gmail.com";

const defaultContactEndpoint = `https://formsubmit.co/ajax/${DEFAULT_INBOX}`;
const defaultNewsletterEndpoint = `https://formsubmit.co/ajax/${DEFAULT_INBOX}`;

export const CONTACT_FORM_ENDPOINT =
  (import.meta.env.VITE_CONTACT_FORM_ENDPOINT as string | undefined) || defaultContactEndpoint;
export const NEWSLETTER_FORM_ENDPOINT =
  (import.meta.env.VITE_NEWSLETTER_FORM_ENDPOINT as string | undefined) || defaultNewsletterEndpoint;

export const hasContactEndpoint = Boolean(CONTACT_FORM_ENDPOINT);
export const hasNewsletterEndpoint = Boolean(NEWSLETTER_FORM_ENDPOINT);
