import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { LANDING } from '../tokens';

/** Soft carrot wave field behind the dish match card (Figma). */
export function OrangeWaves() {
  const rows = 9;
  return (
    <View style={styles.wrap} pointerEvents="none">
      <Svg
        width="100%"
        height="100%"
        viewBox="0 0 402 480"
        preserveAspectRatio="xMidYMid slice"
      >
        {Array.from({ length: rows }, (_, i) => {
          const y = 24 + i * 52;
          const flip = i % 2 === 0 ? 1 : -1;
          return (
            <Path
              key={i}
              d={`M-40 ${y} C 50 ${y - 34 * flip}, 130 ${y + 34 * flip}, 210 ${y} S 330 ${y - 30 * flip}, 450 ${y + 6 * flip}`}
              stroke={LANDING.carrot}
              strokeWidth={22}
              strokeLinecap="round"
              opacity={0.28 + (i % 4) * 0.05}
              fill="none"
            />
          );
        })}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    overflow: 'hidden',
  },
});
