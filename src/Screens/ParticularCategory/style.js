import {StyleSheet} from 'react-native';
import COLOR from '../../Config/color.json';
import {
  HEIGHT,
  Poppins_Medium,
  Poppins_Regular,
  WIDTH,
} from '../../Config/appConst';

export const styles = StyleSheet.create({
  alignStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  categoryListView: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 3,
    marginHorizontal: WIDTH(1.1),
    marginVertical: HEIGHT(1.5),
  },

  catListImage: {
    height: 64,
    width: 64,
    borderWidth: 0.5,
    borderRadius: 12,
  },

  ParticularCatlistView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 9,
    marginHorizontal: WIDTH(4),
    marginVertical: WIDTH(3),
  },

  catListFlatlistView: {
    justifyContent: 'center',
    gap: 9,
    paddingHorizontal: WIDTH(3),
    paddingTop: 2,
  },

  name: {
    fontFamily: Poppins_Regular,
    color: COLOR.Black,
  },

  title: {
    fontFamily: Poppins_Medium,
    color: COLOR.Black,
    fontSize: 16,
    width: 203,
  },

  desc: {
    fontFamily: Poppins_Regular,
    fontSize: 12,
    color: COLOR.Gray,
  },

  price: {
    fontFamily: Poppins_Regular,
    fontSize: 16,
    color: COLOR.Black,
  },
});
