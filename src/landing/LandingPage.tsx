import React, { useCallback, useRef, useState } from 'react';
import {
  Image,
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import Animated from 'react-native-reanimated';

import { LandingChrome } from '../intro/components/LandingChrome';
import { FadeIn } from './components/FadeIn';
import { GetStartedButton } from './components/GetStartedButton';
import { ScrollRevealProvider, type NativeViewLike } from './ScrollReveal';
import { LANDING } from './tokens';

const WORDMARK = require('../../assets/landing/wordmark.png');
const BRUSH_STROKE = require('../../assets/landing/brush-stroke.png');
const CARD_KKATSU = require('../../assets/landing/card-kkatsu.png');
const CARD_KIMCHI = require('../../assets/landing/card-kimchi.png');
const CARD_PHO = require('../../assets/landing/card-pho.png');
const CARD_DANDAN = require('../../assets/landing/card-dandan.png');
const LOG_FEEDBACK = require('../../assets/landing/log-feedback.png');

const CARD_WIDTH = 236;
const CARD_HEIGHT = 234;
const DISH_ASSETS = [
  { source: CARD_KKATSU, width: CARD_WIDTH },
  { source: CARD_KIMCHI, width: CARD_WIDTH },
  { source: CARD_PHO, width: CARD_WIDTH },
] as const;

const DANDAN_ASPECT = 2024 / 1604;

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

type Props = {
  onReplayIntro?: () => void;
};

export function LandingPage({ onReplayIntro }: Props) {
  const insets = useSafeAreaInsets();
  const chromeOpacity = useSharedValue(1);
  const chromeY = useSharedValue(0);
  const scrollY = useSharedValue(0);
  const viewportH = useSharedValue(800);
  const contentRef = useRef<NativeViewLike | null>(null);
  const [pageW, setPageW] = useState(0);

  const onRootLayout = useCallback((e: LayoutChangeEvent) => {
    const w = e.nativeEvent.layout.width;
    if (w > 0) setPageW(w);
  }, []);

  const onScrollViewLayout = useCallback((e: LayoutChangeEvent) => {
    viewportH.value = e.nativeEvent.layout.height;
  }, [viewportH]);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollY.value = e.contentOffset.y;
    },
  });

  // Fallback for environments where the animated handler doesn’t attach
  const onScrollFallback = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      scrollY.value = e.nativeEvent.contentOffset.y;
    },
    [scrollY],
  );

  return (
    <ScrollRevealProvider value={{ scrollY, viewportH, contentRef }}>
      <View style={styles.root} onLayout={onRootLayout}>
        <AnimatedScrollView
          style={styles.scroll}
          contentContainerStyle={[
            styles.content,
            {
              paddingTop: insets.top + 18,
              paddingBottom: insets.bottom + 120,
            },
          ]}
          showsVerticalScrollIndicator={false}
          onLayout={onScrollViewLayout}
          onScroll={onScroll}
          scrollEventThrottle={16}
          // @ts-expect-error RN web sometimes needs the JS path too
          onScrollEvent={onScrollFallback}
        >
          <View ref={contentRef as never} collapsable={false}>
            <FadeIn eager index={0} style={styles.wordmarkWrap}>
              <Image
                source={WORDMARK}
                style={styles.wordmark}
                resizeMode="contain"
                accessibilityLabel="tastebuds"
              />
              {onReplayIntro ? (
                <Pressable
                  onPress={onReplayIntro}
                  style={styles.replay}
                  hitSlop={8}
                >
                  <Text style={styles.replayLabel}>Replay</Text>
                </Pressable>
              ) : null}
            </FadeIn>

            <View style={styles.hero}>
              <FadeIn eager index={1} style={styles.titleWrap}>
                <Text style={styles.heroTitle}>Hungry?</Text>
                <View style={styles.fixLine}>
                  <Text style={styles.heroTitle}>Let’s Fix That!</Text>
                  <Image
                    source={BRUSH_STROKE}
                    style={styles.brush}
                    resizeMode="contain"
                    pointerEvents="none"
                    accessibilityElementsHidden
                    importantForAccessibility="no"
                  />
                </View>
              </FadeIn>

              <FadeIn eager index={2}>
                <Text style={styles.heroBody}>
                  Tastebuds is a personalized food discovery that matches you
                  with dishes you’ll love!
                </Text>
              </FadeIn>

              <FadeIn eager index={3} style={styles.heroBtnWrap}>
                <GetStartedButton style={styles.heroBtn} />
              </FadeIn>
            </View>

            <View style={[styles.section, styles.sectionAfterHero]}>
              <FadeIn>
                <Text style={styles.sectionTitle}>
                  Your taste is personal.{'\n'}Your picks should be, too.
                </Text>
              </FadeIn>
              <FadeIn>
                <Text style={[styles.sectionBody, styles.personalBody]}>
                  Tastebuds understands your taste profile and shows you
                  suggestions curated to what you like.
                </Text>
              </FadeIn>
            </View>

            <View style={styles.carouselWrap}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.carousel}
                decelerationRate="fast"
              >
                <View style={styles.carouselRow}>
                  {DISH_ASSETS.map((card, i) => (
                    <FadeIn key={i}>
                      <View
                        style={[
                          styles.carouselCard,
                          { width: card.width, height: CARD_HEIGHT },
                        ]}
                      >
                        <Image
                          source={card.source}
                          style={{ width: card.width, height: CARD_HEIGHT }}
                          resizeMode="cover"
                        />
                      </View>
                    </FadeIn>
                  ))}
                </View>
              </ScrollView>
            </View>

            <View style={[styles.section, styles.discoverSection]}>
              <FadeIn>
                <Text style={styles.sectionTitle}>
                  Discover new dishes with confidence
                </Text>
              </FadeIn>
              <FadeIn>
                <Text style={[styles.sectionBody, styles.discoverBody]}>
                  We use your taste profile to show you why a dish is perfect or
                  maybe not for you.
                </Text>
              </FadeIn>
            </View>

            {/* Big image — no scroll fade */}
            <View style={styles.dandanWrap}>
              {pageW > 0 ? (
                <Image
                  source={CARD_DANDAN}
                  style={{ width: pageW, height: pageW * DANDAN_ASPECT }}
                  resizeMode="stretch"
                  accessibilityLabel="Dandan noodles match card"
                />
              ) : null}
            </View>

            <View style={[styles.section, styles.logsSection]}>
              <FadeIn>
                <Text style={styles.sectionTitle}>We learn from your logs!</Text>
              </FadeIn>
              <FadeIn>
                <Text style={styles.sectionBody}>
                  After finishing a dish you can log what you ate and we’ll take
                  that information to give you even better recommendations.
                </Text>
              </FadeIn>
            </View>

            {/* Big image — no scroll fade */}
            <View style={styles.logWrap}>
              <Image
                source={LOG_FEEDBACK}
                style={styles.logImage}
                resizeMode="contain"
                accessibilityLabel="Meal log feedback"
              />
            </View>

            <FadeIn style={styles.footer}>
              <View style={styles.footerBrand}>
                <Image
                  source={WORDMARK}
                  style={styles.footerMark}
                  resizeMode="contain"
                />
                <View style={styles.footerRule} />
                <View style={styles.footerRow}>
                  <Text style={styles.footerMeta}>© Tastebuds</Text>
                  <Text style={styles.footerMeta}>Built by QTMA</Text>
                </View>
              </View>
            </FadeIn>
          </View>
        </AnimatedScrollView>

        <FadeIn eager index={4} style={styles.chromeFade} pointerEvents="box-none">
          <LandingChrome opacity={chromeOpacity} translateY={chromeY} />
        </FadeIn>
      </View>
    </ScrollRevealProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: LANDING.bg,
  },
  scroll: { flex: 1 },
  content: {
    backgroundColor: LANDING.bg,
  },
  wordmarkWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
    marginBottom: 120,
    paddingHorizontal: 30,
  },
  wordmark: {
    width: 168,
    height: 32,
  },
  replay: {
    position: 'absolute',
    right: 20,
    top: 2,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: 'rgba(66, 28, 0, 0.06)',
  },
  replayLabel: {
    color: LANDING.cocoa,
    fontSize: 12,
    fontFamily: 'DMSans_500Medium',
  },
  hero: {
    paddingHorizontal: 30,
    alignItems: 'center',
    gap: 14,
    marginBottom: 164,
  },
  titleWrap: {
    alignItems: 'center',
  },
  fixLine: {
    alignItems: 'center',
  },
  heroTitle: {
    color: LANDING.cocoa,
    fontSize: 32,
    lineHeight: 38,
    fontFamily: 'Urbanist_600SemiBold',
    textAlign: 'center',
  },
  brush: {
    width: 210,
    height: 22,
    marginTop: -4,
    alignSelf: 'center',
    transform: [{ rotate: '3deg' }],
  },
  heroBody: {
    color: LANDING.grey,
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
    fontFamily: 'DMSans_500Medium',
    maxWidth: 331,
  },
  heroBtnWrap: {
    marginTop: 6,
  },
  heroBtn: {
    minWidth: 220,
  },
  section: {
    paddingHorizontal: 30,
    paddingTop: 12,
    paddingBottom: 0,
    alignItems: 'center',
    gap: 8,
  },
  sectionAfterHero: {
    paddingTop: 0,
  },
  sectionTitle: {
    color: LANDING.cocoa,
    fontSize: 28,
    lineHeight: 34,
    textAlign: 'center',
    fontFamily: 'Urbanist_600SemiBold',
  },
  sectionBody: {
    color: LANDING.grey,
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
    fontFamily: 'DMSans_500Medium',
    maxWidth: 331,
  },
  personalBody: {
    marginBottom: 36,
  },
  carouselWrap: {
    marginBottom: 48,
  },
  discoverSection: {
    paddingTop: 0,
  },
  discoverBody: {
    marginBottom: 36,
  },
  logsSection: {
    marginTop: 48,
    paddingTop: 0,
  },
  carousel: {
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 2,
    paddingBottom: 2,
  },
  carouselRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
  },
  carouselCard: {
    overflow: 'hidden',
    borderRadius: 20,
  },
  dandanWrap: {
    width: '100%',
    alignSelf: 'stretch',
  },
  logWrap: {
    width: '100%',
    paddingHorizontal: 12,
    marginTop: 12,
    alignItems: 'center',
  },
  logImage: {
    width: '100%',
    height: 360,
  },
  footer: {
    paddingHorizontal: 28,
    paddingTop: 40,
    paddingBottom: 24,
    alignItems: 'center',
  },
  footerBrand: {
    width: 168,
    alignItems: 'stretch',
    gap: 14,
  },
  footerMark: {
    width: 168,
    height: 32,
    alignSelf: 'center',
  },
  footerRule: {
    alignSelf: 'stretch',
    borderTopWidth: 1,
    borderTopColor: LANDING.carrot,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerMeta: {
    color: LANDING.carrot,
    fontSize: 12,
    fontFamily: 'DMSans_400Regular',
  },
  chromeFade: {
    ...StyleSheet.absoluteFill,
  },
});
