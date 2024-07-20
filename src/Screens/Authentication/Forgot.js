import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import COLOR from '../../Config/color.json';
import {HEIGHT, Poppins_Regular, WIDTH} from '../../Config/appConst';
import OTPModalComponent from '../../Components/CustomModal/Modal';
import CustomHeader from '../../Components/CustomHeader/CustomHeader';
import CustomBtn from '../../Components/CustomBtn/CustomButton';

const Forgot = () => {
  const [currentOtp, setCurrentOtp] = useState(false);
  const [userName, setUserName] = useState('');
  const [isInvalidInput, setisInvalidInput] = useState(false);
  const [error, setError] = useState(false);

  const inputOnChange = text => {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var isEmailValid = emailRegex.test(inputValue);
    var phoneRegex = /^[6-9]\d{9}$/;
    var isValidNumber = phoneRegex.test(inputValue);

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
    if (inputValue.length > 0 && isInvalidInput == true) {
      setError(true);
    }
  };

  const sendOTPFunction = () => {
    setCurrentOtp(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerStyle}>
        <CustomHeader name="Forgot Password" />
      </View>

      <View style={{padding: WIDTH(4)}}>
        <View style={{justifyContent: 'center'}}>
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
        </View>

        <View>
          <CustomBtn name="Send OTP" onPress={sendOTPFunction} />
        </View>
      </View>

      {currentOtp ? <OTPModalComponent /> : null}
    </View>
  );
};

export default Forgot;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.White,
  },

  headerStyle: {
    backgroundColor: COLOR.White,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: WIDTH(2),
    width: WIDTH(100),
    height: HEIGHT(12),
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 4},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
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
    height: HEIGHT(9),
    borderRadius: 12,
    fontSize: 14,
    borderWidth: 1,
    color: COLOR.Black,
    borderColor: COLOR.Gray,
    backgroundColor: COLOR.White,
  },
});
