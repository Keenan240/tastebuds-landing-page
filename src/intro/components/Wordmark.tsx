import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import type { SharedValue } from 'react-native-reanimated';

import { COLORS, LAYOUT } from '../phases';
import { SmileMark } from './SmileMark';

type Props = {
  opacity: SharedValue<number>;
  fontFamily?: string;
};

/** Composed Tastebuds wordmark: smile icon + brand name. */
export function Wordmark({ opacity, fontFamily }: Props) {
  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateY: (1 - opacity.value) * -6 },
      { scale: 0.94 + opacity.value * 0.06 },
    ],
  }));

  return (
    <Animated.View style={[styles.wrap, style]} pointerEvents="none">
      <View style={styles.row}>
        <SmileMark width={28} height={34} />
        <Text style={[styles.name, fontFamily ? { fontFamily } : null]}>
          Tastebuds
        </Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    top: LAYOUT.logoFinalOffset - 2,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 25,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  name: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.brown,
    letterSpacing: -0.3,
  },
});
