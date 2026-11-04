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
 * 1) Orange drops into tilted bowl → bowl levels
 * 2) Rest fall into straight bowl
 * 3) Collapse → empty pause
 * 4) Smile appears behind rim → rises to peek → shoots up → done
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
  const logoOpacity = useSharedValue(0);

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
    cancelAnimation(logoOpacity);

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
    logoOpacity.value = 0;
    setPhaseLabel('idle');
  }, [
    bowlOpacity,
    bowlRotate,
    bowlTranslateY,
    foodCollapse,
    foods,
    logoLaunch,
    logoOpacity,
    logoPeek,
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
    markPhase('first-drop');

    // --- Phase A: leftmost orange into tilted bowl, then level ---
    later(0, () => {
      foods[0].drop.value = withSpring(1, SPRINGS.drop);
    });

    const firstHit = Math.round(DURATIONS.firstDrop * DURATIONS.impactAt);
    later(firstHit, () => {
      markPhase('level');
      bowlRotate.value = withSpring(0, SPRINGS.bowlLevel);
    });

    // Rest starts once the bowl has begun leveling — don't wait for a long settle
    const restStart = firstHit + DURATIONS.holdAfterLevel;

    // --- Phase B: remaining pieces into a straight bowl (slower cascade) ---
    for (let i = 1; i < FOOD_COUNT; i++) {
      const releaseAt = restStart + (i - 1) * DURATIONS.restStagger;
      later(releaseAt, () => {
        markPhase('fill');
        foods[i].drop.value = withSpring(1, SPRINGS.restDrop);
      });
    }

    const restEnd =
      restStart +
      DURATIONS.restDrop +
      (FOOD_COUNT - 2) * DURATIONS.restStagger;

    const afterFull = restEnd + DURATIONS.holdAfterFull;

    later(afterFull, () => {
      markPhase('collapse');
      foodCollapse.value = withSpring(1, SPRINGS.peek);
      foods.forEach((f, i) => {
        f.opacity.value = withDelay(
          i * 35,
          withTiming(0, { duration: DURATIONS.collapse * 0.65 }),
        );
      });
    });

    const afterEmpty = afterFull + DURATIONS.collapse + DURATIONS.holdEmpty;

    later(afterEmpty, () => {
      markPhase('smile-ready');
      // Appear behind the bowl while still fully buried
      logoOpacity.value = 1;
      logoPeek.value = 0;
    });

    later(afterEmpty + DURATIONS.holdBeforePeek, () => {
      markPhase('peek');
      logoPeek.value = withSpring(1, SPRINGS.peek);
    });

    const afterPeek =
      afterEmpty +
      DURATIONS.holdBeforePeek +
      DURATIONS.peek +
      DURATIONS.holdAfterPeek;

    later(afterPeek, () => {
      markPhase('launch');
      logoLaunch.value = withSpring(1, SPRINGS.launch);
      bowlTranslateY.value = withSpring(560, {
        ...SPRINGS.launch,
        stiffness: 150,
      });
      bowlRotate.value = withTiming(-14, {
        duration: DURATIONS.launch,
        easing: Easing.out(Easing.cubic),
      });
      bowlOpacity.value = withDelay(
        Math.round(DURATIONS.launch * 0.4),
        withTiming(0, { duration: 200 }),
      );
      later(DURATIONS.launch + 60, () => finish());
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
    logoOpacity,
  };
}
