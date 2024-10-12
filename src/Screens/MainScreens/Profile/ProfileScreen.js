import {Image, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './style';
import CustomHeader from '../../../Components/CustomHeader/CustomHeader';
import COLOR from '../../../Config/color.json';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Switch} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import CustomBtn1 from '../../../Components/CustomBtn/CustomBtn1';
import {HEIGHT} from '../../../Config/appConst';
import ApiManager from '../../../API/Api';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState(false);
  const [userData, setUserData] = useState([]);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  useEffect(() => {
    UserProfileAPIFunction();
  }, []);

  const UserProfileAPIFunction = async () => {
    const userDetails = await AsyncStorage.getItem('userData');
    const user = JSON.parse(userDetails);
    const userId = user?.customer_id;

    const params = {
      user_id: userId,
    };

    ApiManager.userData(params)
      .then(res => {
        setUserData(res?.data);
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  const SignOut = async () => {
    AsyncStorage.clear();
    navigation.navigate('login');
  };

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <CustomHeader />
      {userData ? (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <View
            style={[
              styles.cartBox,
              {flexDirection: 'row', justifyContent: 'space-between'},
            ]}>
            <View>
              <Text style={styles.name}>{userData?.user_profile}</Text>
              <Text style={styles.dec}>{userData?.users_email}</Text>
              <Text style={styles.des}>{userData?.users_mob}</Text>
            </View>
            <Feather
              name="edit"
              size={20}
              color={COLOR.BtnColor}
              onPress={() => navigation.navigate('editprofile')}
            />
          </View>

          <View style={styles.cartBox}>
            <TouchableOpacity
              onPress={() => navigation.navigate('orderlist')}
              style={styles.optionsStyle}>
              <FontAwesome name="reorder" size={24} color={COLOR.BtnColor} />
              <Text style={[styles.dec, {color: COLOR.Black}]}>Your order</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity
              onPress={() => navigation.navigate('newpassword')}
              style={styles.optionsStyle}>
              <Ionicons name="key-outline" size={24} color={COLOR.BtnColor} />
              <Text style={[styles.dec, {color: COLOR.Black}]}>
                Change password
              </Text>
            </TouchableOpacity> */}

            <TouchableOpacity
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
            </TouchableOpacity>

            {/* <TouchableOpacity style={styles.optionsStyle}>
              <Ionicons
                name="help-circle-outline"
                size={24}
                color={COLOR.BtnColor}
              />
              <Text style={[styles.dec, {color: COLOR.Black}]}>
                Help center
              </Text>
            </TouchableOpacity> */}

            {/* <TouchableOpacity style={styles.optionsStyle}>
              <MaterialIcons name="logout" size={20} color={COLOR.BtnColor} />
              <Text style={[styles.dec, {color: COLOR.Black}]}>
                Terms & policy
              </Text>
            </TouchableOpacity> */}

            <TouchableOpacity style={styles.optionsStyle}>
              <AntDesign name="exclamation" size={24} color={COLOR.BtnColor} />
              <Text style={[styles.dec, {color: COLOR.Black}]}>About us</Text>
            </TouchableOpacity>

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
