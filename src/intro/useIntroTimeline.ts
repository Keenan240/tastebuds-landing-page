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
  BOWL_SETTLE_AFTER_HIT,
  BOWL_START_TILT,
  DURATIONS,
  FOOD_COUNT,
  FOOD_IDS,
  SPRINGS,
} from './phases';

export type IntroTimeline = ReturnType<typeof useIntroTimeline>;

/**
 * drop (bowl settles per hit) → collapse → empty pause →
 * smile appears behind rim → rises to peek → shoots up → done
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
  /** 0 until empty bowl beat — then snapped on before the rise. */
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
    markPhase('drop');

    const dropEnd =
      DURATIONS.foodDrop + (FOOD_COUNT - 1) * DURATIONS.foodStagger;

    FOOD_IDS.forEach((_, index) => {
      const releaseAt = index * DURATIONS.foodStagger;
      const impactAt =
        releaseAt + Math.round(DURATIONS.foodDrop * DURATIONS.impactAt);

      later(releaseAt, () => {
        foods[index].drop.value = withSpring(1, SPRINGS.drop);
      });

      // One settle spring per hit — no kick/settle sequence (avoids shake)
      later(impactAt, () => {
        markPhase(index === FOOD_COUNT - 1 ? 'level' : 'catch');
        bowlRotate.value = withSpring(
          BOWL_SETTLE_AFTER_HIT[index],
          SPRINGS.bowlSettle,
        );
      });
    });

    const afterFull = dropEnd + DURATIONS.holdAfterFull;

    later(afterFull, () => {
      markPhase('collapse');
      foodCollapse.value = withSpring(1, SPRINGS.peek);
      foods.forEach((f, i) => {
        f.opacity.value = withDelay(
          i * 40,
          withTiming(0, { duration: DURATIONS.collapse * 0.7 }),
        );
      });
    });

    const afterEmpty = afterFull + DURATIONS.collapse + DURATIONS.holdEmpty;

    later(afterEmpty, () => {
      markPhase('peek');
      // Snap visible behind the bowl, then rise by Y only
      logoOpacity.value = 1;
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
      bowlRotate.value = withTiming(-18, {
        duration: DURATIONS.launch,
        easing: Easing.out(Easing.cubic),
      });
      bowlOpacity.value = withDelay(
        Math.round(DURATIONS.launch * 0.4),
        withTiming(0, { duration: 220 }),
      );
      later(DURATIONS.launch + 80, () => finish());
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
