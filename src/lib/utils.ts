/**
 * Utility functions umum
 */

/**
 * Class name helper untuk conditional classes
 * Contoh: cn('px-2', isActive && 'bg-blue-500')
 */
export function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Delay helper untuk async operations
 * Contoh: await delay(1000)
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Check apakah device adalah mobile
 */
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

/**
 * Get current viewport width
 */
export function getViewportWidth(): number {
  if (typeof window === 'undefined') return 0;
  return window.innerWidth;
}

/**
 * Is tablet size screen (640px - 1024px)
 */
export function isTablet(): boolean {
  const width = getViewportWidth();
  return width >= 640 && width < 1024;
}

/**
 * Is desktop size screen (1024px+)
 */
export function isDesktop(): boolean {
  return getViewportWidth() >= 1024;
}
