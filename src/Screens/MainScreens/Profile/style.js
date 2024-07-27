import {StyleSheet} from 'react-native';
import COLOR from '../../../Config/color.json';
import {HEIGHT, Poppins_Regular, WIDTH} from '../../../Config/appConst';

export const styles = StyleSheet.create({
  cartBox: {
    justifyContent: 'center',
    padding: HEIGHT(2),
    marginVertical: HEIGHT(3),
    marginHorizontal: WIDTH(3),
    borderRadius: 10,
    backgroundColor: COLOR.White,
  },

  name: {
    fontFamily: Poppins_Regular,
    fontSize: 18,
    color: COLOR.Black,
  },

  dec: {
    fontFamily: Poppins_Regular,
    fontSize: 14,
    color: COLOR.Gray,
  },

  optionsStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginVertical: HEIGHT(2),
  },

  text: {
    color: '#0071C1',
    marginTop: HEIGHT(3),
    fontFamily: Poppins_Regular,
    fontSize: 14,
  },

  accountText: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
});
