import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { SmileMark } from '../../intro/components/SmileMark';
import { LANDING } from '../tokens';

type Props = {
  size?: 'hero' | 'footer';
};

export function BrandWordmark({ size = 'hero' }: Props) {
  const icon = size === 'hero' ? 28 : 24;
  const textSize = size === 'hero' ? 28 : 22;
  const color = size === 'footer' ? LANDING.carrot : LANDING.carrot;

  return (
    <View style={styles.row}>
      <SmileMark size={icon} />
      <Text style={[styles.name, { fontSize: textSize, color }]}>Tastebuds</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  name: {
    fontFamily: 'Urbanist_600SemiBold',
    fontWeight: '600',
    letterSpacing: -0.4,
  },
});
