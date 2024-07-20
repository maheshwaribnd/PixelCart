import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'

import COLOR from '../../Config/color.json';
import {HEIGHT, Poppins_Medium, WIDTH} from '../../Config/appConst';

const CustomHeader = ({name}) => {
  return (
    <View style={styles.headerView}>
      <FontAwesome6 name='arrow-left-long' size={20} color={COLOR.Black} style={{paddingLeft: 6}} />
      <Text style={styles.headerName}>{name}</Text>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: HEIGHT(1.5),
    height: 64,
    shadowOffset: {
      height: 10,
      width: 2
    },
    elevation: 6,
    backgroundColor: COLOR.White
  },

  headerName: {
    fontSize: 20,
    fontFamily: Poppins_Medium,
    color: COLOR.Black,
    textAlign: 'center',
    paddingLeft: WIDTH(32),
  },
});
