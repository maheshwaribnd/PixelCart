import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {HEIGHT, Poppins_Regular, WIDTH} from '../../Config/appConst';
import COLOR from '../../Config/color.json';
import {useNavigation} from '@react-navigation/native';
import CustomBtn from '../../Components/CustomBtn/CustomButton';

const Login = () => {
  const navigation = useNavigation();

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
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

      <View>
        <CustomBtn name="Signin" />
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('forgot')}
        style={{alignItems: 'center'}}>
        <Text style={styles.forgot}>Forgot Password ?</Text>
      </TouchableOpacity>

      <View style={styles.orText}>
        <Text style={{color: COLOR.Gray, fontSize: 16}}>--- Or ---</Text>
      </View>

      <View style={{alignItems: 'center'}}>
        <Text style={[styles.forgot, {color: COLOR.Black}]}>
          Don't have an account?
          <TouchableOpacity onPress={() => navigation.navigate('signup')}>
            <Text style={styles.forgot}>Register</Text>
          </TouchableOpacity>
        </Text>
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
    height: HEIGHT(9),
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
    marginTop: HEIGHT(5),
    marginBottom: HEIGHT(3),
  },
});
