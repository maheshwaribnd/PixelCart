import {Dimensions} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

//  Responsive Design width & height
export const HEIGHT = responsiveHeight;
export const WIDTH = responsiveWidth;
export const FONTSIZE = responsiveFontSize;

// Dimensions
export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

// Custom Fonts
export const Poppins_Bold = 'Poppins-Bold';
export const Poppins_ExtraBold = 'Poppins-ExtraBold';
export const Poppins_Light = 'Poppins-Light';
export const Poppins_ExtraLight = 'Poppins-ExtraLight';
export const Poppins_Regular = 'Poppins-Regular';
export const Poppins_Medium = 'Poppins-Medium';
export const Poppins_SemiBold = 'Poppins-SemiBold';
export const Inter_Regular = 'Inter-Regular';
