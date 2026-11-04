import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { LANDING } from '../tokens';

function Chip({ label, selected }: { label: string; selected?: boolean }) {
  return (
    <View style={[styles.chip, selected ? styles.chipOn : styles.chipOff]}>
      <Text style={[styles.chipText, selected && styles.chipTextOn]}>{label}</Text>
      {selected ? <Text style={styles.check}>✓</Text> : null}
    </View>
  );
}

/** Simplified post-meal log / feedback card from Figma. */
export function LogFeedbackCard() {
  return (
    <View style={styles.wrap}>
      <View style={styles.floatCard}>
        <View style={styles.thumb} />
        <View style={styles.floatCopy}>
          <Text style={styles.floatTitle}>Beef Bibimbap</Text>
          <Text style={styles.floatSub}>Saved for your next craving</Text>
        </View>
        <Text style={styles.bookmark}>▾</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>What flavours did you like?</Text>
        <View style={styles.row}>
          <Chip label="Sweetness" selected />
          <Chip label="Spiciness" />
        </View>
        <View style={styles.row}>
          <Chip label="Saltiness" selected />
        </View>

        <Text style={styles.heading}>And what about the textures?</Text>
        <View style={styles.row}>
          <Chip label="Crunchiness" selected />
          <Chip label="Smoothness" />
        </View>
        <View style={styles.row}>
          <Chip label="Flakiness" selected />
        </View>

        <View style={styles.note}>
          <Text style={styles.noteText}>
            A little feedback. A more personal taste profile.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    paddingHorizontal: 24,
    minHeight: 340,
  },
  floatCard: {
    position: 'absolute',
    left: 8,
    top: 8,
    zIndex: 2,
    width: 178,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 9,
    backgroundColor: LANDING.chipBg,
    borderRadius: 11,
    transform: [{ rotate: '-11deg' }],
    shadowColor: LANDING.cocoa,
    shadowOpacity: 0.11,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
  },
  thumb: {
    width: 47,
    height: 45,
    borderRadius: 7,
    backgroundColor: '#E8C9A0',
  },
  floatCopy: { flex: 1, gap: 2 },
  floatTitle: {
    color: LANDING.cocoa,
    fontSize: 10,
    fontFamily: 'DMSans_500Medium',
  },
  floatSub: {
    color: LANDING.chestnut,
    fontSize: 7,
    fontFamily: 'DMSans_400Regular',
  },
  bookmark: { color: LANDING.carrot, fontSize: 12 },
  card: {
    marginTop: 40,
    marginLeft: 40,
    backgroundColor: LANDING.cream,
    borderRadius: 17,
    padding: 18,
    gap: 12,
    shadowColor: LANDING.cocoa,
    shadowOpacity: 0.11,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
  },
  heading: {
    color: LANDING.cocoa,
    fontSize: 15,
    fontFamily: 'Urbanist_600SemiBold',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 15,
  },
  chipOn: { backgroundColor: LANDING.cocoa },
  chipOff: { backgroundColor: '#F2F2F2' },
  chipText: {
    color: LANDING.black,
    fontSize: 10,
    fontFamily: 'DMSans_500Medium',
  },
  chipTextOn: { color: '#fff' },
  check: { color: '#fff', fontSize: 10 },
  note: {
    backgroundColor: LANDING.pistachio,
    borderRadius: 9,
    padding: 9,
  },
  noteText: {
    color: LANDING.cocoa,
    fontSize: 9,
    lineHeight: 12,
    fontFamily: 'DMSans_400Regular',
  },
});
