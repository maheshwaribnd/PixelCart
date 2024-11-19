import {StyleSheet} from 'react-native';
import {
  FONTSIZE,
  HEIGHT,
  Poppins_Bold,
  Poppins_Medium,
  Poppins_Regular,
  WIDTH,
} from '../../Config/appConst';
import COLOR from '../../Config/color.json';

export const styles = StyleSheet.create({
  cartBox: {
    justifyContent: 'center',
    padding: HEIGHT(2),
    marginVertical: HEIGHT(3),
    borderRadius: 10,
    backgroundColor: COLOR.White,
  },

  alignStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  input: {
    borderWidth: 0.5,
    borderRadius: 5,
    color: COLOR.Black,
    borderColor: COLOR.Gray,
    paddingLeft: WIDTH(3),
    marginVertical: HEIGHT(1),
    // width: 312,
    // height: 64,
  },

  textStyle: {
    fontFamily: Poppins_Regular,
    fontSize: 14,
    color: COLOR.Black,
  },

  subtitle: {
    fontFamily: Poppins_Regular,
    fontSize: 14,
    color: COLOR.Black,
  },

  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 325,
    height: 48,
    borderWidth: 0.5,
    borderColor: COLOR.Gray,
    borderRadius: 8,
    backgroundColor: COLOR.White,
    marginTop: HEIGHT(1),
  },

  txtBtn: {
    fontFamily: Poppins_Medium,
    fontSize: FONTSIZE(2.4),
    color: COLOR.Black,
  },

  priceBox: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: COLOR.White,
    // width: 328,
    height: 65,
  },

  innerpriceBox: {
    backgroundColor: COLOR.BlueLightShade,
    height: 50,
    margin: HEIGHT(1),
    paddingHorizontal: WIDTH(3),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 7,
  },

  purchasebtn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#008215',
    borderRadius: 6,
    width: 110,
    height: 40,
  },

  purchaseBtnTxt: {
    color: COLOR.White,
    fontFamily: Poppins_Bold,
    fontSize: 16,
  },

  priceTxt: {
    color: COLOR.Black,
    fontFamily: Poppins_Regular,
    fontSize: 18,
  },
});
