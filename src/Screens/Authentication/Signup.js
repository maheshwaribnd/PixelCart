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
import CustomBtn1 from '../../Components/CustomBtn/CustomBtn1';
import {useNavigation} from '@react-navigation/native';
import ApiManager from '../../API/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Snackbar from 'react-native-snackbar';

const Signup = () => {
  const navigation = useNavigation();

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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

  const onConfirmPasswordChange = text => {
    const formattedInpt = text.replace(/\s/g, '');
    setConfirmPassword(formattedInpt);
  };

  const SignUpFunction = () => {
    signUpAPI();
  };

  const signUpAPI = () => {
    const params = {
      users_email_or_mob: userName,
      user_password: password,
      confirm_password: confirmPassword,
    };

    ApiManager.userSignUp(params)
      .then(res => {
        if (res?.data?.status == 200) {
          const userData = JSON.stringify(res?.data);
          console.log('signup', userData);
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
      <Text style={styles.signUpTxt}>SignUp</Text>

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

        <Text style={styles.subTitle}>Create Password</Text>
        <View>
          <TextInput
            style={styles.InputField}
            placeholder="Enter password"
            placeholderTextColor={COLOR.Gray}
            value={password}
            onChangeText={onPasswordChange}
          />
        </View>

        <Text style={styles.subTitle}>Confirm Password</Text>
        <View>
          <TextInput
            style={styles.InputField}
            placeholder="Re-enter password"
            placeholderTextColor={COLOR.Gray}
            value={confirmPassword}
            onChangeText={onConfirmPasswordChange}
          />
        </View>
      </View>

      <View style={{marginTop: HEIGHT(4)}}>
        <CustomBtn1 name="Sign up" onPress={() => SignUpFunction()} />
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('login')}
        style={{alignItems: 'center'}}>
        <Text style={[styles.alreadyAccount, {color: COLOR.Black}]}>
          Already have an account?{' '}
          <Text style={styles.alreadyAccount}>Sign in</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: WIDTH(4),
    backgroundColor: COLOR.White,
  },

  signUpTxt: {
    fontFamily: Poppins_Medium,
    fontSize: 20,
    marginVertical: HEIGHT(3),
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

  alreadyAccount: {
    color: '#0071C1',
    marginTop: HEIGHT(5),
    fontFamily: Poppins_Regular,
    fontSize: 14,
  },
});
