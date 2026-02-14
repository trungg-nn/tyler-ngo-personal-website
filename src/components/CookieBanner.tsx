import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { applyCookieConsent, getCookieConsent, initCookieConsent } from "@/lib/cookieConsent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    initCookieConsent();
    setVisible(getCookieConsent() === null);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-3 bottom-3 z-[220] rounded-2xl border border-border bg-card/95 p-4 shadow-2xl backdrop-blur md:inset-x-auto md:right-6 md:max-w-md">
      <p className="text-sm text-muted-foreground">
        We use cookies for essential functionality and analytics. You can review details in our{" "}
        <Link to="/cookies-policy" className="text-foreground underline">Cookies Policy</Link>.
      </p>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => {
            applyCookieConsent("rejected");
            setVisible(false);
          }}
          className="flex-1 rounded-xl border border-border px-3 py-2 text-sm"
        >
          Reject
        </button>
        <button
          type="button"
          onClick={() => {
            applyCookieConsent("accepted");
            setVisible(false);
          }}
          className="cta-btn flex-1 rounded-xl px-3 py-2 text-sm font-medium"
        >
          Accept cookies
        </button>
      </div>
    </div>
  );
}
