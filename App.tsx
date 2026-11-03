import React, { useCallback } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Urbanist_600SemiBold, useFonts } from '@expo-google-fonts/urbanist';

import { PhoneFrame } from './src/intro/components/PhoneFrame';
import { IntroSequence } from './src/intro/IntroSequence';
import { COLORS } from './src/intro/phases';

export default function App() {
  const [fontsLoaded] = useFonts({
    Urbanist_600SemiBold,
  });

  const onComplete = useCallback(() => {
    // Part 2 landing hooks here
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={COLORS.orange} />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <PhoneFrame>
          <IntroSequence
            fontFamily="Urbanist_600SemiBold"
            onComplete={onComplete}
          />
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
    backgroundColor: COLORS.background,
  },
});
