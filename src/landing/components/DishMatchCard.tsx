import React from 'react';
import { LayoutChangeEvent, StyleSheet, Text, View } from 'react-native';

import { LANDING } from '../tokens';

function MatchRing() {
  return (
    <View style={styles.ring}>
      <View style={styles.ringTrack} />
      <View style={styles.ringFill} />
    </View>
  );
}

function TraitRow({
  label,
  youPct,
  dishPct,
}: {
  label: string;
  youPct: number;
  dishPct: number;
}) {
  const [trackW, setTrackW] = React.useState(0);
  const onLayout = (e: LayoutChangeEvent) => {
    setTrackW(e.nativeEvent.layout.width);
  };

  return (
    <View style={styles.trait}>
      <Text style={styles.traitLabel}>{label}</Text>
      <View style={styles.track} onLayout={onLayout}>
        {trackW > 0 ? (
          <>
            <View
              style={[
                styles.youDot,
                { left: (youPct / 100) * trackW - 6 },
              ]}
            />
            <View
              style={[
                styles.dishDot,
                { left: (dishPct / 100) * trackW - 6 },
              ]}
            />
          </>
        ) : null}
      </View>
      <View style={styles.trackLabels}>
        {trackW > 0 ? (
          <>
            <Text
              style={[
                styles.mini,
                { left: Math.max(0, (youPct / 100) * trackW - 10) },
              ]}
            >
              You
            </Text>
            <Text
              style={[
                styles.mini,
                { left: Math.max(0, (dishPct / 100) * trackW - 12) },
              ]}
            >
              Dish
            </Text>
          </>
        ) : null}
      </View>
    </View>
  );
}

/** Dandan noodles match card from Figma (floats over the orange wave band). */
export function DishMatchCard() {
  return (
    <View style={styles.wrap}>
      <View style={styles.card}>
        <View style={styles.photo} />
        <View style={styles.titleRow}>
          <Text style={styles.title}>Dandan noodles</Text>
          <Text style={styles.price}>$12.99</Text>
        </View>
        <View style={styles.matchBox}>
          <View style={styles.matchHeader}>
            <View style={styles.matchPct}>
              <Text style={styles.pct}>98%</Text>
              <Text style={styles.matchWord}>match</Text>
            </View>
            <MatchRing />
            <View style={styles.copy}>
              <Text style={styles.bold}>Heated, bold flavours</Text>
              <Text style={styles.small}>
                Explore how this dish compares with your taste profile below.
              </Text>
            </View>
          </View>
          <TraitRow label="Spice" youPct={48} dishPct={68} />
          <TraitRow label="Savouriness" youPct={60} dishPct={68} />
          <TraitRow label="Richness" youPct={48} dishPct={18} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    paddingHorizontal: 24,
    alignItems: 'center',
    zIndex: 1,
  },
  card: {
    width: '78%',
    backgroundColor: LANDING.cream,
    borderRadius: 16,
    padding: 15,
    gap: 11,
    shadowColor: LANDING.cocoa,
    shadowOpacity: 0.14,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
  },
  photo: {
    width: '100%',
    height: 88,
    borderRadius: 9,
    backgroundColor: '#E8D5B5',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: LANDING.cocoa,
    fontSize: 16,
    fontFamily: 'Urbanist_600SemiBold',
  },
  price: {
    color: LANDING.cocoa,
    fontSize: 11,
    fontFamily: 'DMSans_500Medium',
  },
  matchBox: {
    borderWidth: 0.7,
    borderColor: LANDING.cocoa,
    borderRadius: 8,
    padding: 12,
    gap: 10,
  },
  matchHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  matchPct: { alignItems: 'center', width: 36 },
  pct: {
    color: LANDING.black,
    fontSize: 13,
    fontFamily: 'Urbanist_600SemiBold',
  },
  matchWord: {
    color: LANDING.black,
    fontSize: 9,
    fontFamily: 'DMSans_400Regular',
  },
  ring: {
    width: 36,
    height: 36,
    marginTop: 2,
  },
  ringTrack: {
    position: 'absolute',
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 4,
    borderColor: '#EEEEEE',
  },
  ringFill: {
    position: 'absolute',
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 4,
    borderColor: LANDING.cocoa,
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    transform: [{ rotate: '-45deg' }],
  },
  copy: { flex: 1, gap: 4 },
  bold: {
    color: LANDING.black,
    fontSize: 13,
    fontFamily: 'Urbanist_600SemiBold',
  },
  small: {
    color: LANDING.black,
    fontSize: 9,
    lineHeight: 13,
    fontFamily: 'DMSans_400Regular',
  },
  trait: { gap: 2 },
  traitLabel: {
    color: LANDING.black,
    fontSize: 11,
    fontFamily: 'Urbanist_600SemiBold',
  },
  track: {
    height: 12,
    marginTop: 4,
    position: 'relative',
  },
  youDot: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: LANDING.cocoa,
  },
  dishDot: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: LANDING.beige,
    borderWidth: 0.7,
    borderColor: LANDING.chestnut,
  },
  trackLabels: {
    height: 14,
    position: 'relative',
  },
  mini: {
    position: 'absolute',
    color: LANDING.black,
    fontSize: 9,
    fontFamily: 'DMSans_400Regular',
  },
});
