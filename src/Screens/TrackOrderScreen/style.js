import {StyleSheet} from 'react-native';
import {HEIGHT, Inter_Regular, WIDTH} from '../../Config/appConst';
import COLOR from '../../Config/color.json';

export const styles = StyleSheet.create({
  cartBox: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    padding: HEIGHT(2),
    marginVertical: HEIGHT(3),
    marginHorizontal: WIDTH(3),
    borderRadius: 16,
    backgroundColor: COLOR.White,
  },

  viewBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginVertical: HEIGHT(1),
  },

  name: {
    fontFamily: Inter_Regular,
    fontSize: 16,
    color: COLOR.Black,
  },

  img: {
    height: HEIGHT(11),
    width: WIDTH(20),
    borderRadius: 16,
  },
});
