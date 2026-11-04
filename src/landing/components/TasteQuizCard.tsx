import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Ellipse, Path } from 'react-native-svg';

import { LANDING } from '../tokens';

function FruitIcon() {
  return (
    <Svg width={56} height={56} viewBox="0 0 56 56" fill="none">
      <Ellipse cx="22" cy="30" rx="14" ry="16" fill="#F6C84C" />
      <Ellipse cx="34" cy="30" rx="14" ry="16" fill="#FFF6D6" stroke={LANDING.carrot} strokeWidth={1.5} />
      <Path
        d="M28 14c2-6 8-8 10-8"
        stroke={LANDING.carrot}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <Circle cx="18" cy="28" r="1.6" fill={LANDING.carrot} />
      <Circle cx="24" cy="28" r="1.6" fill={LANDING.carrot} />
      <Path d="M19 34c2 2 5 2 7 0" stroke={LANDING.carrot} strokeWidth={1.4} strokeLinecap="round" />
    </Svg>
  );
}

function ChiliIcon() {
  return (
    <Svg width={56} height={56} viewBox="0 0 56 56" fill="none">
      <Path
        d="M30 12c6 2 10 10 10 18 0 10-6 18-12 20-4 1-8-2-9-8-2-8 2-18 8-24 1-1 2-3 3-6z"
        fill={LANDING.pistachio}
        stroke={LANDING.carrot}
        strokeWidth={1.5}
      />
      <Path
        d="M30 12c2 4 1 7-1 9"
        stroke={LANDING.carrot}
        strokeWidth={1.4}
        strokeLinecap="round"
      />
      <Circle cx="28" cy="30" r="1.5" fill={LANDING.carrot} />
      <Circle cx="34" cy="30" r="1.5" fill={LANDING.carrot} />
      <Path d="M29 36c2 1.5 5 1.5 7 0" stroke={LANDING.carrot} strokeWidth={1.3} strokeLinecap="round" />
    </Svg>
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

/** “Let’s stir the pot!” quiz card from Figma. */
export function TasteQuizCard() {
  return (
    <View style={styles.shell}>
      <View style={styles.card}>
        <View style={styles.progress}>
          {[1, 1, 1, 0].map((on, i) => (
            <View key={i} style={[styles.bar, on ? styles.barOn : styles.barOff]} />
          ))}
        </View>
        <Text style={styles.heading}>Let’s stir the pot!</Text>
        <View style={styles.faces}>
          <FruitIcon />
          <ChiliIcon />
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
    justifyContent: 'space-around',
    paddingHorizontal: 8,
    paddingVertical: 4,
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
