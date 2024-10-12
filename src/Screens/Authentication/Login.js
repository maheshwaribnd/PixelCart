import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {
  HEIGHT,
  Poppins_Medium,
  Poppins_Regular,
  WIDTH,
} from '../../Config/appConst';
import COLOR from '../../Config/color.json';
import {useNavigation} from '@react-navigation/native';
import CustomBtn1 from '../../Components/CustomBtn/CustomBtn1';
import ApiManager from '../../API/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Snackbar from 'react-native-snackbar';

const Login = () => {
  const navigation = useNavigation();

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [userNameError, setUserNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const inputOnChange = text => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    var isEmailValid = emailRegex.test(text);
    var phoneRegex = /^[6-9]\d{9}$/;
    var isValidNumber = phoneRegex.test(text);

    let validate = isEmailValid || isValidNumber;

    if (!validate) {
      setUserNameError(true);
    } else {
      setUserNameError(false);
    }

    const formattedInpt = text.replace(/\s/g, '');
    setUserName(formattedInpt);
  };

  const validationFunction = () => {
    if (userName.length > 0 && setUserNameError == true) {
      setUserNameError(true);
    }
  };

  const onPasswordChange = text => {
    const formattedInpt = text.replace(/\s/g, '');
    setPassword(formattedInpt);
    setPasswordError(false);
  };

  const signInFunction = () => {
    if (userName == '' || password == '') {
      Snackbar.show({
        text: 'Please enter all the fields',
        backgroundColor: '#D1264A',
        duration: Snackbar.LENGTH_SHORT,
      });
    } else if (userNameError) {
      Snackbar.show({
        text: 'Please enter valid Email or Phone Number',
        backgroundColor: '#D1264A',
        duration: Snackbar.LENGTH_SHORT,
      });
    } else if (password.length > 0 && password.length < 8) {
      Snackbar.show({
        text: 'Please valid enter Password',
        backgroundColor: '#D1264A',
        duration: Snackbar.LENGTH_SHORT,
      });
    } else if (!userNameError && !passwordError) {
      SignInAPI();
      setUserName('');
      setPassword('');
    }
  };

  const SignInAPI = async () => {
    const params = {
      users_email_or_mobile: userName,
      user_password: password,
    };

    await ApiManager.userLogin(params)
      .then(async res => {
        console.log('res?.data', res?.data);
        const userData = JSON.stringify(res?.data);
        await AsyncStorage.setItem('userData', userData);
        navigation.navigate('Dashboard');
      })
      .catch(error => console.log(error));
  };

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Text style={styles.signInTxt}>SignIn</Text>
        <View>
          <Image
            source={require('../../Images/randomImg/splash.png')}
            style={{height: 135, width: 100}}
          />
        </View>
      </View>

      <ScrollView style={{padding: WIDTH(4)}}>
        <View>
          <Text style={styles.subTitle}>Email / Mobile Number</Text>
          <View>
            <TextInput
              style={styles.InputField}
              placeholder="Enter email or mobile no"
              placeholderTextColor={COLOR.Gray}
              value={userName}
              onChangeText={inputOnChange}
              onBlur={validationFunction}
            />
          </View>

          <Text style={styles.subTitle}>Password</Text>
          <View>
            <TextInput
              style={styles.InputField}
              placeholder="Enter password"
              placeholderTextColor={COLOR.Gray}
              value={password}
              onChangeText={onPasswordChange}
            />
          </View>
        </View>

        <View style={{marginTop: HEIGHT(4)}}>
          <CustomBtn1 name="Signin" onPress={() => signInFunction()} />
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('forgot')}
          style={{alignItems: 'center'}}>
          <Text style={styles.forgot}>Forgot Password ?</Text>
        </TouchableOpacity>

        <View style={styles.orText}>
          <Text style={{color: COLOR.Gray, fontSize: 16}}>--- Or ---</Text>
        </View>

        <View style={styles.accountText}>
          <Text style={[styles.forgot, {color: COLOR.Black}]}>
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('signup')}>
            <Text style={styles.forgot}>Register</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.White,
  },

  signInTxt: {
    fontFamily: Poppins_Medium,
    fontSize: 25,
    color: COLOR.backgroundColor,
    textAlign: 'center',
    marginVertical: HEIGHT(3),
    marginHorizontal: WIDTH(4),
  },

  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    height: WIDTH(75),
  },

  subTitle: {
    fontFamily: Poppins_Regular,
    color: COLOR.Black,
    fontSize: 14,
  },

  InputField: {
    marginTop: HEIGHT(1),
    marginBottom: HEIGHT(2),
    paddingLeft: WIDTH(4),
    height: 48,
    borderRadius: 12,
    fontSize: 14,
    borderWidth: 1,
    color: COLOR.Black,
    borderColor: COLOR.Gray,
    backgroundColor: COLOR.White,
  },

  forgot: {
    color: '#0071C1',
    marginTop: HEIGHT(3),
    fontFamily: Poppins_Regular,
    fontSize: 14,
  },

  orText: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: HEIGHT(3),
    marginBottom: HEIGHT(1),
  },

  accountText: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
});
