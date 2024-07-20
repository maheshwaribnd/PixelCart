import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomHeader from '../../../Components/CustomHeader/CustomHeader';
import {HEIGHT, Poppins_Regular, WIDTH} from '../../../Config/appConst';
import COLOR from '../../../Config/color.json';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons'

const ProfileScreen = () => {
  return (
    <View>
      <CustomHeader />
      <View>
        <View style={[styles.cartBox, { flexDirection: 'row', justifyContent: 'space-between'}]}>
          <View>
            <Text style={styles.name}>Timmy D'souza</Text>
            <Text style={styles.dec}>timmyD'souza@gmail.com</Text>
            <Text style={styles.des}>Timmy D'souza</Text>
          </View>
          <Feather name="edit" size={24} color={COLOR.Black}/>
        </View>

        <View style={styles.cartBox}>
          <View style={styles.optionsStyle}>
            <MaterialIcons name='logout' size={24} color={COLOR.Black}/>
            <Text style={[styles.dec, {color: COLOR.Black}]}>Your order</Text>
          </View>

          <View style={styles.optionsStyle}>
            <MaterialIcons name='logout' size={24} color={COLOR.Black}/>
            <Text style={[styles.dec, {color: COLOR.Black}]}>Change password</Text>
          </View>

          <View style={styles.optionsStyle}>
            <Ionicons name='notifications-outline' size={24} color={COLOR.Black}/>
            <Text style={[styles.dec, {color: COLOR.Black}]}>Notification alert</Text>
          </View> 

          <View style={styles.optionsStyle}>
            <Ionicons name='help-circle-outline' size={24} color={COLOR.Black}/>
            <Text style={[styles.dec, {color: COLOR.Black}]}>Help center</Text>
          </View>

          <View style={styles.optionsStyle}>
            <MaterialIcons name='logout' size={24} color={COLOR.Black}/>
            <Text style={[styles.dec, {color: COLOR.Black}]}>Terms & policy</Text>
          </View>

          <View style={styles.optionsStyle}>
            <MaterialIcons name='logout' size={24} color={COLOR.Black}/>
            <Text style={[styles.dec, {color: COLOR.Black}]}>About us</Text>
          </View>

          <View style={styles.optionsStyle}>
            <MaterialIcons name='logout' size={24} color={COLOR.Black}/>
            <Text style={[styles.dec, {color: '#FF0000'}]}>Sign out</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
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
flexDirection: 'row'
  }
});
