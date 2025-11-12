const STORAGE_KEY = "swapsc:last-listing-click";
export const LISTING_CLICK_EVENT = "listing:click";

export type ListingClickPayload = {
  id: string;
  name: string;
  clickedAt: string;
};

const hasWindow = () => typeof window !== "undefined" && typeof window.localStorage !== "undefined";

export const recordListingClick = (payload: ListingClickPayload) => {
  if (!hasWindow()) return;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch (err) {
    console.error("Unable to cache last listing click:", err);
  }

  window.dispatchEvent(new CustomEvent<ListingClickPayload>(LISTING_CLICK_EVENT, { detail: payload }));
};

export const getLastListingClick = (): ListingClickPayload | null => {
  if (!hasWindow()) return null;

  const cached = window.localStorage.getItem(STORAGE_KEY);
  if (!cached) return null;

  try {
    return JSON.parse(cached) as ListingClickPayload;
  } catch {
    return null;
  }
};

export const subscribeToListingClicks = (
  handler: (payload: ListingClickPayload) => void,
) => {
  if (!hasWindow()) return () => undefined;

  const listener = (event: Event) => {
    const { detail } = event as CustomEvent<ListingClickPayload>;
    handler(detail);
  };

  window.addEventListener(LISTING_CLICK_EVENT, listener as EventListener);

  return () => {
    window.removeEventListener(LISTING_CLICK_EVENT, listener as EventListener);
  };
};
