import { hasAnalyticsConsent } from "@/lib/cookieConsent";

export const trackEvent = (eventName: string, params: Record<string, unknown> = {}) => {
  if (typeof window === "undefined") return;
  if (!hasAnalyticsConsent()) return;

  const gtag = (window as any).gtag;
  if (typeof gtag !== "function") return;

  gtag("event", eventName, params);
};
