import React, { useCallback, useMemo, useState } from 'react';
import { LayoutChangeEvent, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { Bowl } from './components/Bowl';
import { FoodItem } from './components/FoodItem';
import { SmileLogo } from './components/SmileLogo';
import { COLORS, FOOD_IDS, IPHONE, LAYOUT } from './phases';
import { useIntroTimeline } from './useIntroTimeline';

type Props = {
  fontFamily?: string;
  onComplete?: () => void;
};

export function IntroSequence({ onComplete }: Props) {
  const insets = useSafeAreaInsets();
  const timeline = useIntroTimeline(onComplete);
  const [viewH, setViewH] = useState<number>(IPHONE.height);

  const onRootLayout = useCallback((e: LayoutChangeEvent) => {
    const h = e.nativeEvent.layout.height;
    if (h > 0) setViewH(h);
  }, []);

  const bowlBottom = useMemo(
    () => Math.max(120, viewH * LAYOUT.bowlBottomRatio),
    [viewH],
  );

  const foodStartYs = useMemo(() => {
    const foodBottomFromViewBottom =
      bowlBottom + (LAYOUT.bowlHeight - LAYOUT.foodSize * 0.55);
    const upToTop = viewH - foodBottomFromViewBottom;
    const firstStartY = -(upToTop + LAYOUT.foodSize + 64);
    return FOOD_IDS.map(
      (_, index) => firstStartY - index * LAYOUT.foodCascadeGap,
    );
  }, [bowlBottom, viewH]);

  const launchTravel = useMemo(() => {
    // Shoot the smile up to the vertical middle of the screen (not the top).
    const logoStartFromBottom =
      bowlBottom + LAYOUT.bowlHeight - LAYOUT.logoPeekSize * 0.45;
    const midFromBottom = viewH * 0.5;
    return Math.max(100, midFromBottom - logoStartFromBottom);
  }, [bowlBottom, viewH]);

  return (
    <View
      style={[styles.root, { paddingTop: insets.top }]}
      onLayout={onRootLayout}
    >
      <StatusBar style="dark" />

      <View style={[styles.bowlSlot, { bottom: bowlBottom }]}>
        <View style={styles.stage}>
          {FOOD_IDS.map((id, index) => (
            <FoodItem
              key={`${id}-${timeline.replayToken}`}
              id={id}
              drop={timeline.foods[index].drop}
              collapse={timeline.foodCollapse}
              opacity={timeline.foods[index].opacity}
              bowlTranslateY={timeline.bowlTranslateY}
              startY={foodStartYs[index]}
            />
          ))}

          <SmileLogo
            opacity={timeline.logoOpacity}
            peek={timeline.logoPeek}
            launch={timeline.logoLaunch}
            launchTravel={launchTravel}
          />

          <Bowl
            rotate={timeline.bowlRotate}
            translateY={timeline.bowlTranslateY}
            opacity={timeline.bowlOpacity}
          />
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background,
    overflow: 'hidden',
  },
  bowlSlot: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10,
  },
  stage: {
    width: LAYOUT.bowlWidth,
    height: LAYOUT.bowlHeight + 140,
    justifyContent: 'flex-end',
    overflow: 'visible',
  },
});
