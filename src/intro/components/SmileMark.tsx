import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

import { COLORS } from '../phases';

type Props = {
  width?: number | string;
  height?: number | string;
  color?: string;
};

/** Vector Tastebuds smile mark — scales cleanly at any size. */
export function SmileMark({
  width = 48,
  height = 60,
  color = COLORS.orange,
}: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 64 80" fill="none">
      <Circle cx="18" cy="13" r="9" fill={color} />
      <Circle cx="46" cy="13" r="9" fill={color} />
      <Path
        d="M8 24
           C8 18 13 14 18 14
           C23 14 26 18 26 24
           L26 46
           C26 56 29 64 32 64
           C35 64 38 56 38 46
           L38 24
           C38 18 41 14 46 14
           C51 14 56 18 56 24
           L56 48
           C56 68 46 78 32 78
           C18 78 8 68 8 48
           Z"
        fill={color}
      />
    </Svg>
  );
}
