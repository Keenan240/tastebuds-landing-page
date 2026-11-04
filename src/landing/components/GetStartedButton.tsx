import React from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { LANDING } from '../tokens';

type Props = {
  label?: string;
  variant?: 'carrot' | 'cocoa';
  style?: ViewStyle;
  onPress?: () => void;
};

/** Right-pointing arrow built from Views (reliable on RN web). */
function ArrowRight({ color }: { color: string }) {
  return (
    <View style={styles.arrow} accessibilityElementsHidden>
      <View style={[styles.arrowShaft, { backgroundColor: color }]} />
      <View
        style={[
          styles.arrowHead,
          { borderLeftColor: color },
        ]}
      />
    </View>
  );
}

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
        <ArrowRight color={LANDING.bg} />
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
    width: 16,
    height: 12,
    justifyContent: 'center',
  },
  arrowShaft: {
    position: 'absolute',
    left: 0,
    right: 5,
    height: 2,
    borderRadius: 1,
    top: 5,
  },
  arrowHead: {
    position: 'absolute',
    right: 0,
    top: 1,
    width: 0,
    height: 0,
    borderTopWidth: 5,
    borderBottomWidth: 5,
    borderLeftWidth: 7,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
  },
});
