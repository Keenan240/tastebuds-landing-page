import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { useSharedValue } from 'react-native-reanimated';

import { LandingChrome } from '../intro/components/LandingChrome';
import { FadeIn } from './components/FadeIn';
import { GetStartedButton } from './components/GetStartedButton';
import { LANDING } from './tokens';

const WORDMARK = require('../../assets/landing/wordmark.png');
const CARD_KKATSU = require('../../assets/landing/card-kkatsu.png');
const CARD_KIMCHI = require('../../assets/landing/card-kimchi.png');
const CARD_PHO = require('../../assets/landing/card-pho.png');
const CARD_DANDAN = require('../../assets/landing/card-dandan.png');
const LOG_FEEDBACK = require('../../assets/landing/log-feedback.png');

const DISH_CARDS = [
  { source: CARD_KKATSU, aspect: 668 / 662, width: 236 },
  { source: CARD_KIMCHI, aspect: 668 / 662, width: 236 },
  { source: CARD_PHO, aspect: 266 / 662, width: 112 },
] as const;

type Props = {
  onReplayIntro?: () => void;
};

export function LandingPage({ onReplayIntro }: Props) {
  const insets = useSafeAreaInsets();
  const chromeOpacity = useSharedValue(1);
  const chromeY = useSharedValue(0);

  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: insets.top + 18,
            paddingBottom: insets.bottom + 120,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <FadeIn style={styles.wordmarkWrap}>
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
          <FadeIn style={styles.titleWrap}>
            <Text style={styles.heroTitle}>Hungry?</Text>
            <View style={styles.fixLine}>
              <Text style={styles.heroTitle}>Let’s Fix That!</Text>
              <Svg
                width={210}
                height={16}
                viewBox="0 0 210 16"
                style={styles.squiggle}
              >
                <Path
                  d="M4 11 C 36 2, 72 14, 108 7 S 168 2, 206 10"
                  stroke={LANDING.pistachio}
                  strokeWidth={9}
                  strokeLinecap="round"
                  fill="none"
                />
              </Svg>
            </View>
          </FadeIn>

          <FadeIn>
            <Text style={styles.heroBody}>
              Tastebuds is a personalized food discovery that matches you with
              dishes you’ll love!
            </Text>
          </FadeIn>

          <FadeIn style={styles.heroBtnWrap}>
            <GetStartedButton style={styles.heroBtn} />
          </FadeIn>
        </View>

        <View style={styles.section}>
          <FadeIn>
            <Text style={styles.sectionTitle}>
              Your taste is personal.{'\n'}Your picks should be, too.
            </Text>
          </FadeIn>
          <FadeIn>
            <Text style={styles.sectionBody}>
              Tastebuds understands your taste profile and shows you suggestions
              curated to what you like.
            </Text>
          </FadeIn>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carousel}
          decelerationRate="fast"
        >
          {DISH_CARDS.map((card, i) => (
            <FadeIn key={i}>
              <Image
                source={card.source}
                style={{
                  width: card.width,
                  height: card.width / card.aspect,
                  marginRight: i === DISH_CARDS.length - 1 ? 0 : 14,
                }}
                resizeMode="contain"
              />
            </FadeIn>
          ))}
        </ScrollView>

        <View style={styles.section}>
          <FadeIn>
            <Text style={styles.sectionTitle}>
              Discover new dishes with confidence
            </Text>
          </FadeIn>
          <FadeIn>
            <Text style={styles.sectionBody}>
              We use your taste profile to show you why a dish is perfect or
              maybe not for you.
            </Text>
          </FadeIn>
        </View>

        <FadeIn style={styles.dandanWrap}>
          <Image
            source={CARD_DANDAN}
            style={styles.dandan}
            resizeMode="contain"
            accessibilityLabel="Dandan noodles match card"
          />
        </FadeIn>

        <View style={styles.section}>
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

        <FadeIn style={styles.logWrap}>
          <Image
            source={LOG_FEEDBACK}
            style={styles.logImage}
            resizeMode="contain"
            accessibilityLabel="Meal log feedback"
          />
        </FadeIn>

        <FadeIn style={styles.footer}>
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
        </FadeIn>
      </ScrollView>

      <FadeIn style={styles.chromeFade} pointerEvents="box-none">
        <LandingChrome opacity={chromeOpacity} translateY={chromeY} />
      </FadeIn>
    </View>
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
    marginBottom: 28,
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
    marginBottom: 36,
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
  squiggle: {
    marginTop: -8,
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
    paddingTop: 28,
    paddingBottom: 12,
    alignItems: 'center',
    gap: 12,
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
  carousel: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    alignItems: 'flex-start',
  },
  dandanWrap: {
    width: '100%',
    marginTop: 8,
    overflow: 'hidden',
  },
  dandan: {
    // RN Web often ignores aspectRatio on Image — pin height from asset ratio.
    width: '100%',
    height: 468,
  },
  logWrap: {
    width: '100%',
    paddingHorizontal: 12,
    marginTop: 8,
    alignItems: 'center',
  },
  logImage: {
    width: '100%',
    height: 360,
  },
  footer: {
    paddingHorizontal: 28,
    paddingTop: 40,
    paddingBottom: 16,
    gap: 18,
    alignItems: 'center',
  },
  footerMark: {
    width: 140,
    height: 28,
  },
  footerRule: {
    alignSelf: 'stretch',
    borderTopWidth: 1,
    borderTopColor: LANDING.carrot,
  },
  footerRow: {
    alignSelf: 'stretch',
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
