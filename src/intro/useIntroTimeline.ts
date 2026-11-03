import { useCallback, useEffect, useState } from 'react';
import {
  cancelAnimation,
  Easing,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import {
  BOWL_IMPACTS,
  BOWL_START_TILT,
  DURATIONS,
  FOOD_COUNT,
  FOOD_IDS,
  SPRINGS,
} from './phases';

export type IntroTimeline = ReturnType<typeof useIntroTimeline>;

/**
 * Bowl intro:
 * drop + impact tilts → collapse (empty) → pause → logo rises to peek → pause → launch → handoff
 */
export function useIntroTimeline(onComplete?: () => void) {
  const [replayToken, setReplayToken] = useState(0);
  const [phaseLabel, setPhaseLabel] = useState('idle');

  const bowlRotate = useSharedValue(BOWL_START_TILT);
  const bowlTranslateY = useSharedValue(0);
  const bowlOpacity = useSharedValue(1);

  const food0Drop = useSharedValue(0);
  const food1Drop = useSharedValue(0);
  const food2Drop = useSharedValue(0);
  const food3Drop = useSharedValue(0);
  const food0Opacity = useSharedValue(1);
  const food1Opacity = useSharedValue(1);
  const food2Opacity = useSharedValue(1);
  const food3Opacity = useSharedValue(1);

  const foods = [
    { drop: food0Drop, opacity: food0Opacity },
    { drop: food1Drop, opacity: food1Opacity },
    { drop: food2Drop, opacity: food2Opacity },
    { drop: food3Drop, opacity: food3Opacity },
  ] as const;

  const foodCollapse = useSharedValue(0);

  const logoPeek = useSharedValue(0);
  const logoLaunch = useSharedValue(0);
  const logoShrink = useSharedValue(0);
  /** Logo stays fully opaque while rising; only fades at wordmark handoff. */
  const logoOpacity = useSharedValue(1);

  const wordmarkOpacity = useSharedValue(0);
  const chromeOpacity = useSharedValue(0);
  const chromeTranslateY = useSharedValue(24);

  const markPhase = useCallback((label: string) => {
    setPhaseLabel(label);
  }, []);

  const finish = useCallback(() => {
    setPhaseLabel('done');
    onComplete?.();
  }, [onComplete]);

  const resetValues = useCallback(() => {
    cancelAnimation(bowlRotate);
    cancelAnimation(bowlTranslateY);
    cancelAnimation(bowlOpacity);
    cancelAnimation(foodCollapse);
    foods.forEach((f) => {
      cancelAnimation(f.drop);
      cancelAnimation(f.opacity);
    });
    cancelAnimation(logoPeek);
    cancelAnimation(logoLaunch);
    cancelAnimation(logoShrink);
    cancelAnimation(logoOpacity);
    cancelAnimation(wordmarkOpacity);
    cancelAnimation(chromeOpacity);
    cancelAnimation(chromeTranslateY);

    bowlRotate.value = BOWL_START_TILT;
    bowlTranslateY.value = 0;
    bowlOpacity.value = 1;
    foodCollapse.value = 0;
    foods.forEach((f) => {
      f.drop.value = 0;
      f.opacity.value = 1;
    });
    logoPeek.value = 0;
    logoLaunch.value = 0;
    logoShrink.value = 0;
    logoOpacity.value = 1;
    wordmarkOpacity.value = 0;
    chromeOpacity.value = 0;
    chromeTranslateY.value = 24;
    setPhaseLabel('idle');
  }, [
    bowlOpacity,
    bowlRotate,
    bowlTranslateY,
    chromeOpacity,
    chromeTranslateY,
    foodCollapse,
    foods,
    logoLaunch,
    logoOpacity,
    logoPeek,
    logoShrink,
    wordmarkOpacity,
  ]);

  const replay = useCallback(() => {
    resetValues();
    setReplayToken((t) => t + 1);
  }, [resetValues]);

  useEffect(() => {
    let cancelled = false;
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    const later = (ms: number, fn: () => void) => {
      const id = setTimeout(() => {
        if (!cancelled) fn();
      }, ms);
      timeouts.push(id);
    };

    resetValues();
    markPhase('drop');

    const dropEnd =
      DURATIONS.foodDrop + (FOOD_COUNT - 1) * DURATIONS.foodStagger;

    FOOD_IDS.forEach((_, index) => {
      const releaseAt = index * DURATIONS.foodStagger;
      const impactAt =
        releaseAt + Math.round(DURATIONS.foodDrop * DURATIONS.impactAt);
      const impact = BOWL_IMPACTS[index];

      later(releaseAt, () => {
        foods[index].drop.value = withSpring(1, SPRINGS.drop);
      });

      // Bowl reacts as each piece hits
      later(impactAt, () => {
        markPhase(index === FOOD_COUNT - 1 ? 'settle' : 'impact');
        bowlRotate.value = withSequence(
          withSpring(impact.kick, SPRINGS.bowlKick),
          withSpring(impact.settle, SPRINGS.bowlSettle),
        );
      });
    });

    const afterSettle =
      dropEnd + 120 + DURATIONS.holdAfterStraighten;

    later(afterSettle, () => {
      markPhase('collapse');
      foodCollapse.value = withSpring(1, SPRINGS.peek);
      foods.forEach((f, i) => {
        f.opacity.value = withDelay(
          i * 40,
          withTiming(0, { duration: DURATIONS.collapse * 0.7 }),
        );
      });
    });

    const afterEmpty =
      afterSettle + DURATIONS.collapse + DURATIONS.holdEmpty;

    // Rise into peek by position only — already opaque, hidden behind bowl
    later(afterEmpty, () => {
      markPhase('peek');
      logoPeek.value = withSpring(1, SPRINGS.peek);
    });

    const afterPeek = afterEmpty + DURATIONS.peek + DURATIONS.holdAfterPeek;

    later(afterPeek, () => {
      markPhase('launch');
      logoLaunch.value = withSpring(1, SPRINGS.launch);
      bowlTranslateY.value = withSpring(560, {
        ...SPRINGS.launch,
        stiffness: 160,
      });
      bowlRotate.value = withTiming(-22, {
        duration: DURATIONS.launch,
        easing: Easing.out(Easing.cubic),
      });
      bowlOpacity.value = withDelay(
        Math.round(DURATIONS.launch * 0.4),
        withTiming(0, { duration: 240 }),
      );
    });

    const afterLaunch =
      afterPeek + DURATIONS.launch + DURATIONS.holdAfterLaunch;

    later(afterLaunch, () => {
      markPhase('handoff');
      logoOpacity.value = withTiming(0, {
        duration: DURATIONS.handoff * 0.45,
        easing: Easing.in(Easing.cubic),
      });
      logoShrink.value = withSpring(1, SPRINGS.soft);
      wordmarkOpacity.value = withTiming(1, {
        duration: DURATIONS.handoff * 0.85,
        easing: Easing.out(Easing.cubic),
      });
      chromeOpacity.value = withDelay(
        80,
        withTiming(1, {
          duration: DURATIONS.handoff,
          easing: Easing.out(Easing.cubic),
        }),
      );
      chromeTranslateY.value = withDelay(80, withSpring(0, SPRINGS.soft));
      later(DURATIONS.handoff + 80, () => finish());
    });

    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [replayToken]);

  return {
    replay,
    replayToken,
    phaseLabel,
    bowlRotate,
    bowlTranslateY,
    bowlOpacity,
    foods,
    foodCollapse,
    logoPeek,
    logoLaunch,
    logoShrink,
    logoOpacity,
    wordmarkOpacity,
    chromeOpacity,
    chromeTranslateY,
  };
}
