import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Poppins_Medium, WIDTH} from '../../Config/appConst';
import {styles} from './style';
import COLOR from '../../Config/color.json';
import CustomHeader from '../../Components/CustomHeader/CustomHeader';
import CustomBtn1 from '../../Components/CustomBtn/CustomBtn1';
import {Checkbox} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {addAddress} from '../../Redux/Reducers/Address';
import Snackbar from 'react-native-snackbar';

const AddressScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const selectorforAmount = useSelector(state => state.addTotalAmount?.Amount);

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [pincode, setPincode] = useState('');
  const [addNew, setAddNew] = useState(false);
  const [addressEmpty, setaddressEmpty] = useState(true);
  const [checkAddressType, setcheckAddressType] = useState('');
  const [checked, setChecked] = useState(false);
  // const [officechecked, setofficeChecked] = useState('');

  const [mobileError, setMobileError] = useState(false);
  const [pincodeError, setPincodeError] = useState(false);

  const changeMobileFunction = text => {
    var phoneRegex = /^\d{11}$/;

    var isValidNumber = phoneRegex.test(text);
    if (!isValidNumber) {
      setMobileNo(text);
      setMobileError(true);
    } else {
      setMobileError(false);
    }
  };

  const changePincodeFunction = text => {
    var pinCodeRegex = /^\d{7}$/;
    var isValidPin = pinCodeRegex.test(text);
    if (!isValidPin) {
      setPincode(text);
      setPincodeError(true);
    } else {
      setPincodeError(false);
    }
  };

  const AddressType = type => {
    if (type === 'Home') {
      setcheckAddressType('Home');
    } else if (type === 'Office') {
      setcheckAddressType('Office');
    }
  };

  const SaveAddressFunction = () => {
    if (name == '' || mobileNo == '' || addAddress == '' || pincode == '') {
      Snackbar.show({
        text: 'Please Enter All Details',
        textColor: 'white',
        backgroundColor: 'red',
      });
      // setaddressEmpty(false);
    } else if (mobileError) {
      Snackbar.show({
        text: 'Please Enter Valid Mobile Number',
        textColor: 'white',
        backgroundColor: 'red',
        duration: Snackbar.LENGTH_SHORT,
      });
    } else if (pincodeError) {
      Snackbar.show({
        text: 'Please Enter Valid Pincode',
        textColor: 'white',
        backgroundColor: 'red',
        duration: Snackbar.LENGTH_SHORT,
      });
    } else {
      // setName('');
      // setAddress('');
      // setMobileNo('');
      // setPincode('');
      // setcheckAddressType('');
      setAddNew(addNew);
      setaddressEmpty(false);
    }
  };

  const PurchasedFunction = () => {
    if (name == '' || mobileNo == '' || addAddress == '' || pincode == '') {
      Snackbar.show({
        text: 'Please Enter All Details',
        textColor: 'white',
        backgroundColor: 'red',
      });
      // setaddressEmpty(false);
    } else if (mobileError) {
      Snackbar.show({
        text: 'Please Enter Valid Mobile Number',
        textColor: 'white',
        backgroundColor: 'red',
        duration: Snackbar.LENGTH_SHORT,
      });
    } else if (pincodeError) {
      Snackbar.show({
        text: 'Please Enter Valid Pincode',
        textColor: 'white',
        backgroundColor: 'red',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
    // else if (!check) {
    //   Snackbar.show({
    //     text: 'Please Select Address Type',
    //     textColor: 'white',
    //     backgroundColor: 'red',
    //   });
    // }
    else {
      dispatch(
        addAddress({
          name: name,
          address: address,
          phone: mobileNo,
          pincode: pincode,
          type: checkAddressType,
        }),
      );
      navigation.navigate('checkout');
    }
  };

  return (
    <View style={{flex: 1}}>
      <CustomHeader />
      <View style={{alignItems: 'center', flex: 1}}>
        {addressEmpty ? (
          <View>
            <View style={styles.cartBox}>
              <Text style={styles.subtitle}>Name</Text>
              <TextInput
                value={name}
                onChangeText={text => setName(text)}
                multiline
                placeholder="Enter name"
                style={styles.input}
              />

              <Text style={styles.subtitle}>Address</Text>
              <TextInput
                value={address}
                onChangeText={text => setAddress(text)}
                multiline
                placeholder="Enter address"
                style={styles.input}
              />

              <Text style={styles.subtitle}>Mobile number</Text>
              <TextInput
                value={mobileNo}
                onChangeText={text => changeMobileFunction(text)}
                keyboardType="number-pad"
                placeholder="Enter phone number"
                style={styles.input}
              />

              <Text style={styles.subtitle}>Pin code</Text>
              <TextInput
                value={pincode}
                onChangeText={text => changePincodeFunction(text)}
                keyboardType="number-pad"
                placeholder="Enter postal code"
                style={styles.input}
              />

              <View style={{flexDirection: 'row'}}>
                <View style={styles.alignStyle}>
                  <Checkbox
                    value="Home"
                    status={
                      checkAddressType == 'Home' ? 'checked' : 'unchecked'
                    }
                    onPress={() => {
                      AddressType('Home');
                    }}
                  />
                  <Text style={{color: COLOR.Black}}>Home address</Text>
                </View>

                <View style={styles.alignStyle}>
                  <Checkbox
                    status={
                      checkAddressType == 'Office' ? 'checked' : 'unchecked'
                    }
                    onPress={() => {
                      AddressType('Office');
                    }}
                  />
                  <Text style={{color: COLOR.Black}}>Office address</Text>
                </View>
              </View>
            </View>
            <CustomBtn1
              name="Save address"
              onPress={() => SaveAddressFunction()}
            />
          </View>
        ) : addNew ? (
          <View>
            <View style={styles.cartBox}>
              <Text style={styles.subtitle}>Name</Text>
              <TextInput
                value={name}
                onChangeText={text => setName(text)}
                multiline
                placeholder="Enter name"
                style={styles.input}
              />

              <Text style={styles.subtitle}>Address</Text>
              <TextInput
                value={address}
                onChangeText={text => setAddress(text)}
                multiline
                placeholder="Enter address"
                style={styles.input}
              />

              <Text style={styles.subtitle}>Mobile number</Text>
              <TextInput
                value={mobileNo}
                onChangeText={text => changeMobileFunction(text)}
                multiline
                placeholder="Enter phone number"
                style={styles.input}
              />

              <Text style={styles.subtitle}>Pin code</Text>
              <TextInput
                value={pincode}
                onChangeText={text => changePincodeFunction(text)}
                multiline
                placeholder="Enter postal code"
                style={styles.input}
              />

              <View style={{flexDirection: 'row'}}>
                <View style={styles.alignStyle}>
                  <Checkbox
                    status={
                      checkAddressType == 'Home' ? 'checked' : 'unchecked'
                    }
                    onPress={() => {
                      AddressType('Home');
                    }}
                  />
                  <Text style={{color: COLOR.Black}}>Home address</Text>
                </View>

                <View style={styles.alignStyle}>
                  <Checkbox
                    status={
                      checkAddressType == 'Office' ? 'checked' : 'unchecked'
                    }
                    onPress={() => {
                      AddressType('Office');
                    }}
                  />
                  <Text style={{color: COLOR.Black}}>Office address</Text>
                </View>
              </View>
            </View>
            <CustomBtn1
              name="Save address"
              onPress={() => SaveAddressFunction()}
            />
          </View>
        ) : (
          <View style={{alignItems: 'center'}}>
            <View style={styles.cartBox}>
              <View style={styles.alignStyle}>
                <Checkbox
                  status={checked ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setChecked(!checked);
                  }}
                />
                <Text
                  style={{
                    fontFamily: Poppins_Medium,
                    fontSize: 16,
                    color: COLOR.Black,
                  }}>
                  Address 1
                </Text>
              </View>

              <View style={{flexDirection: 'row'}}>
                <Text style={styles.textStyle}>Name: {name}</Text>
              </View>

              <View style={{flexDirection: 'row'}}>
                <Text style={styles.textStyle}>Address: </Text>
                <Text style={[styles.textStyle, {width: WIDTH(67)}]}>
                  {address},{pincode}
                </Text>
              </View>

              <View style={{flexDirection: 'row'}}>
                <Text style={styles.textStyle}>Mobile: </Text>
                <Text style={styles.textStyle}>{mobileNo}</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => setAddNew(!addNew)}
              style={styles.button}>
              <Text style={styles.txtBtn}>Add new address</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.priceBox}>
          <View style={styles.innerpriceBox}>
            <Text style={styles.priceTxt}>Price : ₹ {selectorforAmount}</Text>
            <TouchableOpacity
              onPress={() => PurchasedFunction()}
              style={styles.purchasebtn}>
              <Text style={styles.purchaseBtnTxt}>Purchase</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AddressScreen;
