import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import type { SharedValue } from 'react-native-reanimated';

import { LAYOUT } from '../phases';
import { SmileMark } from './SmileMark';

type Props = {
  opacity: SharedValue<number>;
  peek: SharedValue<number>;
  launch: SharedValue<number>;
  shrink: SharedValue<number>;
  /** Distance from bowl rim up to the final top logo position. */
  launchTravel: number;
};

/**
 * Lives in the bowl stage under the bowl silhouette so the smile peeks
 * from behind the rim, then launches upward past it.
 */
export function SmileLogo({
  opacity,
  peek,
  launch,
  shrink,
  launchTravel,
}: Props) {
  const style = useAnimatedStyle(() => {
    const peekSize = LAYOUT.logoPeekSize;
    const topSize = LAYOUT.logoTopSize;
    const finalSize = LAYOUT.logoFinalSize;

    const size = interpolate(
      shrink.value,
      [0, 1],
      [
        interpolate(launch.value, [0, 1], [peekSize, topSize]),
        finalSize,
      ],
      Extrapolation.CLAMP,
    );

    // Peek: rise from inside bowl (-size) to mostly above rim
    const peekOffset = interpolate(
      peek.value,
      [0, 1],
      [size * 0.55, -size * 0.62],
      Extrapolation.CLAMP,
    );

    const launchOffset = interpolate(
      launch.value,
      [0, 1],
      [0, -launchTravel],
      Extrapolation.CLAMP,
    );

    const shrinkNudge = interpolate(shrink.value, [0, 1], [0, -10]);

    return {
      opacity: opacity.value,
      width: size,
      height: size * 1.25,
      left: (LAYOUT.bowlWidth - size) / 2,
      bottom: LAYOUT.bowlHeight + peekOffset,
      transform: [
        { translateY: launchOffset + shrinkNudge },
        {
          scale: interpolate(peek.value, [0, 0.7, 1], [0.55, 1.1, 1]),
        },
      ],
    };
  });

  return (
    <Animated.View style={[styles.wrap, style]} pointerEvents="none">
      <SmileMark width="100%" height="100%" />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    zIndex: 8,
  },
});
