import React, { useCallback, useMemo, useState } from 'react';
import {
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
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
    const rimFromBottom = bowlBottom + LAYOUT.bowlHeight;
    const targetFromBottom = viewH - (insets.top + LAYOUT.logoTopOffset + 40);
    return Math.max(280, targetFromBottom - rimFromBottom);
  }, [bowlBottom, viewH, insets.top]);

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

      <Pressable
        onPress={timeline.replay}
        style={[styles.replay, { top: insets.top + 8 }]}
        accessibilityRole="button"
        accessibilityLabel="Replay intro animation"
      >
        <Text style={styles.replayLabel}>Replay</Text>
      </Pressable>

      {__DEV__ ? (
        <Text style={[styles.phase, { top: insets.top + 12 }]}>
          {timeline.phaseLabel}
        </Text>
      ) : null}
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
  replay: {
    position: 'absolute',
    right: 16,
    zIndex: 40,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: 'rgba(61, 31, 5, 0.08)',
  },
  replayLabel: {
    color: COLORS.brown,
    fontWeight: '700',
    fontSize: 13,
  },
  phase: {
    position: 'absolute',
    left: 16,
    zIndex: 40,
    fontSize: 11,
    color: COLORS.beige,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
});
