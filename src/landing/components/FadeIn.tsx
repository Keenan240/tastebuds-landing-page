import React, { useEffect } from 'react';
import { StyleProp, ViewProps, ViewStyle } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { ENTRANCE } from '../tokens';

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  /** All FadeIns on the landing share this default so they bloom together. */
  duration?: number;
  pointerEvents?: ViewProps['pointerEvents'];
};

/**
 * Opacity 0 → 1 on mount. Use one per visual unit so the page doesn’t
 * read as a single fading sheet.
 */
export function FadeIn({
  children,
  style,
  duration = ENTRANCE.duration,
  pointerEvents,
}: Props) {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, {
      duration,
      easing: Easing.out(Easing.cubic),
    });
  }, [duration, opacity]);

  const anim = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[style, anim]} pointerEvents={pointerEvents}>
      {children}
    </Animated.View>
  );
}
