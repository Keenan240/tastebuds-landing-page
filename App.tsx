import React, { useCallback, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  DMSans_400Regular,
  DMSans_500Medium,
} from '@expo-google-fonts/dm-sans';
import { Urbanist_600SemiBold, useFonts } from '@expo-google-fonts/urbanist';

import { PhoneFrame } from './src/intro/components/PhoneFrame';
import { IntroSequence } from './src/intro/IntroSequence';
import { COLORS } from './src/intro/phases';
import { LandingPage } from './src/landing/LandingPage';
import { LANDING } from './src/landing/tokens';

export default function App() {
  const [fontsLoaded] = useFonts({
    Urbanist_600SemiBold,
    DMSans_400Regular,
    DMSans_500Medium,
  });
  const [showLanding, setShowLanding] = useState(false);
  const [introKey, setIntroKey] = useState(0);

  const onIntroComplete = useCallback(() => {
    setShowLanding(true);
  }, []);

  const replayIntro = useCallback(() => {
    setShowLanding(false);
    setIntroKey((k) => k + 1);
  }, []);

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
            <LandingPage onReplayIntro={replayIntro} />
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
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: LANDING.bg,
  },
});
