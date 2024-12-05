import {StyleSheet} from 'react-native';
import COLOR from '../../../Config/color.json';
import {
  HEIGHT,
  Inter_Regular,
  Poppins_Bold,
  Poppins_Medium,
  Poppins_Regular,
  WIDTH,
} from '../../../Config/appConst';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: COLOR.BlueLightShade,
  },

  cartBox: {
    justifyContent: 'center',
    padding: HEIGHT(2),
    marginVertical: HEIGHT(3),
    marginHorizontal: WIDTH(3),
    borderRadius: 16,
    backgroundColor: COLOR.White,
  },

  alignStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  title: {
    fontFamily: Poppins_Bold,
    fontSize: 16,
  },

  total: {
    fontFamily: Poppins_Medium,
    fontSize: 16,
    color: COLOR.Gray,
  },

  name: {
    fontFamily: Inter_Regular,
    fontSize: 16,
    color: COLOR.Black,
  },

  cartEmptyTxt: {
    fontFamily: Poppins_Regular,
    fontSize: 14,
    color: COLOR.Gray,
  },

  cartBox2: {
    flex: 1,
    padding: HEIGHT(2),
    marginBottom: HEIGHT(3),
    marginHorizontal: WIDTH(3),
    borderRadius: 16,
    backgroundColor: COLOR.White,
  },

  itemcartBox: {
    // justifyContent: 'center',
    alignItems: 'center',
    padding: HEIGHT(3),
    marginVertical: HEIGHT(3),
    marginHorizontal: WIDTH(3),
    borderRadius: 16,
    backgroundColor: COLOR.White,
  },

  QuantityWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: HEIGHT(1.2),
  },

  qty: {
    backgroundColor: COLOR.BtnColor,
    height: 32,
    width: 32,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderColor: COLOR.LightGrey,
    elevation: 5,
    fontFamily: Poppins_Medium,
    fontSize: 16,
  },

  quantityCount: {
    backgroundColor: COLOR.BlueLightShade,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },

  removebtnContainer: {
    backgroundColor: COLOR.BlueLightShade,
    borderWidth: 1,
    borderColor: COLOR.BtnColor,
    height: 32,
    width: 115,
    marginRight: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  removeBtnTxt: {
    fontFamily: Poppins_Regular,
    fontSize: 16,
    color: COLOR.BtnColor,
  },

  TrackBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#008215',
    borderRadius: 10,
    height: 32,
    width: 62,
    marginHorizontal: 3,
  },

  trackBtnTxt: {
    fontFamily: Poppins_Regular,
    fontSize: 12,
    color: '#008215',
  },

  dashlineStyle: {
    marginTop: HEIGHT(1),
    marginBottom: HEIGHT(1),
    marginVertical: WIDTH(3),
  },
});
