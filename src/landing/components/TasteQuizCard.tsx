import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { LANDING } from '../tokens';

function Face({ tint }: { tint: 'cream' | 'pistachio' }) {
  return (
    <View
      style={[
        styles.face,
        tint === 'pistachio' ? styles.facePistachio : styles.faceCream,
      ]}
    >
      <View style={styles.eyes}>
        <View style={styles.eye} />
        <View style={styles.eye} />
      </View>
      <View style={styles.mouth} />
    </View>
  );
}

function ScaleRow({
  title,
  left,
  right,
  activeIndex,
}: {
  title: string;
  left: string;
  right: string;
  activeIndex: number;
}) {
  return (
    <View style={styles.scaleBlock}>
      <Text style={styles.scaleTitle}>{title}</Text>
      <View style={styles.scaleTrack}>
        {[0, 1, 2, 3, 4].map((i) => (
          <View
            key={i}
            style={[styles.dot, i === activeIndex && styles.dotActive]}
          />
        ))}
      </View>
      <View style={styles.scaleLabels}>
        <Text style={styles.scaleLabel}>{left}</Text>
        <Text style={styles.scaleLabel}>{right}</Text>
      </View>
    </View>
  );
}

/** Simplified “Let’s stir the pot!” quiz card from Figma. */
export function TasteQuizCard() {
  return (
    <View style={styles.shell}>
      <View style={styles.card}>
        <View style={styles.progress}>
          {[1, 1, 1, 0, 0].map((on, i) => (
            <View key={i} style={[styles.bar, on ? styles.barOn : styles.barOff]} />
          ))}
        </View>
        <Text style={styles.heading}>Let’s stir the pot!</Text>
        <View style={styles.faces}>
          <Face tint="cream" />
          <Face tint="pistachio" />
        </View>
        <View style={styles.scales}>
          <ScaleRow title="Sweet or Sour?" left="Sweet" right="Sour" activeIndex={2} />
          <ScaleRow title="Very Mild" left="Mild" right="Spicy" activeIndex={0} />
        </View>
        <View style={styles.chips}>
          <View style={styles.chip}>
            <Text style={styles.chipText}>Budget: mid-range</Text>
          </View>
          <View style={styles.chip}>
            <Text style={styles.chipText}>Try anything!</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    alignSelf: 'center',
    width: '88%',
    backgroundColor: LANDING.pistachio,
    borderRadius: 17,
    padding: 24,
  },
  card: {
    backgroundColor: LANDING.cream,
    borderRadius: 13,
    padding: 17,
    gap: 10,
    shadowColor: LANDING.cocoa,
    shadowOpacity: 0.11,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
  },
  progress: {
    flexDirection: 'row',
    gap: 4,
  },
  bar: {
    flex: 1,
    height: 3,
    borderRadius: 4,
  },
  barOn: { backgroundColor: LANDING.cocoa },
  barOff: { backgroundColor: LANDING.chipOutline },
  heading: {
    color: LANDING.cocoa,
    fontSize: 13,
    fontFamily: 'Urbanist_600SemiBold',
  },
  faces: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  face: {
    width: 72,
    height: 72,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: LANDING.carrot,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  faceCream: { backgroundColor: LANDING.bg },
  facePistachio: { backgroundColor: LANDING.pistachio },
  eyes: { flexDirection: 'row', gap: 12 },
  eye: {
    width: 6,
    height: 7,
    borderRadius: 3,
    backgroundColor: LANDING.carrot,
  },
  mouth: {
    width: 16,
    height: 6,
    borderBottomWidth: 2,
    borderColor: LANDING.carrot,
    borderRadius: 8,
  },
  scales: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  scaleBlock: { flex: 1, gap: 6 },
  scaleTitle: {
    textAlign: 'center',
    color: LANDING.cocoa,
    fontSize: 11,
    fontFamily: 'Urbanist_600SemiBold',
  },
  scaleTrack: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 6,
    backgroundColor: LANDING.chipBg,
    borderRadius: 54,
    borderWidth: 0.5,
    borderColor: LANDING.chipOutline,
  },
  dot: {
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: LANDING.chipMuted,
  },
  dotActive: {
    backgroundColor: LANDING.carrot,
    borderWidth: 0.5,
    borderColor: LANDING.chestnut,
  },
  scaleLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scaleLabel: {
    color: LANDING.chestnut,
    fontSize: 7,
    fontFamily: 'DMSans_400Regular',
  },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  chip: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    backgroundColor: LANDING.chipBg,
    borderRadius: 54,
    borderWidth: 0.5,
    borderColor: LANDING.chipOutline,
  },
  chipText: {
    color: LANDING.cocoa,
    fontSize: 8,
    fontFamily: 'DMSans_400Regular',
  },
});
