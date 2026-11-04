import React, { useEffect } from 'react';
import { StyleProp, ViewProps, ViewStyle } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

import { ENTRANCE } from '../tokens';

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  /** Cascade order from the top of the page (0 = first). */
  index?: number;
  duration?: number;
  pointerEvents?: ViewProps['pointerEvents'];
};

/**
 * Opacity 0 → 1 with a slight rise, delayed by `index` so pieces cascade
 * top → bottom instead of blooming all at once.
 */
export function FadeIn({
  children,
  style,
  index = 0,
  duration = ENTRANCE.duration,
  pointerEvents,
}: Props) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(
      index * ENTRANCE.stagger,
      withTiming(1, {
        duration,
        easing: Easing.out(Easing.cubic),
      }),
    );
  }, [duration, index, progress]);

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
