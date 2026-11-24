const activeScrollLocks = new Set<symbol>();
let previousBodyOverflow: string | null = null;

export function acquireBodyScrollLock(): () => void {
  if (typeof document === 'undefined') {
    return () => {};
  }

  const token = Symbol('body-scroll-lock');
  if (activeScrollLocks.size === 0) {
    previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }
  activeScrollLocks.add(token);

  let released = false;
  return () => {
    if (released) return;
    released = true;
    activeScrollLocks.delete(token);
    if (activeScrollLocks.size === 0 && typeof document !== 'undefined') {
      document.body.style.overflow = previousBodyOverflow ?? '';
      previousBodyOverflow = null;
    }
  };
}
