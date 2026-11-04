import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import type { SharedValue } from 'react-native-reanimated';

import { LAYOUT, SMILE_ASPECT } from '../phases';
import { SmileMark } from './SmileMark';

type Props = {
  opacity: SharedValue<number>;
  peek: SharedValue<number>;
  launch: SharedValue<number>;
  launchTravel: number;
};

/**
 * Lives behind the bowl. Opacity gates visibility; peek is pure translateY
 * from buried under the rim to a small crest above it, then launch flies up.
 */
export function SmileLogo({
  opacity,
  peek,
  launch,
  launchTravel,
}: Props) {
  const base = LAYOUT.logoPeekSize;
  const height = base * SMILE_ASPECT;

  const style = useAnimatedStyle(() => {
    const size = interpolate(
      launch.value,
      [0, 1],
      [base, LAYOUT.logoTopSize],
      Extrapolation.CLAMP,
    );

    // Rim-centered: positive Y = deeper into bowl, negative = above rim
    const buriedY = height * 0.55;
    const peekY = -height * 0.16;
    const riseY = interpolate(peek.value, [0, 1], [buriedY, peekY]);
    const flyY = interpolate(launch.value, [0, 1], [0, -launchTravel]);

    return {
      opacity: opacity.value,
      left: (LAYOUT.bowlWidth - base) / 2,
      bottom: LAYOUT.bowlHeight - height * 0.5,
      transform: [
        { translateY: riseY + flyY },
        { scale: size / base },
      ],
    };
  });

  return (
    <Animated.View style={[styles.wrap, style]} pointerEvents="none">
      <SmileMark size={base} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    zIndex: 5,
  },
});
