import React from 'react';
import { StyleSheet, View } from 'react-native';

import { TastebudsLogo } from './TastebudsLogo';

type Props = {
  size?: 'hero' | 'footer';
};

export function BrandWordmark({ size = 'hero' }: Props) {
  return (
    <View style={styles.wrap}>
      <TastebudsLogo width={size === 'hero' ? 175 : 150} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
  },
});
