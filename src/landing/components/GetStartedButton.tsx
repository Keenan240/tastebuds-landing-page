import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';

import { LANDING } from '../tokens';

const ARROW_RIGHT = require('../../../assets/landing/arrow-right.png');

type Props = {
  label?: string;
  variant?: 'carrot' | 'cocoa';
  style?: ViewStyle;
  onPress?: () => void;
};

export function GetStartedButton({
  label = 'Get Started',
  variant = 'carrot',
  style,
  onPress,
}: Props) {
  const isCarrot = variant === 'carrot';
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.btn,
        isCarrot ? styles.carrot : styles.cocoa,
        pressed && styles.pressed,
        style,
      ]}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <View style={styles.content}>
        <Text style={styles.label}>{label}</Text>
        <Image
          source={ARROW_RIGHT}
          style={styles.arrow}
          resizeMode="contain"
          accessibilityElementsHidden
          importantForAccessibility="no"
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    minHeight: 52,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: LANDING.buttonBorder,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 3,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  carrot: {
    backgroundColor: LANDING.carrot,
    shadowColor: LANDING.carrotShadow,
  },
  cocoa: {
    backgroundColor: LANDING.cocoa,
    shadowColor: LANDING.carrotShadow,
  },
  pressed: {
    transform: [{ translateY: 1 }],
    shadowOffset: { width: 0, height: 1 },
  },
  label: {
    color: LANDING.bg,
    fontSize: 16,
    fontFamily: 'Urbanist_600SemiBold',
  },
  arrow: {
    width: 18,
    height: 18,
  },
});
