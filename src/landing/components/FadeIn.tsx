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
 * Opacity 0 → 1 with a slight rise on mount. Each landing unit uses this so
 * the page blooms as pieces, not as one fading sheet.
 */
export function FadeIn({
  children,
  style,
  duration = ENTRANCE.duration,
  pointerEvents,
}: Props) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(1, {
      duration,
      easing: Easing.out(Easing.cubic),
    });
  }, [duration, progress]);

  const anim = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [
      { translateY: (1 - progress.value) * ENTRANCE.rise },
    ],
  }));

  return (
    <Animated.View style={[style, anim]} pointerEvents={pointerEvents}>
      {children}
    </Animated.View>
  );
}
