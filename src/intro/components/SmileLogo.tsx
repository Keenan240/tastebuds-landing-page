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
  bowlRimY: number;
  screenWidth: number;
};

export function SmileLogo({
  opacity,
  peek,
  launch,
  shrink,
  bowlRimY,
  screenWidth,
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

    const peekY = interpolate(
      peek.value,
      [0, 1],
      [bowlRimY + 28, bowlRimY - peekSize * 0.55],
      Extrapolation.CLAMP,
    );

    const topY = interpolate(
      shrink.value,
      [0, 1],
      [LAYOUT.logoTopOffset, LAYOUT.logoFinalOffset],
      Extrapolation.CLAMP,
    );

    const y = interpolate(launch.value, [0, 1], [peekY, topY]);

    return {
      opacity: opacity.value,
      width: size,
      height: size * 1.25,
      left: screenWidth / 2 - size / 2,
      top: y,
      transform: [
        {
          scale: interpolate(peek.value, [0, 0.7, 1], [0.6, 1.08, 1]),
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
    zIndex: 20,
  },
});
