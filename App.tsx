import React, { useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
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

export default function App() {
  // Load fonts in the background — never block on a spinner; bowl intro
  // can sit empty until typefaces arrive for later landing copy.
  useFonts({
    Urbanist_600SemiBold,
    DMSans_400Regular,
    DMSans_500Medium,
  });
  const [showLanding, setShowLanding] = useState(false);

  const onIntroComplete = useCallback(() => {
    setShowLanding(true);
  }, []);

  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <PhoneFrame>
          {showLanding ? (
            <LandingPage />
          ) : (
            <IntroSequence onComplete={onIntroComplete} />
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
});
