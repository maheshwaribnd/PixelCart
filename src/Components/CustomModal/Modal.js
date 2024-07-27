import {StyleSheet, Text, View} from 'react-native';
import {FONTSIZE, HEIGHT, WIDTH} from '../../Config/appConst';
import React from 'react';
import COLOR from '../../Config/color.json';
import OtpInputs from 'react-native-otp-inputs';

const OTPModalComponent = ({otp, setcurrentOTP}) => {
  const onChangeOTP = otp => {
    if (/^\d+$/.test(otp) || otp === '') {
      setcurrentOTP(otp);
    }
  };
  return (
    <View style={{flex: 1}}>
      <Text style={styles.subheadline}>Enter OTP</Text>

      <View style={{marginVertical: HEIGHT(5)}}>
        <OtpInputs
          numberOfInputs={5}
          inputContainerStyles={styles.inputContainer}
          fontSize={FONTSIZE(3)}
          value={otp}
          handleChange={otp => {
            onChangeOTP(otp);
          }}
          keyboardType="numeric"
        />
      </View>
    </View>
  );
};

export default OTPModalComponent;

const styles = StyleSheet.create({
  subheadline: {
    fontSize: 14,
    paddingLeft: 2,
    marginTop: HEIGHT(2),
    color: COLOR.Gray,
  },

  inputContainer: {
    flexDirection: 'center',
    margin: 3,
    paddingLeft: 8,
    alignItems: 'center',
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 10,
    color: COLOR.Black,
    borderColor: COLOR.Gray,
    width: WIDTH(15),
    height: HEIGHT(8),
  },

  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: WIDTH(93),
    height: HEIGHT(7),
    borderRadius: 8,
    marginTop: HEIGHT(12),
  },
});
