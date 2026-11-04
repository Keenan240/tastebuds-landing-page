import React, { createContext, useContext } from 'react';
import type { RefObject } from 'react';
import type { SharedValue } from 'react-native-reanimated';

type NativeViewLike = {
  measureLayout: (
    relativeToNativeNode: number | NativeViewLike,
    onSuccess: (left: number, top: number, width: number, height: number) => void,
    onFail: () => void,
  ) => void;
};

type ScrollRevealValue = {
  scrollY: SharedValue<number>;
  viewportH: SharedValue<number>;
  contentRef: RefObject<NativeViewLike | null>;
};

export type { NativeViewLike };

const ScrollRevealContext = createContext<ScrollRevealValue | null>(null);

export function ScrollRevealProvider({
  value,
  children,
}: {
  value: ScrollRevealValue;
  children: React.ReactNode;
}) {
  return (
    <ScrollRevealContext.Provider value={value}>
      {children}
    </ScrollRevealContext.Provider>
  );
}

export function useScrollReveal() {
  const ctx = useContext(ScrollRevealContext);
  if (!ctx) {
    throw new Error('useScrollReveal must be used within ScrollRevealProvider');
  }
  return ctx;
}
