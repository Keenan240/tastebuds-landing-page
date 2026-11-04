import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';

import { LANDING } from '../tokens';

type Props = {
  title: string;
  price: string;
  match: string;
  tags: string[];
  image: ImageSourcePropType;
  restaurant: string;
  meta: string;
  width?: number;
};

/** Full dish card matching the Figma carousel tiles (used when we lack a full export). */
export function DishCard({
  title,
  price,
  match,
  tags,
  image,
  restaurant,
  meta,
  width = 236,
}: Props) {
  return (
    <View style={[styles.card, { width }]}>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.price}>{price}</Text>
        </View>
        <View style={styles.matchPill}>
          <Text style={styles.matchText}>{match}</Text>
        </View>
      </View>

      <View style={styles.tags}>
        {tags.map((tag) => (
          <View key={tag} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>

      <View style={styles.imageWrap}>
        <Image source={image} style={styles.image} resizeMode="cover" />
        <View style={styles.heart}>
          <Text style={styles.heartIcon}>♡</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.footerText}>
          <Text style={styles.restaurant}>{restaurant}</Text>
          <Text style={styles.meta}>{meta}</Text>
        </View>
        <View style={styles.cta}>
          <Text style={styles.ctaText}>View dish</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: LANDING.cream,
    borderRadius: 22,
    padding: 12,
    gap: 8,
    shadowColor: LANDING.cocoa,
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 8,
  },
  headerText: { flex: 1, gap: 2 },
  title: {
    color: LANDING.cocoa,
    fontSize: 18,
    fontFamily: 'Urbanist_600SemiBold',
  },
  price: {
    color: LANDING.cocoa,
    fontSize: 13,
    fontFamily: 'DMSans_500Medium',
  },
  matchPill: {
    borderWidth: 1.5,
    borderColor: LANDING.pistachio,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  matchText: {
    color: LANDING.cocoa,
    fontSize: 10,
    fontFamily: 'DMSans_500Medium',
  },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  tag: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    shadowColor: LANDING.cocoa,
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  tagText: {
    color: LANDING.carrot,
    fontSize: 11,
    fontFamily: 'DMSans_500Medium',
  },
  imageWrap: {
    borderRadius: 16,
    overflow: 'hidden',
    height: 120,
  },
  image: { width: '100%', height: '100%' },
  heart: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartIcon: { color: LANDING.carrot, fontSize: 14 },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  footerText: { flex: 1, gap: 2 },
  restaurant: {
    color: LANDING.cocoa,
    fontSize: 13,
    fontFamily: 'Urbanist_600SemiBold',
  },
  meta: {
    color: LANDING.openGreen,
    fontSize: 11,
    fontFamily: 'DMSans_400Regular',
  },
  cta: {
    backgroundColor: LANDING.carrot,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  ctaText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Urbanist_600SemiBold',
  },
});
