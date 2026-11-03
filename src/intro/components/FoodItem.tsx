import React from 'react';
import { Image, StyleSheet } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import type { SharedValue } from 'react-native-reanimated';

import {
  FOOD_PEEK,
  FOOD_START,
  LAYOUT,
  type FoodId,
} from '../phases';

const SOURCES: Record<FoodId, number> = {
  pepper: require('../../../assets/intro/pepper.png'),
  leek: require('../../../assets/intro/leek.png'),
  tomato: require('../../../assets/intro/tomato.png'),
  radish: require('../../../assets/intro/radish.png'),
};

type Props = {
  id: FoodId;
  drop: SharedValue<number>;
  collapse: SharedValue<number>;
  opacity: SharedValue<number>;
};

export function FoodItem({ id, drop, collapse, opacity }: Props) {
  const start = FOOD_START[id];
  const peek = FOOD_PEEK[id];

  const style = useAnimatedStyle(() => {
    const landedX = interpolate(
      drop.value,
      [0, 1],
      [start.x, peek.x],
      Extrapolation.CLAMP,
    );
    const landedY = interpolate(
      drop.value,
      [0, 1],
      [start.y, peek.y],
      Extrapolation.CLAMP,
    );
    const landedRot = interpolate(
      drop.value,
      [0, 1],
      [start.rotate, peek.rotate],
      Extrapolation.CLAMP,
    );
    const landedScale = interpolate(
      drop.value,
      [0, 0.85, 1],
      [0.92, 1.08, peek.scale],
      Extrapolation.CLAMP,
    );

    // Collapse into bowl center
    const x = interpolate(collapse.value, [0, 1], [landedX, 0]);
    const y = interpolate(collapse.value, [0, 1], [landedY, 12]);
    const scale = interpolate(
      collapse.value,
      [0, 1],
      [landedScale, 0.15],
    );
    const rot = interpolate(collapse.value, [0, 1], [landedRot, 0]);

    return {
      opacity: opacity.value,
      transform: [
        { translateX: x },
        { translateY: y },
        { rotate: `${rot}deg` },
        { scale },
      ],
    };
  });

  return (
    <Animated.View style={[styles.wrap, style]}>
      <Image source={SOURCES[id]} style={styles.image} resizeMode="contain" />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    width: LAYOUT.foodSize,
    height: LAYOUT.foodSize,
    left: (LAYOUT.bowlWidth - LAYOUT.foodSize) / 2,
    bottom: LAYOUT.bowlHeight - 18,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
