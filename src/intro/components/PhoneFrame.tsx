import React from 'react';
import { Platform, StyleSheet, useWindowDimensions, View } from 'react-native';

import { COLORS, IPHONE } from '../phases';

type Props = {
  children: React.ReactNode;
};

/**
 * On wide desktop viewports, cradle the app in an iPhone-sized frame so you
 * can inspect the mobile POV without DevTools. On real phones / narrow windows,
 * fill the viewport (PWA / add-to-home-screen path).
 */
export function PhoneFrame({ children }: Props) {
  const { width, height } = useWindowDimensions();
  const useFrame =
    Platform.OS === 'web' && width >= IPHONE.width + 48 && height >= 600;

  if (!useFrame) {
    return <View style={styles.fill}>{children}</View>;
  }

  return (
    <View style={styles.desktop}>
      <View style={styles.bezel}>
        <View style={styles.dynamicIsland} />
        <View style={styles.screen}>{children}</View>
      </View>
      <View style={styles.hint} />
    </View>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  desktop: {
    flex: 1,
    backgroundColor: COLORS.desktopBackdrop,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
  },
  bezel: {
    width: IPHONE.width,
    height: IPHONE.height,
    borderRadius: IPHONE.radius,
    backgroundColor: '#111',
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.28,
    shadowRadius: 28,
    shadowOffset: { width: 0, height: 16 },
  },
  dynamicIsland: {
    position: 'absolute',
    top: 18,
    alignSelf: 'center',
    left: IPHONE.width / 2 - 58,
    width: 116,
    height: 34,
    borderRadius: 20,
    backgroundColor: '#0A0A0A',
    zIndex: 50,
  },
  screen: {
    flex: 1,
    borderRadius: IPHONE.radius - 8,
    overflow: 'hidden',
    backgroundColor: COLORS.background,
  },
  hint: {
    height: 0,
  },
});
