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
  shrink: SharedValue<number>;
  launchTravel: number;
};

/**
 * Starts fully tucked behind the bowl rim, then rises a short distance to peek.
 * No fade-in — motion is pure translateY. Opacity only used at handoff.
 */
export function SmileLogo({
  opacity,
  peek,
  launch,
  shrink,
  launchTravel,
}: Props) {
  const style = useAnimatedStyle(() => {
    const base = LAYOUT.logoPeekSize;
    const top = LAYOUT.logoTopSize;
    const final = LAYOUT.logoFinalSize;

    const targetWidth = interpolate(
      shrink.value,
      [0, 1],
      [interpolate(launch.value, [0, 1], [base, top]), final],
      Extrapolation.CLAMP,
    );

    const scale = targetWidth / base;
    const height = base * SMILE_ASPECT;

    // 0 = buried under the rim; 1 = just a small crest showing above
    const peekOffset = interpolate(
      peek.value,
      [0, 1],
      [height * 0.72, -height * 0.22],
      Extrapolation.CLAMP,
    );

    const launchOffset = interpolate(
      launch.value,
      [0, 1],
      [0, -launchTravel],
      Extrapolation.CLAMP,
    );

    const shrinkNudge = interpolate(shrink.value, [0, 1], [0, -8]);

    return {
      opacity: opacity.value,
      left: (LAYOUT.bowlWidth - base) / 2,
      bottom: LAYOUT.bowlHeight + peekOffset,
      transform: [
        { translateY: launchOffset + shrinkNudge },
        { scale },
      ],
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
