import {Image, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    const userDetails = await AsyncStorage.getItem('userData');
    setTimeout(() => {
      if (userDetails) {
        navigation.navigate('Dashboard');
      } else {
        navigation.navigate('login');
      }
    }, 3000);
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image source={require('../../Images/randomImg/splash.png')} />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({});
