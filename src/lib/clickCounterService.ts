// src/lib/clickCounterService.ts

const CLICK_COUNT_KEY = "swapsc:product-click-count";
const CLICK_THRESHOLD = 2; // Show popup after this many clicks

/**
 * Get the current click count
 */
export function getClickCount(): number {
  if (typeof window === "undefined" || typeof window.localStorage === "undefined") {
    return 0;
  }

  const stored = window.localStorage.getItem(CLICK_COUNT_KEY);
  return stored ? parseInt(stored, 10) : 0;
}

/**
 * Increment the click count and return the new count
 */
export function incrementClickCount(): number {
  const current = getClickCount();
  const newCount = current + 1;
  
  if (typeof window !== "undefined" && typeof window.localStorage !== "undefined") {
    window.localStorage.setItem(CLICK_COUNT_KEY, newCount.toString());
  }
  
  return newCount;
}

/**
 * Check if we should show the recommendation popup
 * Returns true if user has clicked enough times
 */
export function shouldShowRecommendations(): boolean {
  const count = getClickCount();
  return count >= CLICK_THRESHOLD;
}

/**
 * Reset the click count (optional - for testing or session reset)
 */
export function resetClickCount(): void {
  if (typeof window !== "undefined" && typeof window.localStorage !== "undefined") {
    window.localStorage.removeItem(CLICK_COUNT_KEY);
  }
}

/**
 * Get the number of clicks remaining before popup shows
 */
export function getClicksRemaining(): number {
  const count = getClickCount();
  return Math.max(0, CLICK_THRESHOLD - count);
}
