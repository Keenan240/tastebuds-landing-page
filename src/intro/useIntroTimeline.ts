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
  HUNGRY_TEXT,
  SPRINGS,
} from './phases';

export type IntroTimeline = ReturnType<typeof useIntroTimeline>;

export function useIntroTimeline(onComplete?: () => void) {
  const [replayToken, setReplayToken] = useState(0);
  const [typedLength, setTypedLength] = useState(0);
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

  const textSoften = useSharedValue(0);
  const textBlur = useSharedValue(0);

  const wordmarkOpacity = useSharedValue(0);
  const chromeOpacity = useSharedValue(0);
  const chromeTranslateY = useSharedValue(24);

  const setTyped = useCallback((n: number) => {
    setTypedLength(n);
  }, []);

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
    cancelAnimation(textSoften);
    cancelAnimation(textBlur);
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
    textSoften.value = 0;
    textBlur.value = 0;
    wordmarkOpacity.value = 0;
    chromeOpacity.value = 0;
    chromeTranslateY.value = 24;
    setTypedLength(0);
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
    textBlur,
    textSoften,
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

    later(afterStraighten, () => {
      markPhase('collapse');
      foodCollapse.value = withSpring(1, SPRINGS.peek);
      logoOpacity.value = withTiming(1, { duration: 200 });
      logoPeek.value = withSpring(1, SPRINGS.peek);
      foods.forEach((f, i) => {
        f.opacity.value = withDelay(
          i * 45,
          withTiming(0, { duration: DURATIONS.collapse * 0.65 }),
        );
      });
    });

    const afterPeek =
      afterStraighten + DURATIONS.collapse + DURATIONS.holdAfterPeek;

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
      markPhase('type');
      const total = HUNGRY_TEXT.length;
      const typeDuration = total * DURATIONS.typeChar;

      for (let i = 1; i <= total; i++) {
        later(i * DURATIONS.typeChar, () => setTyped(i));
      }

      later(typeDuration + DURATIONS.holdAfterType, () => {
        markPhase('soften');
        textSoften.value = withTiming(1, {
          duration: DURATIONS.soften,
          easing: Easing.inOut(Easing.cubic),
        });
        logoShrink.value = withSpring(1, SPRINGS.soft);
      });

      const afterSoften =
        typeDuration +
        DURATIONS.holdAfterType +
        DURATIONS.soften +
        DURATIONS.holdAfterSoften;

      later(afterSoften, () => {
        markPhase('handoff');
        textBlur.value = withTiming(1, {
          duration: DURATIONS.handoff,
          easing: Easing.inOut(Easing.cubic),
        });
        logoOpacity.value = withTiming(0, {
          duration: DURATIONS.handoff * 0.45,
          easing: Easing.in(Easing.cubic),
        });
        wordmarkOpacity.value = withTiming(1, {
          duration: DURATIONS.handoff * 0.85,
          easing: Easing.out(Easing.cubic),
        });
        chromeOpacity.value = withDelay(
          100,
          withTiming(1, {
            duration: DURATIONS.handoff,
            easing: Easing.out(Easing.cubic),
          }),
        );
        chromeTranslateY.value = withDelay(
          100,
          withSpring(0, SPRINGS.soft),
        );
        later(DURATIONS.handoff + 100, () => finish());
      });
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
    typedLength,
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
    textSoften,
    textBlur,
    wordmarkOpacity,
    chromeOpacity,
    chromeTranslateY,
  };
}
