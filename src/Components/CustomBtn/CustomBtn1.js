import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {FONTSIZE, Poppins_Medium, WIDTH} from '../../Config/appConst';
import COLOR from '../../Config/color.json';

const CustomBtn1 = ({name, onPress}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.4}
      onPress={() => onPress()}
      style={styles.button}>
      <Text style={styles.txtBtn}>{name}</Text>
    </TouchableOpacity>
  );
};

export default CustomBtn1;

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: WIDTH(92),
    height: 48,
    borderRadius: 8,
    backgroundColor: COLOR.BtnColor,
    // marginTop: HEIGHT(3)
  },

  txtBtn: {
    fontFamily: Poppins_Medium,
    fontSize: FONTSIZE(2.4),
    color: COLOR.White,
  },
});