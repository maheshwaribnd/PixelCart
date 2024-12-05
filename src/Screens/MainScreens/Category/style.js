import {StyleSheet} from 'react-native';
import {HEIGHT, Poppins_Regular, WIDTH} from '../../../Config/appConst';
import COLOR from '../../../Config/color.json';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: COLOR.BlueLightShade,
  },

  viewWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: HEIGHT(2.5),
  },

  imgWrap: {
    width: WIDTH(30),
    height: 145,
    backgroundColor: COLOR.White,
    marginHorizontal: 3,
    marginBottom: HEIGHT(2),
  },

  image: {
    width: WIDTH(27),
    height: 107,
    marginHorizontal: WIDTH(1.5),
    marginVertical: HEIGHT(1),
  },

  name: {
    fontFamily: Poppins_Regular,
    fontSize: 14,
    color: COLOR.Black,
    textAlign: 'center',
  },
});
