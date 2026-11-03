import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import type { SharedValue } from 'react-native-reanimated';

import { COLORS, LAYOUT } from '../phases';

type Props = {
  rotate: SharedValue<number>;
  translateY: SharedValue<number>;
  opacity: SharedValue<number>;
};

/** Dark brown semicircle bowl. */
export function Bowl({ rotate, translateY, opacity }: Props) {
  const shellStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateY: translateY.value },
      { rotate: `${rotate.value}deg` },
    ],
  }));

  return (
    <Animated.View style={[styles.shell, shellStyle]}>
      <View style={styles.bowl} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  shell: {
    width: LAYOUT.bowlWidth,
    height: LAYOUT.bowlHeight,
    alignItems: 'center',
    justifyContent: 'flex-end',
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
