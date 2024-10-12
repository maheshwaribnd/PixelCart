import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
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
import Entypo from 'react-native-vector-icons/Entypo';
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
  const [userNameError, setUserNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const inputOnChange = text => {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var isEmailValid = emailRegex.test(userName);
    var phoneRegex = /^[6-9]\d{9}$/;
    var isValidNumber = phoneRegex.test(userName);

    let validate = isEmailValid || isValidNumber;
    if (!validate) {
      setUserNameError(true);
    } else {
      setUserNameError(false);
    }

    const formattedInput = text.replace(/\s/g, '');
    setUserName(formattedInput);
  };

  const onPasswordChange = text => {
    const formattedInpt = text.replace(/\s/g, '');
    setPassword(formattedInpt);
    setPasswordError(false);
  };

  const onConfirmPasswordChange = text => {
    const formattedInpt = text.replace(/\s/g, '');
    setConfirmPassword(formattedInpt);
    setConfirmPasswordError(false);
  };

  const showPasswordFunction = () => {
    setShowPassword(!showPassword);
  };

  const showConfirmPasswordFunction = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validatePassword = () => {
    const strongPassword = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])/;
    if (strongPassword.test(password) == false) {
      setPasswordError(true);
    } else if (password.length < 8) {
      // setpasswordError2(true);
    } else {
      setPasswordError(false);
      // setpasswordError2(false);
    }
  };

  const SignUpFunction = () => {
    // if (userName == '' || password == '' || confirmPassword == '') {
    //   Snackbar.show({
    //     text: 'Please enter all the fields',
    //     backgroundColor: '#D1264A',
    //     duration: Snackbar.LENGTH_SHORT,
    //   });
    // } else if (userNameError) {
    //   Snackbar.show({
    //     text: 'Please enter valid Email or Phone Number',
    //     backgroundColor: '#D1264A',
    //     duration: Snackbar.LENGTH_SHORT,
    //   });
    // } else if (!userNameError) {
    //   if (password.length < 8) {
    //     Snackbar.show({
    //       text: 'Enter 8 digit Password',
    //       backgroundColor: '#D1264A',
    //       duration: Snackbar.LENGTH_SHORT,
    //     });
    //   } else if (confirmPassword.length == 0) {
    //     Snackbar.show({
    //       text: 'Enter confirm Password',
    //       backgroundColor: '#D1264A',
    //       duration: Snackbar.LENGTH_SHORT,
    //     });
    //   }
    // } else if (password == confirmPassword) {
    //   Snackbar.show({
    //     text: 'Password not match',
    //     backgroundColor: '#D1264A',
    //     duration: Snackbar.LENGTH_SHORT,
    //   });
    // } else if (!userNameError && !passwordError && !confirmPasswordError) {
      signUpAPI();
    // }
  };

  const signUpAPI = () => {
    const params = {
      user_email_or_mobile: userName,
      user_password: password,
      confirm_password: confirmPassword,
    };
    console.log('params', params);
    

    ApiManager.userSignUp(params)
      .then(res => {
        // if (res?.data?.status == 200) {
          const userData = JSON.stringify(res?.data);
          AsyncStorage.setItem('userData', userData);
          navigation.navigate('Dashboard');
        // } else {
        //   Snackbar.show({
        //     text: 'Please enter all the fields',
        //     backgroundColor: '#D1264A',ss
        //     duration: Snackbar.LENGTH_SHORT,
        //   });
        // }
      })
      .catch(error => console.error(error));
  };

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Text style={styles.signUpTxt}>SignUp</Text>
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
          <View style={styles.inputView}>
            <TextInput
              style={
                //   error
                //     ? [styles.InputField, { marginBottom: HEIGHT(0.2) }]
                styles.InputField
              }
              placeholder="Enter email or mobile no"
              placeholderTextColor={COLOR.Gray}
              value={userName}
              onChangeText={inputOnChange}
              // onBlur={validationFunction}
            />
            {/* {error ? (
            <Text style={styles.errorTxt}>Please enter valid email/number</Text>
          ) : null} */}
          </View>

          <Text style={styles.subTitle}>Create Password</Text>
          <View style={styles.inputView}>
            <TextInput
              style={
                //   error
                //     ? [styles.InputField, { marginBottom: HEIGHT(0.2) }]
                styles.InputField
              }
              placeholder="Enter password"
              placeholderTextColor={COLOR.Gray}
              value={password}
              onChangeText={onPasswordChange}
              // onBlur={validationFunction}
            />
            <Entypo
              name={showPassword ? 'eye' : 'eye-with-line'}
              onPress={showPasswordFunction}
              size={20}
              color={COLOR.Black}
              style={{paddingRight: WIDTH(3)}}
            />
          </View>

          <Text style={styles.subTitle}>Confirm Password</Text>
          <View style={styles.inputView}>
            <TextInput
              style={
                //   error
                //     ? [styles.InputField, { marginBottom: HEIGHT(0.2) }]
                styles.InputField
              }
              placeholder="Re-enter password"
              placeholderTextColor={COLOR.Gray}
              value={confirmPassword}
              onChangeText={onConfirmPasswordChange}
            />
            <Entypo
              name={confirmPasswordError ? 'eye' : 'eye-with-line'}
              onPress={showConfirmPasswordFunction}
              size={20}
              color={COLOR.Black}
              style={{paddingRight: WIDTH(3)}}
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
      </ScrollView>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.White,
  },

  signUpTxt: {
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
    // width: WIDTH(100),
    height: WIDTH(65),
  },

  subTitle: {
    fontFamily: Poppins_Regular,
    color: COLOR.Black,
    fontSize: 14,
  },

  errorTxt: {
    color: 'red',
    marginBottom: HEIGHT(0.7),
    marginTop: HEIGHT(0.3),
  },

  InputField: {
    paddingLeft: 12,
    color: COLOR.Black,
    width: WIDTH(80),
  },

  inputView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    marginTop: HEIGHT(1),
    marginBottom: HEIGHT(2),
  },

  alreadyAccount: {
    color: '#0071C1',
    marginTop: HEIGHT(5),
    fontFamily: Poppins_Regular,
    fontSize: 14,
  },
});
