import { ReactNode, useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { RarityTheme } from '../../theme/rarity';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface CardEntranceProps {
  theme: RarityTheme;
  children: ReactNode;
}

// Entrance + idle float for the card on the viewer screen. Both are read from the rarity table:
//   entrance → where the card starts (below, small, turned around) and whether it springs
//   float    → how far it bobs up and down once it has arrived
//
// Re-mount it with a new `key` to replay the entrance (CardScreen does that on Prev / Next).
export function CardEntrance({ theme, children }: CardEntranceProps) {
  const { entrance, float } = theme;
  const reduceMotion = useReducedMotion();
  const enter = useRef(new Animated.Value(0)).current;
  const bob = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (reduceMotion) {
      enter.setValue(1);
      return;
    }

    const intro = entrance.spring
      ? Animated.spring(enter, { toValue: 1, friction: 5, tension: 36, useNativeDriver: true })
      : Animated.timing(enter, { toValue: 1, duration: 650, easing: Easing.out(Easing.cubic), useNativeDriver: true });
    intro.start();

    return () => intro.stop();
  }, [reduceMotion, entrance.spring, enter]);

  useEffect(() => {
    if (reduceMotion || float === 0) return;

    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(bob, { toValue: 1, duration: 2000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(bob, { toValue: 0, duration: 2000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ])
    );
    loop.start();

    return () => loop.stop();
  }, [reduceMotion, float, bob]);

  // A card that starts turned around must stay invisible until its front is facing us (past 90°).
  const flips = entrance.rotateY !== 0;
  const opacity = enter.interpolate({
    inputRange: flips ? [0.4, 0.5] : [0, 0.4],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={{
        opacity,
        transform: [
          { perspective: 900 },
          { translateY: enter.interpolate({ inputRange: [0, 1], outputRange: [entrance.translateY, 0] }) },
          { translateY: bob.interpolate({ inputRange: [0, 1], outputRange: [float, -float] }) },
          { scale: enter.interpolate({ inputRange: [0, 1], outputRange: [entrance.scale, 1] }) },
          { rotateY: enter.interpolate({ inputRange: [0, 1], outputRange: [`${entrance.rotateY}deg`, '0deg'] }) },
        ],
      }}
    >
      {children}
    </Animated.View>
  );
}
