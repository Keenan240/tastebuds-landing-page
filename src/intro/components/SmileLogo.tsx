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
 * Hidden (opacity 0) until the empty-bowl beat. Then snaps on behind the rim
 * and rises a little via translateY before launching to the top.
 */
export function SmileLogo({
  opacity,
  peek,
  launch,
  launchTravel,
}: Props) {
  const style = useAnimatedStyle(() => {
    const base = LAYOUT.logoPeekSize;
    const top = LAYOUT.logoTopSize;
    const height = base * SMILE_ASPECT;

    const size = interpolate(
      launch.value,
      [0, 1],
      [base, top],
      Extrapolation.CLAMP,
    );
    const scale = size / base;

    // Buried deep under the rim → small crest above
    const peekOffset = interpolate(
      peek.value,
      [0, 1],
      [height * 0.85, -height * 0.2],
      Extrapolation.CLAMP,
    );

    const launchOffset = interpolate(
      launch.value,
      [0, 1],
      [0, -launchTravel],
      Extrapolation.CLAMP,
    );

    return {
      opacity: opacity.value,
      left: (LAYOUT.bowlWidth - base) / 2,
      bottom: LAYOUT.bowlHeight + peekOffset,
      transform: [{ translateY: launchOffset }, { scale }],
    };
  });

  return (
    <Animated.View style={[styles.wrap, style]} pointerEvents="none">
      <SmileMark size={LAYOUT.logoPeekSize} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    zIndex: 5,
  },
});
