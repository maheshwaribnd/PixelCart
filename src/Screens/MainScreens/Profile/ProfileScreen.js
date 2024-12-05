import {Image, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {styles} from './style';
import CustomHeader from '../../../Components/CustomHeader/CustomHeader';
import COLOR from '../../../Config/color.json';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Switch} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import CustomBtn1 from '../../../Components/CustomBtn/CustomBtn1';
import {HEIGHT} from '../../../Config/appConst';
import {useDispatch, useSelector} from 'react-redux';
import ApiManager from '../../../API/Api';
import {ProductListingFunction} from '../../../Redux/Reducers/ProductList';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const selector = useSelector(state => state?.UserDetails);

  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState(false);
  const [profileData, setProfileData] = useState([]);
  const [userData, setUser] = useState([]);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  useFocusEffect(
    useCallback(() => {
      const fetchUserProfile = async () => {
        const userDetails = await AsyncStorage.getItem('userData');
        const user = JSON.parse(userDetails);
        setUser(user);
        const userId = user?.customer_id;

        const params = {
          user_id: userId,
        };

        ApiManager.userData(params)
          .then(res => {
            setProfileData(res?.data); // Update profile data on focus
          })
          .catch(err => {
            console.log('Error fetching profile data:', err);
          });
      };

      fetchUserProfile();
    }, []),
  );

  const SignOut = async () => {
    AsyncStorage.clear();
    await AsyncStorage.clear();
    dispatch(ProductListingFunction({products: []}));
    // dispatch(ProductListingFunction({product_id: '', quantity: ''}));
    navigation.reset({
      index: 0,
      routes: [{name: 'login'}],
    });
    // navigation.navigate('login');
  };

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <CustomHeader name="Profile" />
      {userData ? (
        <View style={{flex: 1}}>
          <View
            style={[
              styles.cartBox,
              {flexDirection: 'row', justifyContent: 'space-between'},
            ]}>
            <View>
              <Text style={styles.name}>{profileData[0]?.users_name}</Text>
              <Text style={styles.dec}>{profileData[0]?.users_email}</Text>
              <Text style={styles.des}>{profileData[0]?.users_mob}</Text>
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
