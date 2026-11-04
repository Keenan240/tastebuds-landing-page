import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { LANDING } from '../tokens';

type Props = {
  width?: number;
};

/**
 * Figma wordmark: lowercase “tastebūds” — smile-eyes stand in for the ū macron.
 */
export function TastebudsLogo({ width = 175 }: Props) {
  const height = width * 0.22;
  const fontSize = width * 0.185;
  // Eyes over the “u” in tastebuds (~letter 6 of 9)
  const eyesLeft = width * 0.555;
  const eyesTop = -width * 0.01;
  const eyesW = width * 0.11;
  const eyesH = width * 0.055;

  return (
    <View style={[styles.wrap, { width, height }]}>
      <Text
        style={[styles.text, { fontSize, lineHeight: fontSize * 1.2 }]}
        allowFontScaling={false}
      >
        tastebuds
      </Text>
      <Svg
        width={eyesW}
        height={eyesH}
        style={[styles.eyes, { left: eyesLeft, top: eyesTop }]}
        viewBox="0 0 24 12"
      >
        <Circle cx="6" cy="6" r="4.6" fill={LANDING.carrot} />
        <Circle cx="18" cy="6" r="4.6" fill={LANDING.carrot} />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
  },
  text: {
    color: LANDING.carrot,
    fontFamily: 'Urbanist_600SemiBold',
    fontWeight: '600',
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  eyes: {
    position: 'absolute',
  },
});
