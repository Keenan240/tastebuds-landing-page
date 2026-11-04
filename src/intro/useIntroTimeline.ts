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
  BOWL_OVERSHOOT_LEFT,
  BOWL_RUMBLE_ANGLES,
  BOWL_START_TILT,
  DURATIONS,
  FOOD_COUNT,
  SPRINGS,
} from './phases';

export type IntroTimeline = ReturnType<typeof useIntroTimeline>;

/**
 * 1) Orange drops into tilted bowl → bowl levels
 * 2) Rest fall into straight bowl
 * 3) Soft shake while food is still in the bowl
 * 4) Collapse → smile peeks → launches → fades out → done
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
  /** 0→1 during dissolve; drives a slight downward settle */
  const logoFadeDown = useSharedValue(0);

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
    cancelAnimation(logoFadeDown);

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
    logoFadeDown.value = 0;
    setPhaseLabel('idle');
  }, [
    bowlOpacity,
    bowlRotate,
    bowlTranslateY,
    foodCollapse,
    foods,
    logoFadeDown,
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

    // --- Phase A: orange into tilted bowl → overshoot past level to the left ---
    later(0, () => {
      foods[0].drop.value = withSpring(1, SPRINGS.drop);
    });

    const firstHit = Math.round(DURATIONS.firstDrop * DURATIONS.impactAt);
    later(firstHit, () => {
      markPhase('overshoot');
      bowlRotate.value = withSpring(
        BOWL_OVERSHOOT_LEFT,
        SPRINGS.bowlOvershoot,
      );
    });

    const restStart = firstHit + DURATIONS.holdAfterLevel;

    // --- Phase B: rest fall in; first of them snaps the bowl back to straight ---
    for (let i = 1; i < FOOD_COUNT; i++) {
      const releaseAt = restStart + (i - 1) * DURATIONS.restStagger;
      const hitAt =
        releaseAt + Math.round(DURATIONS.restDrop * DURATIONS.impactAt);

      later(releaseAt, () => {
        markPhase('fill');
        foods[i].drop.value = withSpring(1, SPRINGS.restDrop);
      });

      if (i === 1) {
        later(hitAt, () => {
          markPhase('straighten');
          bowlRotate.value = withSpring(0, SPRINGS.bowlStraighten);
        });
      }
    }

    const restEnd =
      restStart +
      DURATIONS.restDrop +
      (FOOD_COUNT - 2) * DURATIONS.restStagger;

    const afterFull = restEnd + DURATIONS.holdAfterFull;

    // --- Phase C: soft shake while food is still in the bowl ---
    later(afterFull, () => {
      markPhase('shake');
      const tick = { duration: DURATIONS.shakeTick, easing: Easing.inOut(Easing.sin) };
      bowlRotate.value = withSequence(
        ...BOWL_RUMBLE_ANGLES.map((angle) => withTiming(angle, tick)),
      );
    });

    const afterShake =
      afterFull + BOWL_RUMBLE_ANGLES.length * DURATIONS.shakeTick + 20;

    // --- Phase D: collapse food straight down ---
    later(afterShake, () => {
      markPhase('collapse');
      foodCollapse.value = withSpring(1, SPRINGS.peek);
      foods.forEach((f, i) => {
        f.opacity.value = withDelay(
          i * 28,
          withTiming(0, { duration: DURATIONS.collapse * 0.7 }),
        );
      });
    });

    const afterEmpty = afterShake + DURATIONS.collapse + DURATIONS.holdEmpty;

    // --- Phase E: smile peeks from behind the rim ---
    later(afterEmpty, () => {
      markPhase('smile-ready');
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

    // --- Phase F: launch to mid-screen, bowl exits, logo dissolves ---
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
        Math.round(DURATIONS.launch * 0.35),
        withTiming(0, { duration: 180 }),
      );
    });

    const afterLaunch = afterPeek + DURATIONS.launch + 40;

    later(afterLaunch, () => {
      markPhase('logo-fade');
      // Reverse of the landing rise-fade: dissolve while easing slightly down
      logoOpacity.value = withTiming(0, {
        duration: DURATIONS.logoFade,
        easing: Easing.out(Easing.cubic),
      });
      logoFadeDown.value = withTiming(1, {
        duration: DURATIONS.logoFade,
        easing: Easing.out(Easing.cubic),
      });
    });

    later(afterLaunch + DURATIONS.logoFade + 40, () => finish());

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
    logoFadeDown,
  };
}
