export const CONTACT_FORM_ENDPOINT = import.meta.env.VITE_CONTACT_FORM_ENDPOINT as string | undefined;
export const NEWSLETTER_FORM_ENDPOINT = import.meta.env.VITE_NEWSLETTER_FORM_ENDPOINT as string | undefined;

export const hasContactEndpoint = Boolean(CONTACT_FORM_ENDPOINT);
export const hasNewsletterEndpoint = Boolean(NEWSLETTER_FORM_ENDPOINT);
