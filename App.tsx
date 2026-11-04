import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  DMSans_400Regular,
  DMSans_500Medium,
} from '@expo-google-fonts/dm-sans';
import { Urbanist_600SemiBold, useFonts } from '@expo-google-fonts/urbanist';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { PhoneFrame } from './src/intro/components/PhoneFrame';
import { IntroSequence } from './src/intro/IntroSequence';
import { COLORS } from './src/intro/phases';
import { LandingPage } from './src/landing/LandingPage';
import { LANDING } from './src/landing/tokens';

const LANDING_FADE_MS = 480;

export default function App() {
  const [fontsLoaded] = useFonts({
    Urbanist_600SemiBold,
    DMSans_400Regular,
    DMSans_500Medium,
  });
  const [showLanding, setShowLanding] = useState(false);
  const [introKey, setIntroKey] = useState(0);
  const landingOpacity = useSharedValue(0);

  const onIntroComplete = useCallback(() => {
    setShowLanding(true);
  }, []);

  useEffect(() => {
    if (!showLanding) {
      landingOpacity.value = 0;
      return;
    }
    landingOpacity.value = withTiming(1, {
      duration: LANDING_FADE_MS,
      easing: Easing.out(Easing.cubic),
    });
  }, [showLanding, landingOpacity]);

  const landingStyle = useAnimatedStyle(() => ({
    opacity: landingOpacity.value,
  }));

  const replayIntro = useCallback(() => {
    landingOpacity.value = 0;
    setShowLanding(false);
    setIntroKey((k) => k + 1);
  }, [landingOpacity]);

  if (!fontsLoaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={LANDING.carrot} />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <PhoneFrame>
          {showLanding ? (
            <Animated.View style={[styles.fill, landingStyle]}>
              <LandingPage onReplayIntro={replayIntro} />
            </Animated.View>
          ) : (
            <IntroSequence key={introKey} onComplete={onIntroComplete} />
          )}
        </PhoneFrame>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.desktopBackdrop,
  },
  fill: {
    flex: 1,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: LANDING.bg,
  },
});
