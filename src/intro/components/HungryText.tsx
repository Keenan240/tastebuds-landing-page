import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';
import type { SharedValue } from 'react-native-reanimated';
import { BlurView } from 'expo-blur';

import { COLORS, HUNGRY_TEXT, LAYOUT } from '../phases';

type Props = {
  typedLength: number;
  soften: SharedValue<number>;
  blur: SharedValue<number>;
  fontFamily?: string;
};

export function HungryText({
  typedLength,
  soften,
  blur,
  fontFamily,
}: Props) {
  const visible = HUNGRY_TEXT.slice(0, typedLength);

  const textStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      soften.value,
      [0, 1],
      [COLORS.brown, COLORS.beige],
    ),
    opacity: 1 - blur.value * 0.35,
  }));

  const blurOverlayStyle = useAnimatedStyle(() => ({
    opacity: blur.value,
  }));

  if (typedLength <= 0) {
    return null;
  }

  return (
    <View style={styles.wrap} pointerEvents="none">
      <Animated.Text
        style={[
          styles.text,
          fontFamily ? { fontFamily } : null,
          textStyle,
        ]}
      >
        {visible}
      </Animated.Text>
      <Animated.View style={[styles.blurOverlay, blurOverlayStyle]}>
        {Platform.OS === 'web' ? (
          <View style={styles.webBlur} />
        ) : (
          <BlurView intensity={28} tint="light" style={StyleSheet.absoluteFill} />
        )}
        <Text
          style={[
            styles.text,
            styles.blurredCopy,
            fontFamily ? { fontFamily } : null,
          ]}
        >
          {HUNGRY_TEXT}
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 24,
    right: 24,
    top: '26%',
    zIndex: 5,
  },
  text: {
    fontSize: LAYOUT.hungryFontSize,
    lineHeight: LAYOUT.hungryLineHeight,
    fontWeight: '600',
    letterSpacing: -1.2,
  },
  blurOverlay: {
    ...StyleSheet.absoluteFill,
    overflow: 'hidden',
  },
  webBlur: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(253, 251, 244, 0.35)',
  },
  blurredCopy: {
    color: COLORS.beige,
    opacity: 0.85,
  },
});
