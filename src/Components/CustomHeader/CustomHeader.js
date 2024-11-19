import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

import COLOR from '../../Config/color.json';
import {HEIGHT, Poppins_Medium, WIDTH} from '../../Config/appConst';
import {useNavigation} from '@react-navigation/native';

const CustomHeader = ({name}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerView}>
      <FontAwesome6
        name="arrow-left-long"
        size={20}
        color={COLOR.Black}
        style={{paddingLeft: 6}}
        onPress={() => navigation.goBack()}
      />

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
      width: 2,
    },
    elevation: 6,
    backgroundColor: COLOR.White,
    shadowColor: COLOR.Black,
    shadowOpacity: 0.1,
  },

  headerName: {
    fontSize: 20,
    fontFamily: Poppins_Medium,
    color: COLOR.Black,
    textAlign: 'center',
    paddingLeft: WIDTH(28),
  },
});
