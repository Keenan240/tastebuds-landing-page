import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { LANDING } from '../tokens';

function TraitRow({
  label,
  youPct,
  dishPct,
}: {
  label: string;
  youPct: number;
  dishPct: number;
}) {
  return (
    <View style={styles.trait}>
      <Text style={styles.traitLabel}>{label}</Text>
      <View style={styles.track}>
        <View style={[styles.youDot, { left: `${youPct}%` as `${number}%` }]} />
        <View style={[styles.dishDot, { left: `${dishPct}%` as `${number}%` }]} />
      </View>
      <View style={styles.trackLabels}>
        <Text style={[styles.mini, { left: `${Math.max(0, youPct - 4)}%` as `${number}%` }]}>
          You
        </Text>
        <Text style={[styles.mini, { left: `${Math.max(0, dishPct - 4)}%` as `${number}%` }]}>
          Dish
        </Text>
      </View>
    </View>
  );
}

/** Simplified Dandan noodles match card from Figma. */
export function DishMatchCard() {
  return (
    <View style={styles.band}>
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
            <View style={styles.rings}>
              <View style={styles.ringMuted} />
              <View style={styles.ringCocoa} />
            </View>
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
  band: {
    width: '100%',
    backgroundColor: LANDING.peachBand,
    paddingVertical: 28,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  card: {
    width: '78%',
    backgroundColor: LANDING.cream,
    borderRadius: 16,
    padding: 15,
    gap: 11,
    shadowColor: LANDING.cocoa,
    shadowOpacity: 0.11,
    shadowRadius: 14,
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
  rings: { width: 36, height: 36 },
  ringMuted: {
    position: 'absolute',
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EEEEEE',
  },
  ringCocoa: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderRadius: 14,
    left: 4,
    top: 4,
    backgroundColor: LANDING.cocoa,
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
    backgroundColor: 'transparent',
    position: 'relative',
  },
  youDot: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: LANDING.cocoa,
    marginLeft: -6,
  },
  dishDot: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: LANDING.beige,
    borderWidth: 0.7,
    borderColor: LANDING.beige,
    marginLeft: -6,
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
