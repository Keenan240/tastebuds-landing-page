import { useCallback, useEffect, useState } from 'react';
import {
  cancelAnimation,
  Easing,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import {
  BOWL_START_TILT,
  DURATIONS,
  FOOD_COUNT,
  FOOD_IDS,
  SPRINGS,
} from './phases';

export type IntroTimeline = ReturnType<typeof useIntroTimeline>;

/**
 * Bowl intro only:
 * drop → straighten → collapse (empty) → pause → logo peek → pause → launch → handoff
 * (Hungry type lives in Part 2.)
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
  const logoOpacity = useSharedValue(0);

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
    logoOpacity.value = 0;
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
      later(index * DURATIONS.foodStagger, () => {
        foods[index].drop.value = withSpring(1, SPRINGS.drop);
      });
    });

    later(dropEnd + 80, () => {
      markPhase('straighten');
      bowlRotate.value = withSpring(0, SPRINGS.bowl);
    });

    const afterStraighten =
      dropEnd + 80 + DURATIONS.bowlStraighten + DURATIONS.holdAfterStraighten;

    // Collapse only — bowl goes empty. Logo stays hidden.
    later(afterStraighten, () => {
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
      afterStraighten + DURATIONS.collapse + DURATIONS.holdEmpty;

    // Pause ended — logo peeks from empty bowl
    later(afterEmpty, () => {
      markPhase('peek');
      logoOpacity.value = withTiming(1, { duration: 220 });
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
