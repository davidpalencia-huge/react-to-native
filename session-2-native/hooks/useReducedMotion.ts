import { useEffect, useState } from 'react';
import { AccessibilityInfo } from 'react-native';

// The RN version of `@media (prefers-reduced-motion: reduce)`.
// iOS: Settings → Accessibility → Motion → Reduce Motion
// Android: Settings → Accessibility → Remove animations
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    let mounted = true;

    AccessibilityInfo.isReduceMotionEnabled().then(enabled => {
      if (mounted) setReduced(enabled);
    });
    const subscription = AccessibilityInfo.addEventListener('reduceMotionChanged', setReduced);

    return () => {
      mounted = false;
      subscription.remove();
    };
  }, []);

  return reduced;
}
