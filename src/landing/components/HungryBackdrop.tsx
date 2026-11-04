import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

import { HUNGRY_BACKDROP } from '../tokens';

/** Blurred atmospheric “you hungryyyyy…” behind the hero (Figma Part 2). */
export function HungryBackdrop() {
  return (
    <View style={styles.wrap} pointerEvents="none">
      {HUNGRY_BACKDROP.lines.map((line, i) => (
        <Text
          key={line}
          style={[
            styles.line,
            i === 1 && styles.line2,
            i === 2 && styles.line3,
            Platform.OS === 'web' ? styles.webBlur : null,
          ]}
        >
          {line}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: -40,
    right: -40,
    top: 200,
    zIndex: 0,
    alignItems: 'center',
  },
  line: {
    color: HUNGRY_BACKDROP.color,
    fontSize: HUNGRY_BACKDROP.fontSize,
    lineHeight: HUNGRY_BACKDROP.lineHeight,
    fontFamily: 'Urbanist_600SemiBold',
    fontWeight: '600',
    textAlign: 'center',
    opacity: Platform.OS === 'web' ? 1 : 0.55,
  },
  line2: {
    marginLeft: 40,
  },
  line3: {
    marginLeft: -40,
  },
  webBlur: {
    ...Platform.select({
      web: { filter: `blur(${HUNGRY_BACKDROP.blur}px)` } as object,
      default: {},
    }),
  },
});
