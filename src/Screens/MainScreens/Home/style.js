import {StyleSheet} from 'react-native';
import COLOR from '../../../Config/color.json';
import {
  Poppins_Medium,
  Poppins_Regular,
  HEIGHT,
  WIDTH,
  FONTSIZE,
} from '../../../Config/appConst';

export const styles = StyleSheet.create({
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: WIDTH(4),
    borderColor: COLOR.Gray,
    shadowOffset: {
      height: 10,
      width: 2,
    },
    elevation: 6,
    backgroundColor: COLOR.White,
    height: 64,
  },

  profile: {
    height: 67,
    width: 61,
  },

  name: {
    fontFamily: Poppins_Regular,
    color: COLOR.Black,
  },

  subtitle: {
    fontFamily: Poppins_Medium,
    fontSize: 16,
    color: COLOR.Black,
  },

  seeAllText: {
    fontFamily: Poppins_Medium,
    fontSize: 14,
    color: COLOR.BtnColor,
  },

  swipeView: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
  },

  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: WIDTH(93),
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLOR.Black,
    backgroundColor: COLOR.White,
    marginTop: HEIGHT(1),
    // marginBottom: HEIGHT(2),
  },

  txtBtn: {
    fontFamily: Poppins_Medium,
    fontSize: FONTSIZE(2.4),
    color: COLOR.Black,
  },

  listView: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 3,
    marginHorizontal: WIDTH(1.1),
    marginVertical: HEIGHT(1.5),
  },

  catlistImg: {
    height: 64,
    width: 64,
    borderWidth: 0.5,
    borderRadius: 12,
  },

  catlistView: {
    justifyContent: 'center',
    gap: 9,
    paddingHorizontal: WIDTH(3),
    paddingTop: 2,
  },

  bestsellerFlatView: {
    backgroundColor: COLOR.BlueLightShade,
    padding: WIDTH(3),
    paddingTop: HEIGHT(0),
  },

  dealofdayFlatView: {
    backgroundColor: '#FFE9AB',
    padding: WIDTH(3),
    paddingBottom: HEIGHT(3),
  },

  alignStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
