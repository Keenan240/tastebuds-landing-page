import React, { useMemo } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { Bowl } from './components/Bowl';
import { FoodItem } from './components/FoodItem';
import { HungryText } from './components/HungryText';
import { LandingChrome } from './components/LandingChrome';
import { SmileLogo } from './components/SmileLogo';
import { Wordmark } from './components/Wordmark';
import { COLORS, FOOD_IDS, LAYOUT } from './phases';
import { useIntroTimeline } from './useIntroTimeline';

type Props = {
  fontFamily?: string;
  onComplete?: () => void;
};

export function IntroSequence({ fontFamily, onComplete }: Props) {
  const { height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const timeline = useIntroTimeline(onComplete);

  const bowlBottom = useMemo(
    () => Math.max(120, height * LAYOUT.bowlBottomRatio),
    [height],
  );

  // How far the smile must travel from bowl rim to near the top of the screen
  const launchTravel = useMemo(() => {
    const rimFromBottom = bowlBottom + LAYOUT.bowlHeight;
    const targetFromBottom = height - (insets.top + LAYOUT.logoTopOffset + 40);
    return Math.max(280, targetFromBottom - rimFromBottom);
  }, [bowlBottom, height, insets.top]);

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <StatusBar style="dark" />

      <HungryText
        typedLength={timeline.typedLength}
        soften={timeline.textSoften}
        blur={timeline.textBlur}
        fontFamily={fontFamily}
      />

      <Wordmark opacity={timeline.wordmarkOpacity} fontFamily={fontFamily} />

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
            />
          ))}

          {/* Behind the bowl so only the top peeks over the rim */}
          <SmileLogo
            opacity={timeline.logoOpacity}
            peek={timeline.logoPeek}
            launch={timeline.logoLaunch}
            shrink={timeline.logoShrink}
            launchTravel={launchTravel}
          />

          <Bowl
            rotate={timeline.bowlRotate}
            translateY={timeline.bowlTranslateY}
            opacity={timeline.bowlOpacity}
          />
        </View>
      </View>

      <LandingChrome
        opacity={timeline.chromeOpacity}
        translateY={timeline.chromeTranslateY}
      />

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
    height: LAYOUT.bowlHeight + 80,
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
