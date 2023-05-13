import * as React from 'react';
import Svg, {Path, Defs, Pattern, Use, Image} from 'react-native-svg';
const SvgHospital = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 37 37"
    {...props}>
    <Path fill="url(#Hospital_svg__a)" d="M.5 36.52h36v-36H.5v36Z" />
    <Defs>
      <Pattern
        id="Hospital_svg__a"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox">
        <Use xlinkHref="#Hospital_svg__b" transform="scale(.01563)" />
      </Pattern>
      <Image
        xlinkHref="data:image/png;base64,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"
        id="Hospital_svg__b"
        width={64}
        height={64}
      />
    </Defs>
  </Svg>
);
export default SvgHospital;
