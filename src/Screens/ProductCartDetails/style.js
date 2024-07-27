import {StyleSheet} from 'react-native';
import COLOR from '../../Config/color.json';
import {
  HEIGHT,
  Inter_Regular,
  Poppins_Bold,
  Poppins_Medium,
  Poppins_Regular,
  Poppins_SemiBold,
  WIDTH,
} from '../../Config/appConst';

export const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: COLOR.BlueLightShade,
  },

  alignStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  cartBox: {
    justifyContent: 'center',
    padding: HEIGHT(1.5),
    marginTop: HEIGHT(3),
    marginBottom: HEIGHT(1),
    marginHorizontal: WIDTH(3),
    borderRadius: 6,
    backgroundColor: COLOR.White,
  },

  similarProductView: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 6,
    marginRight: WIDTH(2.5),
    marginHorizontal: WIDTH(1.1),
    marginVertical: HEIGHT(1.5),
  },

  title: {
    fontFamily: Inter_Regular,
    fontSize: 16,
    color: COLOR.Black,
  },

  readmore: {
    fontFamily: Poppins_SemiBold,
    fontSize: 14,
    color: COLOR.BtnColor,
  },

  shareTxt: {
    fontSize: 14,
    fontFamily: Poppins_Regular,
    color: COLOR.Black,
  },

  img: {
    width: WIDTH(87),
    height: HEIGHT(48),
    marginBottom: HEIGHT(4),
  },

  name: {
    fontFamily: Poppins_Regular,
    color: COLOR.Black,
  },

  reviewerName: {
    fontFamily: Poppins_Medium,
    fontSize: 14,
    color: COLOR.Black,
  },

  horizontalLine: {
    height: 0.5,
    width: WIDTH(89),
    backgroundColor: COLOR.Gray,
    elevation: 1,
  },

  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 154,
    height: 48,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLOR.BtnColor,
    marginTop: HEIGHT(3),
  },

  txtBtn: {
    fontFamily: Poppins_Bold,
    fontSize: 16,
    color: COLOR.White,
  },

  reviewbtn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: WIDTH(88),
    height: 48,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLOR.Gray,
    marginTop: HEIGHT(3),
  },

  reviewtxtBtn: {
    fontFamily: Poppins_Bold,
    fontSize: 16,
    color: COLOR.Black,
  },
});
