/**
 * Module dependencies.
 */
import {Dimensions, Platform, PixelRatio} from 'react-native';

/*Get screen dimensions */
export var {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} =
  Dimensions.get('window');

const wscale: number = SCREEN_WIDTH / 414;
const hscale: number = SCREEN_HEIGHT / 894;

/**
 * Function `normalize`.
 */

export default function normalize(
  size: number,
  based: 'width' | 'height' = 'width',
) {
  const newSize = based === 'height' ? size * hscale : size * wscale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}
