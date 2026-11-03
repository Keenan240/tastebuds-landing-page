import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import type { SharedValue } from 'react-native-reanimated';
import Svg, { Circle, Line, Path } from 'react-native-svg';

import { COLORS } from '../phases';

type Props = {
  opacity: SharedValue<number>;
  translateY: SharedValue<number>;
};

function SearchIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Circle cx="11" cy="11" r="6.5" stroke={COLORS.chromeIcon} strokeWidth={1.8} />
      <Line
        x1="16"
        y1="16"
        x2="21"
        y2="21"
        stroke={COLORS.chromeIcon}
        strokeWidth={1.8}
        strokeLinecap="round"
      />
    </Svg>
  );
}

function MicIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3Z"
        stroke={COLORS.chromeIcon}
        strokeWidth={1.8}
      />
      <Path
        d="M5 11a7 7 0 0 0 14 0M12 18v3"
        stroke={COLORS.chromeIcon}
        strokeWidth={1.8}
        strokeLinecap="round"
      />
    </Svg>
  );
}

function CloseIcon() {
  return (
    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
      <Line
        x1="6"
        y1="6"
        x2="18"
        y2="18"
        stroke={COLORS.brown}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Line
        x1="18"
        y1="6"
        x2="6"
        y2="18"
        stroke={COLORS.brown}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

/** Visual-only search bar + close control for intro handoff. */
export function LandingChrome({ opacity, translateY }: Props) {
  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[styles.wrap, style]}>
      <View style={styles.search}>
        <SearchIcon />
        <Text style={styles.placeholder}>Placeholder</Text>
        <MicIcon />
      </View>
      <View style={styles.close}>
        <CloseIcon />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 28,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    zIndex: 30,
  },
  search: {
    flex: 1,
    height: 52,
    borderRadius: 999,
    backgroundColor: COLORS.chromeBg,
    borderWidth: 1,
    borderColor: COLORS.chromeBorder,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    shadowColor: '#3D1F05',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  placeholder: {
    flex: 1,
    color: COLORS.placeholder,
    fontSize: 16,
  },
  close: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: COLORS.chromeBg,
    borderWidth: 1,
    borderColor: COLORS.chromeBorder,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#3D1F05',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
});
