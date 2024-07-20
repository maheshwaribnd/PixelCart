import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';
import {HEIGHT, Poppins_Regular, WIDTH} from '../../Config/appConst';
import COLOR from '../../Config/color.json';
import CustomBtn from '../../Components/CustomBtn/CustomButton';

const Signup = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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

  const onPasswordChange = text => {
    const formattedInpt = text.replace(/\s/g, '');
    setPassword(formattedInpt);
  };

  const onConfirmPasswordChange = text => {
    const formattedInpt = text.replace(/\s/g, '');
    setConfirmPassword(formattedInpt);
  };

  return (
    <View style={styles.container}>
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

      <View>
        <CustomBtn name="Sign up" />
      </View>

      <View style={{alignItems: 'center'}}>
        <Text style={[styles.alreadyAccount, {color: COLOR.Black}]}>
          Already have an account?{' '}
          <Text style={styles.alreadyAccount}>Sign in</Text>
        </Text>
      </View>
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

  alreadyAccount: {
    color: '#0071C1',
    marginTop: HEIGHT(5),
    fontFamily: Poppins_Regular,
    fontSize: 14,
  },
});
