import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

import { SMILE_ASPECT } from '../phases';

type Props = {
  /** Width in px. Height is derived from the asset aspect — never warped. */
  size: number;
};

/**
 * Brand smile from the provided asset. Only uniform scale via `size`.
 */
export function SmileMark({ size }: Props) {
  const height = size * SMILE_ASPECT;
  return (
    <View style={{ width: size, height }}>
      <Image
        source={require('../../../assets/intro/smile.png')}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
});
