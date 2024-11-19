import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import COLOR from '../../Config/color.json';
import CustomHeader from '../../Components/CustomHeader/CustomHeader';
import {HEIGHT, Poppins_Regular, WIDTH} from '../../Config/appConst';
import Entypo from 'react-native-vector-icons/Entypo';
import CustomBtn1 from '../../Components/CustomBtn/CustomBtn1';
import {useNavigation} from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';

const NewPassword = () => {
  const navigation = useNavigation();

  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [passwordError, setpasswordError] = useState(false);
  const [confirmpasswordError, setconfirmpasswordError] = useState(false);

  const onPasswordChange = text => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    const validPassword = passwordRegex.test(text);
    if (!validPassword) {
      setpasswordError(true);
    } else {
      setpasswordError(false);
    }

    const formattedInpt = text.replace(/\s/g, '');
    setPassword(formattedInpt);
  };

  const onConfirmPasswordChange = text => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    const validConfirmPassword = passwordRegex.test(text);
    if (!validConfirmPassword) {
      setconfirmpasswordError(true);
    } else {
      setconfirmpasswordError(false);
    }
    const formattedInpt = text.replace(/\s/g, '');
    setConfirmPassword(formattedInpt);
  };

  var minLength = 8;

  const showPasswordFunction = () => {
    setShowPassword(!showPassword);
  };

  const showConfirmPasswordFunction = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const ForgotPasswordFunction = () => {
    if (password.length == '' && confirmpassword.length == '') {
      Snackbar.show({
        text: 'Enter Password',
        backgroundColor: '#D1264A',
        duration: Snackbar.LENGTH_SHORT,
      });
    } else if (password !== confirmpassword) {
      Snackbar.show({
        text: 'Password does not match',
        backgroundColor: '#D1264A',
        duration: Snackbar.LENGTH_SHORT,
      });
    } else {
      if (passwordError && confirmpasswordError) {
        Snackbar.show({
          text: 'Password must contain character, digit and special character',
          backgroundColor: '#D1264A',
          duration: Snackbar.LENGTH_SHORT,
        });
      } else {
        navigation.navigate('login');
      }
    }
  };

  return (
    <View style={styles.container}>
      <CustomHeader name="Reset Password" />
      <View style={{padding: WIDTH(4)}}>
        <View style={{justifyContent: 'center'}}>
          <Text style={styles.subTitle}>New Password</Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.InputField}
              placeholder="Enter new password"
              placeholderTextColor={COLOR.Gray}
              value={password}
              onChangeText={onPasswordChange}
              secureTextEntry={!showPassword}
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
              style={styles.InputField}
              placeholder="Re-enter password"
              placeholderTextColor={COLOR.Gray}
              value={confirmpassword}
              onChangeText={onConfirmPasswordChange}
              secureTextEntry={!showConfirmPassword}
            />
            <Entypo
              name={showConfirmPassword ? 'eye' : 'eye-with-line'}
              onPress={showConfirmPasswordFunction}
              size={20}
              color={COLOR.Black}
              style={{paddingRight: WIDTH(3)}}
            />
          </View>
        </View>

        <View style={{marginTop: HEIGHT(3)}}>
          <CustomBtn1
            name="Reset Password"
            onPress={() => ForgotPasswordFunction()}
          />
        </View>
      </View>
    </View>
  );
};

export default NewPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.White,
  },

  subTitle: {
    fontFamily: Poppins_Regular,
    color: COLOR.Black,
    fontSize: 14,
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
});
