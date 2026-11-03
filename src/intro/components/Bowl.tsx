import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import type { SharedValue } from 'react-native-reanimated';

import { COLORS, LAYOUT } from '../phases';

type Props = {
  rotate: SharedValue<number>;
  translateY: SharedValue<number>;
  opacity: SharedValue<number>;
  children?: React.ReactNode;
};

/** Dark brown semicircle bowl with overflow clip so contents peek above the rim. */
export function Bowl({ rotate, translateY, opacity, children }: Props) {
  const shellStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateY: translateY.value },
      { rotate: `${rotate.value}deg` },
    ],
  }));

  return (
    <Animated.View style={[styles.shell, shellStyle]}>
      {/* Peek zone above the rim — children live here, clipped to bowl silhouette via mask stack */}
      <View style={styles.stage} pointerEvents="none">
        {children}
      </View>
      <View style={styles.bowl} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  shell: {
    width: LAYOUT.bowlWidth,
    height: LAYOUT.bowlHeight + 70,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  stage: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: LAYOUT.bowlHeight - 8,
  },
  bowl: {
    width: LAYOUT.bowlWidth,
    height: LAYOUT.bowlHeight,
    backgroundColor: COLORS.brown,
    borderBottomLeftRadius: LAYOUT.bowlWidth / 2,
    borderBottomRightRadius: LAYOUT.bowlWidth / 2,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
});
