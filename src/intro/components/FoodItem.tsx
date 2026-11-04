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
  bowlTranslateY: SharedValue<number>;
  /** Negative Y that places this item fully above the top of the viewport. */
  startY: number;
};

/** Stacked behind the bowl — starts off-screen above, falls into the rim. */
export function FoodItem({
  id,
  drop,
  collapse,
  opacity,
  bowlTranslateY,
  startY,
}: Props) {
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
      [startY, peek.y],
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
      [1, 1.06, peek.scale],
      Extrapolation.CLAMP,
    );

    // Collapse = drop straight down into the bowl (keep X), not suck to center
    const y = interpolate(collapse.value, [0, 1], [landedY, landedY + 56]);
    const scale = interpolate(collapse.value, [0, 1], [landedScale, landedScale * 0.88]);

    return {
      opacity: opacity.value,
      transform: [
        { translateX: landedX },
        { translateY: y + bowlTranslateY.value },
        { rotate: `${landedRot}deg` },
        { scale },
      ],
    };
  });

  return (
    <Animated.View style={[styles.wrap, style]} pointerEvents="none">
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
    bottom: LAYOUT.bowlHeight - LAYOUT.foodSize * 0.55,
    zIndex: 4,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
