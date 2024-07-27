import {Image, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {styles} from './style';
import CustomHeader from '../../../Components/CustomHeader/CustomHeader';
import COLOR from '../../../Config/color.json';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Switch} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import CustomBtn1 from '../../../Components/CustomBtn/CustomBtn1';
import {HEIGHT} from '../../../Config/appConst';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState(false);
  const [data, setData] = useState(false);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const SignOut = async () => {
    // AsyncStorage.clear();
    // navigation.navigate('login')
    const userDetails = await AsyncStorage.getItem('userData');
    console.log('Data', userDetails);
    if (userDetails) {
      setData(true);
    }
    // const data1 = JSON.parse(data)
  };

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <CustomHeader />
      {data ? (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <View
            style={[
              styles.cartBox,
              {flexDirection: 'row', justifyContent: 'space-between'},
            ]}>
            <View>
              <Text style={styles.name}>Timmy D'souza</Text>
              <Text style={styles.dec}>timmyD'souza@gmail.com</Text>
              <Text style={styles.des}>+91 869745812</Text>
            </View>
            <Feather
              name="edit"
              size={20}
              color={COLOR.BtnColor}
              onPress={() => navigation.navigate('editprofile')}
            />
          </View>

          <View style={styles.cartBox}>
            <View style={styles.optionsStyle}>
              <MaterialIcons name="logout" size={24} color={COLOR.BtnColor} />
              <Text style={[styles.dec, {color: COLOR.Black}]}>Your order</Text>
            </View>

            <View style={styles.optionsStyle}>
              <Ionicons name="key-outline" size={24} color={COLOR.BtnColor} />
              <Text style={[styles.dec, {color: COLOR.Black}]}>
                Change password
              </Text>
            </View>

            <View
              style={[styles.optionsStyle, {justifyContent: 'space-between'}]}>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 7}}>
                <Ionicons
                  name="notifications-outline"
                  size={24}
                  color={COLOR.BtnColor}
                />
                <Text style={[styles.dec, {color: COLOR.Black}]}>
                  Notification alert
                </Text>
              </View>
              <Switch
                trackColor={{
                  false: COLOR.BlueLightShade,
                  true: COLOR.BlueLightShade,
                }}
                thumbColor={isEnabled ? COLOR.BtnColor : COLOR.BtnColor}
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>

            <View style={styles.optionsStyle}>
              <Ionicons
                name="help-circle-outline"
                size={24}
                color={COLOR.BtnColor}
              />
              <Text style={[styles.dec, {color: COLOR.Black}]}>
                Help center
              </Text>
            </View>

            <View style={styles.optionsStyle}>
              <MaterialIcons name="logout" size={20} color={COLOR.BtnColor} />
              <Text style={[styles.dec, {color: COLOR.Black}]}>
                Terms & policy
              </Text>
            </View>

            <View style={styles.optionsStyle}>
              <MaterialIcons name="logout" size={24} color={COLOR.BtnColor} />
              <Text style={[styles.dec, {color: COLOR.Black}]}>About us</Text>
            </View>

            <TouchableOpacity
              onPress={() => SignOut()}
              style={styles.optionsStyle}>
              <MaterialIcons name="logout" size={24} color={COLOR.BtnColor} />
              <Text style={[styles.dec, {color: '#FF0000'}]}>Sign out</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image source={require('../../../Images/randomImg/splash.png')} />
          <View style={{marginTop: HEIGHT(4)}}>
            <CustomBtn1
              name="Signin"
              onPress={() => navigation.navigate('login')}
            />
          </View>
          <View style={styles.accountText}>
            <Text style={[styles.text, {color: COLOR.Black}]}>
              Don't have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('signup')}>
              <Text style={styles.text}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default ProfileScreen;
