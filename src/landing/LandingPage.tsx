import React from 'react';
import {
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
import { BrandWordmark } from './components/BrandWordmark';
import { DishMatchCard } from './components/DishMatchCard';
import { GetStartedButton } from './components/GetStartedButton';
import { HungryBackdrop } from './components/HungryBackdrop';
import { LogFeedbackCard } from './components/LogFeedbackCard';
import { OrangeWaves } from './components/OrangeWaves';
import { TasteQuizCard } from './components/TasteQuizCard';
import { LANDING } from './tokens';

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
            paddingTop: insets.top + 16,
            paddingBottom: insets.bottom + 110,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <View style={styles.hero}>
          <HungryBackdrop />
          <View style={styles.heroTop}>
            <BrandWordmark size="hero" />
            {onReplayIntro ? (
              <Pressable
                onPress={onReplayIntro}
                style={styles.replay}
                hitSlop={8}
              >
                <Text style={styles.replayLabel}>Replay</Text>
              </Pressable>
            ) : null}
          </View>

          <View style={styles.heroCopy}>
            <View style={styles.titleWrap}>
              <View style={styles.titleRow}>
                <View style={styles.letsBlock}>
                  <Text style={styles.heroTitle}>Let’s</Text>
                  <Svg
                    width={72}
                    height={14}
                    viewBox="0 0 72 14"
                    style={styles.squiggle}
                  >
                    <Path
                      d="M2 9 C 14 2, 26 12, 36 6 S 56 2, 70 10"
                      stroke={LANDING.pistachio}
                      strokeWidth={8}
                      strokeLinecap="round"
                      fill="none"
                    />
                  </Svg>
                </View>
                <Text style={styles.heroTitle}> Fix That!</Text>
              </View>
            </View>
            <Text style={styles.heroBody}>
              Tastebuds is a personalized food discovery that matches you with
              dishes you’ll love!
            </Text>
            <GetStartedButton style={styles.heroBtn} />
          </View>
        </View>

        {/* Taste is personal */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Your taste is personal.{'\n'}Your picks should be, too.
          </Text>
          <Text style={styles.sectionBody}>
            Tastebuds understands your taste profile and shows you suggestions
            curated to what you like.
          </Text>
          <TasteQuizCard />
        </View>

        {/* Discover */}
        <View style={styles.discoverBlock}>
          <View style={styles.sectionTight}>
            <Text style={styles.sectionTitle}>
              Discover new dishes with confidence
            </Text>
            <Text style={styles.sectionBody}>
              We use your taste profile to show you why a dish is perfect or
              maybe not for you.
            </Text>
          </View>
          <View style={styles.waveStage}>
            <OrangeWaves />
            <DishMatchCard />
          </View>
        </View>

        {/* Logs */}
        <View style={[styles.section, styles.sectionTopGap]}>
          <Text style={styles.sectionTitle}>We learn from your logs!</Text>
          <Text style={styles.sectionBody}>
            After finishing a dish you can log what you ate and we’ll take that
            information to give you even better recommendations.
          </Text>
          <LogFeedbackCard />
        </View>

        {/* Bottom CTA */}
        <View style={styles.ctaBand}>
          <Text style={styles.ctaTitle}>
            Your next favourite{'\n'}is out there.
          </Text>
          <GetStartedButton variant="cocoa" />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <BrandWordmark size="footer" />
          <View style={styles.footerRule}>
            <View style={styles.footerRow}>
              <Text style={styles.footerMeta}>© Tastebuds</Text>
              <Text style={styles.footerMeta}>Built by QTMA</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <LandingChrome opacity={chromeOpacity} translateY={chromeY} />
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
  hero: {
    minHeight: 380,
    paddingHorizontal: 30,
    paddingBottom: 28,
    overflow: 'hidden',
  },
  heroTop: {
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 56,
    minHeight: 40,
  },
  replay: {
    position: 'absolute',
    right: 0,
    top: 4,
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
  heroCopy: {
    zIndex: 2,
    alignItems: 'center',
    gap: 14,
  },
  titleWrap: {
    alignItems: 'center',
    alignSelf: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  letsBlock: {
    alignItems: 'center',
  },
  heroTitle: {
    color: LANDING.cocoa,
    fontSize: 32,
    fontFamily: 'Urbanist_600SemiBold',
    textAlign: 'center',
  },
  squiggle: {
    marginTop: -6,
  },
  heroBody: {
    color: LANDING.grey,
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
    fontFamily: 'DMSans_500Medium',
    maxWidth: 331,
  },
  heroBtn: {
    marginTop: 8,
    minWidth: 220,
  },
  section: {
    paddingHorizontal: 30,
    paddingTop: 48,
    paddingBottom: 28,
    alignItems: 'center',
    gap: 12,
  },
  sectionTight: {
    paddingHorizontal: 30,
    paddingTop: 8,
    paddingBottom: 8,
    alignItems: 'center',
    gap: 12,
  },
  sectionTopGap: {
    paddingTop: 56,
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
    marginBottom: 8,
  },
  discoverBlock: {
    paddingTop: 40,
  },
  waveStage: {
    marginTop: 8,
    minHeight: 520,
    justifyContent: 'center',
    backgroundColor: LANDING.peachBand,
    overflow: 'hidden',
    paddingVertical: 36,
  },
  ctaBand: {
    marginTop: 48,
    backgroundColor: LANDING.carrot,
    paddingVertical: 40,
    paddingHorizontal: 48,
    alignItems: 'center',
    gap: 24,
  },
  ctaTitle: {
    color: LANDING.cream,
    fontSize: 32,
    lineHeight: 36,
    textAlign: 'center',
    fontFamily: 'Urbanist_600SemiBold',
    maxWidth: 280,
  },
  footer: {
    paddingHorizontal: 28,
    paddingTop: 40,
    paddingBottom: 24,
    gap: 20,
  },
  footerRule: {
    borderTopWidth: 1,
    borderTopColor: LANDING.carrot,
    paddingTop: 20,
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
});
