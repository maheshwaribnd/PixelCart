import {StyleSheet} from 'react-native';
import {HEIGHT, Poppins_Regular, WIDTH} from '../../Config/appConst';
import COLOR from '../../Config/color.json';

export const styles = StyleSheet.create({
  cartBox: {
    justifyContent: 'center',
    // alignItems: 'center',
    padding: HEIGHT(2),
    marginVertical: HEIGHT(1),
    marginHorizontal: WIDTH(3),
    borderRadius: 16,
    backgroundColor: COLOR.White,
  },

  input: {
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: COLOR.Gray,
    paddingLeft: WIDTH(3),
    marginVertical: HEIGHT(2.5),
    // width: 312,
    // height: 64,
  },

  text: {
    fontFamily: Poppins_Regular,
    fontSize: 16,
    color: COLOR.Black,
  },

  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginVertical: HEIGHT(1),
  },

  img: {
    height: HEIGHT(11),
    width: WIDTH(20),
    borderRadius: 16,
  },
});
