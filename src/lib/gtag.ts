declare global {
  interface Window {
    gtag?: (type: "event", action: string, options: Record<string, any>) => void;
    fbq?: (...args: any[]) => void;
  }
}

export type TrackEventOptions = {
  category?: string;
  label?: string;
  value?: number;
  fbEventName?: string;
  fbParams?: Record<string, any>;
};

export const trackEvent = (
  action: string,
  { category, label, value, fbEventName, fbParams }: TrackEventOptions = {}
) => {
  if (typeof window !== "undefined") {
    if (typeof window.gtag === "function") {
      window.gtag("event", action, {
        event_category: category,
        event_label: label,
        value,
      });
    }

    if (typeof window.fbq === "function" && fbEventName) {
      window.fbq("track", fbEventName, fbParams || {});
    }
  }
};
