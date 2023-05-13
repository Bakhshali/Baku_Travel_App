import * as React from 'react';
import Svg, {Path, Defs, Pattern, Use, Image} from 'react-native-svg';
const SvgHotel = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 37 37"
    {...props}>
    <Path fill="url(#Hotel_svg__a)" d="M.5 36.52h36v-36H.5v36Z" />
    <Defs>
      <Pattern
        id="Hotel_svg__a"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox">
        <Use xlinkHref="#Hotel_svg__b" transform="scale(.01563)" />
      </Pattern>
      <Image
        xlinkHref="data:image/png;base64,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"
        id="Hotel_svg__b"
        width={64}
        height={64}
      />
    </Defs>
  </Svg>
);
export default SvgHotel;
