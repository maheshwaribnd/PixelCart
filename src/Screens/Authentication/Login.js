import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
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
  const [isInvalidInput, setisInvalidInput] = useState(false);
  const [error, setError] = useState(false);

  const inputOnChange = text => {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var isEmailValid = emailRegex.test(userName);
    var phoneRegex = /^[6-9]\d{9}$/;
    var isValidNumber = phoneRegex.test(userName);

    let validate = isEmailValid || isValidNumber;
    if (!validate) {
      setisInvalidInput(true);
    } else {
      setisInvalidInput(false);
    }
    setUserName(userName);
    setError(false);
    const formattedInpt = text.replace(/\s/g, '');
    setUserName(formattedInpt);
  };

  const validationFunction = () => {
    if (userName.length > 0 && isInvalidInput == true) {
      setError(true);
    }
  };

  const onPasswordChange = text => {
    const formattedInpt = text.replace(/\s/g, '');
    setPassword(formattedInpt);
  };

  const signInFunction = () => {
    SignInAPI();
  };

  const SignInAPI = () => {
    const params = {
      users_email: userName,
      user_password: password,
    };

    ApiManager.userLogin(params)
      .then(res => {
        if (res?.data?.status == 200) {
          const userData = JSON.stringify(res?.data);
          console.log('login', userData);
          AsyncStorage.setItem('userData', userData);
          navigation.navigate('Dashboard');
        } else {
          Snackbar.show({
            text: 'Invalid Credential',
            backgroundColor: '#D1264A',
            duration: Snackbar.LENGTH_SHORT,
          });
        }
      })
      .catch(error => console.error(error));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.signInTxt}>SignIn</Text>

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
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: WIDTH(4),
    backgroundColor: COLOR.White,
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

  signInTxt: {
    fontFamily: Poppins_Medium,
    fontSize: 20,
    marginVertical: HEIGHT(3),
  },
});
