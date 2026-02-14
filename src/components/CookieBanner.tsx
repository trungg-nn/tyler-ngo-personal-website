import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { applyCookieConsent, getCookieConsent, initCookieConsent } from "@/lib/cookieConsent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showManage, setShowManage] = useState(false);
  const [showWhy, setShowWhy] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);

  useEffect(() => {
    initCookieConsent();
    const existing = getCookieConsent();
    if (existing === "accepted") setAnalyticsEnabled(true);
    if (existing === "rejected") setAnalyticsEnabled(false);

    if (existing === null) {
      const timer = window.setTimeout(() => setVisible(true), 2500);
      return () => window.clearTimeout(timer);
    }
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-3 bottom-3 z-[220] rounded-2xl border border-border bg-card/95 p-4 shadow-2xl backdrop-blur md:inset-x-auto md:right-6 md:max-w-md">
      <p className="text-sm text-muted-foreground">
        We use cookies to keep the site secure and improve content with privacy-safe analytics. No ad personalization.
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        See details in our <Link to="/cookies-policy" className="text-foreground underline">Cookies Policy</Link>.{" "}
        <button type="button" onClick={() => setShowWhy((v) => !v)} className="underline">
          Why we use analytics
        </button>
      </p>

      {showWhy && (
        <div className="mt-3 rounded-xl border border-border/70 bg-background/70 p-3 text-xs leading-5 text-muted-foreground">
          We use analytics to understand which pages help readers most, where users drop off, and which content to improve next. We do not use ad personalization cookies, and data is used in aggregate for site improvement.
        </div>
      )}

      {!showManage ? (
        <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
          <button
            type="button"
            onClick={() => setShowManage(true)}
            className="rounded-xl border border-border px-3 py-2 text-sm"
          >
            Manage
          </button>
          <button
            type="button"
            onClick={() => {
              applyCookieConsent("rejected");
              setVisible(false);
            }}
            className="rounded-xl border border-border px-3 py-2 text-sm"
          >
            Reject
          </button>
          <button
            type="button"
            onClick={() => {
              applyCookieConsent("accepted");
              setVisible(false);
            }}
            className="cta-btn rounded-xl px-3 py-2 text-sm font-medium"
          >
            Accept all
          </button>
        </div>
      ) : (
        <div className="mt-3 rounded-xl border border-border/70 p-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-foreground">Analytics cookies</p>
              <p className="text-xs text-muted-foreground">Help us understand what content performs best.</p>
            </div>
            <button
              type="button"
              onClick={() => setAnalyticsEnabled((v) => !v)}
              className={`h-7 w-12 rounded-full p-1 transition ${analyticsEnabled ? "bg-primary" : "bg-muted"}`}
              aria-pressed={analyticsEnabled}
            >
              <span className={`block h-5 w-5 rounded-full bg-white transition ${analyticsEnabled ? "translate-x-5" : "translate-x-0"}`} />
            </button>
          </div>

          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={() => setShowManage(false)}
              className="flex-1 rounded-xl border border-border px-3 py-2 text-sm"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => {
                applyCookieConsent(analyticsEnabled ? "accepted" : "rejected");
                setVisible(false);
              }}
              className="cta-btn flex-1 rounded-xl px-3 py-2 text-sm font-medium"
            >
              Save preferences
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
