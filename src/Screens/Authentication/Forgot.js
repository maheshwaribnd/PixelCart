import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import COLOR from '../../Config/color.json';
import {
  HEIGHT,
  Poppins_Medium,
  Poppins_Regular,
  WIDTH,
} from '../../Config/appConst';
import CustomHeader from '../../Components/CustomHeader/CustomHeader';
import CustomBtn1 from '../../Components/CustomBtn/CustomBtn1';
import {useNavigation} from '@react-navigation/native';
import ApiManager from '../../API/Api';
import Snackbar from 'react-native-snackbar';

const Forgot = () => {
  const navigation = useNavigation();

  const [sendOTP, setSendOTP] = useState(false);
  const [userName, setUserName] = useState('');
  const [isInvalidInput, setisInvalidInput] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentOTP, setCurrentOTP] = useState('');
  const [storedOTP, setStoredOTP] = useState([]);
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

  const VerifyFunction = () => {
    const params = {
      users_email: userName,
    };

    ApiManager.forgotPassword(params)
      .then(res => {
        if (res?.data?.status == 200) {
          navigation.navigate('newpassword');
        } else {
          Snackbar.show({
            text: 'Please enter email',
            backgroundColor: '#D1264A',
            duration: Snackbar.LENGTH_SHORT,
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <CustomHeader name="Forgot Password" />
      <View style={{padding: WIDTH(4)}}>
        <View style={{justifyContent: 'center'}}>
          <Text style={styles.subTitle}>Enter Email</Text>
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

        <View style={{marginTop: HEIGHT(4)}}>
          <CustomBtn1 name="Verify" onPress={() => VerifyFunction()} />
        </View>
      </View>
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

  forgotTxt: {
    fontFamily: Poppins_Medium,
    fontSize: 20,
    marginTop: HEIGHT(1),
    marginBottom: HEIGHT(3),
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

  subheadline: {
    fontSize: 16,
    color: COLOR.Gray,
    fontFamily: Poppins_Medium,
  },

  verifyButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: WIDTH(85),
    height: HEIGHT(7),
    borderRadius: 8,
    backgroundColor: COLOR.BtnColor,
    color: COLOR.White,
  },

  modalWrap: {
    padding: WIDTH(2),
    alignItems: 'center',
    backgroundColor: 'white',
    width: WIDTH(92),
    height: HEIGHT(32),
    borderWidth: 1,
    borderColor: COLOR.Gray,
    borderRadius: 20,
  },
});
