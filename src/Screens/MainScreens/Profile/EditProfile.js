import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import COLOR from '../../../Config/color.json';
import {
  HEIGHT,
  Poppins_Medium,
  Poppins_Regular,
  WIDTH,
} from '../../../Config/appConst';
import CustomBtn1 from '../../../Components/CustomBtn/CustomBtn1';
import ApiManager from '../../../API/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {updateProfile} from '../../../Redux/Reducers/UserData';
import {ActivityIndicator} from 'react-native-paper';

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [number, setNumber] = useState('');
  const [isInvalidInput, setisInvalidInput] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    // if (!name || !userEmail || !number || isInvalidInput) {
    //   setError(true);
    //   return;
    // }

    setLoading(true);

    const userDetails = await AsyncStorage.getItem('userData');
    const user = JSON.parse(userDetails);
    const userId = user?.customer_id;

    const params = {
      id: userId,
      users_name: name,
      users_email: userEmail,
      users_mob: number,
    };

    ApiManager.profileEdit(params)
      .then(res => {
        dispatch(
          updateProfile({
            id: userId,
            users_name: name,
            users_email: userEmail,
            users_mob: number,
          }),
        );
        // UserProfileAPIFunction();
        navigation.navigate('profile');
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  const inputNameChange = text => {
    const formattedInpt = text.replace(/\s/g, '');
    setName(formattedInpt);
  };

  const inputEmailChange = text => {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var isEmailValid = emailRegex.test(text);

    let validate = isEmailValid;
    if (!validate) {
      setisInvalidInput(true);
    } else {
      setisInvalidInput(false);
    }

    setError(false);
    const formattedInpt = text.replace(/\s/g, '');
    setUserEmail(formattedInpt);
  };

  const inputMobileChange = text => {
    var phoneRegex = /^\d{11}$/;
    var isValidNumber = phoneRegex.test(text);

    let validate = isValidNumber;
    if (!validate) {
      setisInvalidInput(true);
    } else {
      setisInvalidInput(false);
    }
    setNumber(number);
    setError(false);
    const formattedInpt = text.replace(/\s/g, '');
    setNumber(formattedInpt);
  };

  const validationFunction = () => {
    if (userEmail.length > 0 && isInvalidInput == true) {
      setError(true);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.subTitle}>Name</Text>
        <View>
          <TextInput
            style={styles.InputField}
            placeholder="Enter name"
            placeholderTextColor={COLOR.Gray}
            value={name}
            onChangeText={inputNameChange}
            onBlur={validationFunction}
          />
        </View>

        <Text style={styles.subTitle}>Email</Text>
        <View>
          <TextInput
            style={styles.InputField}
            placeholder="Enter email"
            placeholderTextColor={COLOR.Gray}
            value={userEmail}
            onChangeText={inputEmailChange}
          />
        </View>

        <Text style={styles.subTitle}>Mobile Number</Text>
        <View>
          <TextInput
            style={styles.InputField}
            placeholder="Enter mobile no"
            keyboardType="number-pad"
            placeholderTextColor={COLOR.Gray}
            value={number}
            onChangeText={text => inputMobileChange(text)}
          />
        </View>
      </View>

      <View style={{marginTop: HEIGHT(4)}}>
        {loading ? (
          <ActivityIndicator size="large" color={COLOR.Gray} />
        ) : (
          <CustomBtn1 name="Save Changes" onPress={handleUpdate} />
        )}
      </View>
    </View>
  );
};

export default EditProfile;

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
