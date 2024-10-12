import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Poppins_Medium, WIDTH} from '../../Config/appConst';
import {styles} from './style';
import CustomHeader from '../../Components/CustomHeader/CustomHeader';
import CustomBtn1 from '../../Components/CustomBtn/CustomBtn1';
import {Checkbox} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {addAddress} from '../../Redux/Reducers/Address';

const AddressScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const selectorforAmount = useSelector(state => state.addTotalAmount?.Amount)

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [pincode, setPincode] = useState('');
  const [addNew, setAddNew] = useState(false);
  const [addressEmpty, setaddressEmpty] = useState(true);
  const [checked, setChecked] = useState(false);
  const [homeChecked, sethomeChecked] = useState(false);
  const [officechecked, setofficeChecked] = useState(false);

  const SaveAddressFunction = () => {
    setAddNew(addNew);
    setaddressEmpty(false);
  };

  const PurchasedFunction = () => {
    dispatch(
      addAddress({
        name: name,
        address: address,
        phone: mobileNo,
        pincode: pincode,
        type: homeChecked ? homeChecked : officechecked,
      }),
    );
    navigation.navigate('checkout');
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
                onChangeText={text => setMobileNo(text)}
                keyboardType="number-pad"
                multiline
                placeholder="Enter phone number"
                style={styles.input}
              />

              <Text style={styles.subtitle}>Pin code</Text>
              <TextInput
                value={pincode}
                onChangeText={text => setPincode(text)}
                keyboardType="number-pad"
                multiline
                placeholder="Enter postal code"
                style={styles.input}
              />

              <View style={{flexDirection: 'row'}}>
                <View style={styles.alignStyle}>
                  <Checkbox
                    status={homeChecked ? 'checked' : 'unchecked'}
                    onPress={() => {
                      sethomeChecked(!homeChecked);
                    }}
                  />
                  <Text>Home address</Text>
                </View>

                <View style={styles.alignStyle}>
                  <Checkbox
                    status={officechecked ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setofficeChecked(!officechecked);
                    }}
                  />
                  <Text>Office address</Text>
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
                multiline
                placeholder="Enter name"
                style={styles.input}
              />

              <Text style={styles.subtitle}>Address</Text>
              <TextInput
                multiline
                placeholder="Enter address"
                style={styles.input}
              />

              <Text style={styles.subtitle}>Mobile number</Text>
              <TextInput
                multiline
                placeholder="Enter phone number"
                style={styles.input}
              />

              <Text style={styles.subtitle}>Pin code</Text>
              <TextInput
                multiline
                placeholder="Enter postal code"
                style={styles.input}
              />

              <View style={{flexDirection: 'row'}}>
                <View style={styles.alignStyle}>
                  <Checkbox
                    status={homeChecked ? 'checked' : 'unchecked'}
                    onPress={() => {
                      sethomeChecked(!homeChecked);
                    }}
                  />
                  <Text>Home address</Text>
                </View>

                <View style={styles.alignStyle}>
                  <Checkbox
                    status={officechecked ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setofficeChecked(!officechecked);
                    }}
                  />
                  <Text>Office address</Text>
                </View>
              </View>
            </View>
            <CustomBtn1 name="Save address" onPress={() => setAddNew(addNew)} />
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
                <Text style={{fontFamily: Poppins_Medium, fontSize: 16}}>
                  Address 1
                </Text>
              </View>

              <View style={{flexDirection: 'row'}}>
                <Text style={styles.textStyle}>Name: </Text>
                <Text style={styles.textStyle}>Name: Nitin Waghmare</Text>
              </View>

              <View style={{flexDirection: 'row'}}>
                <Text style={styles.textStyle}>Address: </Text>
                <Text style={[styles.textStyle, {width: WIDTH(67)}]}>
                  C/O Ramchandra Waghmare Plot no. 14, Manish nagar, Nagpur,
                  442204
                </Text>
              </View>

              <View style={{flexDirection: 'row'}}>
                <Text style={styles.textStyle}>Mobile: </Text>
                <Text style={styles.textStyle}>+91 4856971254</Text>
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
