import React, { useEffect, useRef } from 'react';
import {
  LayoutChangeEvent,
  Platform,
  StyleProp,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import Animated, {
  Easing,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

import type { NativeViewLike } from '../ScrollReveal';
import { useScrollReveal } from '../ScrollReveal';
import { ENTRANCE } from '../tokens';

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  /** Play on mount (hero / chrome). Others wait for scroll into view. */
  eager?: boolean;
  /** Eager-only cascade index. */
  index?: number;
  duration?: number;
  pointerEvents?: ViewProps['pointerEvents'];
};

function asDom(node: unknown): Element | null {
  if (!node || typeof node !== 'object') return null;
  const anyNode = node as {
    getBoundingClientRect?: unknown;
    _nativeNode?: unknown;
    getNode?: () => unknown;
  };
  if (typeof anyNode.getBoundingClientRect === 'function') {
    return node as Element;
  }
  if (anyNode._nativeNode && typeof (anyNode._nativeNode as Element).getBoundingClientRect === 'function') {
    return anyNode._nativeNode as Element;
  }
  if (typeof anyNode.getNode === 'function') {
    const nested = anyNode.getNode();
    if (nested && typeof (nested as Element).getBoundingClientRect === 'function') {
      return nested as Element;
    }
  }
  return null;
}

/**
 * Fade + slight rise. Eager pieces animate on mount; the rest reveal as
 * they enter the viewport while scrolling.
 */
export function FadeIn({
  children,
  style,
  eager = false,
  index = 0,
  duration = ENTRANCE.duration,
  pointerEvents,
}: Props) {
  const { scrollY, viewportH, contentRef } = useScrollReveal();
  const hostRef = useRef<NativeViewLike | null>(null);
  const progress = useSharedValue(0);
  const elementY = useSharedValue(Number.MAX_SAFE_INTEGER);
  const played = useSharedValue(0);

  useEffect(() => {
    if (!eager) return;
    played.value = 1;
    progress.value = withDelay(
      index * ENTRANCE.stagger,
      withTiming(1, {
        duration,
        easing: Easing.out(Easing.cubic),
      }),
    );
  }, [duration, eager, index, played, progress]);

  useEffect(() => {
    if (eager || Platform.OS !== 'web') return;
    if (typeof IntersectionObserver === 'undefined') return;

    let io: IntersectionObserver | null = null;
    let cancelled = false;
    let tries = 0;

    const attach = () => {
      if (cancelled || played.value === 1) return;
      const el = asDom(hostRef.current);
      if (!el) {
        if (tries++ < 20) requestAnimationFrame(attach);
        return;
      }
      io = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting || played.value === 1) return;
          played.value = 1;
          progress.value = withTiming(1, {
            duration,
            easing: Easing.out(Easing.cubic),
          });
          io?.disconnect();
        },
        { threshold: 0.12, rootMargin: '0px 0px -10% 0px' },
      );
      io.observe(el);
    };

    attach();
    return () => {
      cancelled = true;
      io?.disconnect();
    };
  }, [duration, eager, played, progress]);

  const onLayout = (_e: LayoutChangeEvent) => {
    if (eager) return;
    if (Platform.OS === 'web') return;
    const node = hostRef.current;
    const parent = contentRef.current;
    if (!node || !parent || typeof node.measureLayout !== 'function') return;
    node.measureLayout(
      parent,
      (_left, top) => {
        elementY.value = top;
      },
      () => {},
    );
  };

  useAnimatedReaction(
    () => scrollY.value + viewportH.value * ENTRANCE.revealAt,
    (revealLine) => {
      'worklet';
      if (eager || Platform.OS === 'web') return;
      if (played.value === 1) return;
      if (elementY.value > 1e8) return;
      if (revealLine >= elementY.value) {
        played.value = 1;
        progress.value = withTiming(1, {
          duration,
          easing: Easing.out(Easing.cubic),
        });
      }
    },
    [duration, eager],
  );

  const anim = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [
      { translateY: (1 - progress.value) * ENTRANCE.rise },
    ],
  }));

  return (
    <View
      ref={hostRef as never}
      style={style}
      pointerEvents={pointerEvents}
      onLayout={onLayout}
      collapsable={false}
    >
      <Animated.View style={anim}>{children}</Animated.View>
    </View>
  );
}
