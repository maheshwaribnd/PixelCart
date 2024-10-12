import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  FONTSIZE,
  HEIGHT,
  NotoSans_Bold,
  NotoSans_Medium,
  WIDTH,
} from '../../Config/appConst';
import COLOR from '../../Config/color.json';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {RadioButton} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import Modal from 'react-native-modal';
import {useNavigation} from '@react-navigation/native';
import ApiManager from '../../API/Api';
import {clearCart} from '../../Redux/Reducers/Cart';

const CheckoutScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const selectorforAmount = useSelector(state => state.addTotalAmount?.Amount);
  const addressSelector = useSelector(state => state.addAddress);
  const Cart = useSelector(state => state.Cart);

  const [checked, setChecked] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to go back?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()}, // You can customize this to navigate back instead
      ]);
      return true; // Prevent default back action
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove(); // Clean up the listener on unmount
  }, []);

  const checkoutAPI = async () => {
    const userDetails = await AsyncStorage.getItem('userData');
    const user = JSON.parse(userDetails);
    const userId = user?.customer_id;

    const params = {
      user_id: userId,
      name: addressSelector?.name,
      address: addressSelector?.address,
      addressType: addressSelector?.type,
      pincode: addressSelector?.name,
      payment: paymentMethod,
      mobile: addressSelector?.phone,
      products: Cart,
      totalAmount: selectorforAmount,
    };

    console.log('params', params);

    ApiManager.checkout(params)
      .then(res => {
        console.log('Payment Successful', res?.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const PaymentCheckout = () => {
    checkoutAPI();
    setShowModal(true);
  };

  const Done = () => {
    setShowModal(false);
    navigation.navigate('home');
    dispatch(clearCart());
  };

  const CODPayment = () => {
    setChecked('COD');
    setPaymentMethod('COD');
  };

  const OnlinePayment = () => {
    setChecked('UPI');
    setPaymentMethod('UPI');
  };

  return (
    <View style={styles.container}>
      <View style={styles.forgotHeadline}>
        <FontAwesome6
          name="arrow-left-long"
          color="black"
          onPress={() => navigation.goBack()}
          size={20}
        />
        <Text style={styles.paymentMethodText}>Choose Payment Method</Text>
      </View>

      <View style={{padding: HEIGHT(2)}}>
        {/* COD  */}
        <View style={styles.box}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <RadioButton
              value="COD"
              status={checked === 'COD' ? 'checked' : 'unchecked'}
              onPress={() => CODPayment()}
              color="#D6D6D6"
            />

            <View>
              <Text style={styles.forCODText}>Cash on delivery</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={{padding: HEIGHT(2)}}>
        {/* UPI  */}
        <View style={styles.box2}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <RadioButton
              value="UPI"
              status={checked === 'UPI' ? 'checked' : 'unchecked'}
              onPress={() => OnlinePayment()}
              color="#D6D6D6"
            />

            <View>
              <Text style={styles.forCODText}>Online Payment</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.bottom}>
        <Text style={styles.checkoutPrice}>Price: {selectorforAmount} ₹</Text>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity
            style={paymentMethod ? styles.button : styles.btnDisable}
            disabled={paymentMethod ? false : true}
            onPress={() => PaymentCheckout()}>
            <Text style={styles.checkoutTextBtn}>Checkout</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        isVisible={showModal}
        // onBackdropPress={() => setShowModal(false)}
        style={{justifyContent: 'center', alignItems: 'center'}}>
        <View style={styles.modalWrap}>
          <Image
            source={require('../../Images/Gif/ordersucess.gif')}
            style={styles.gifImage}
          />
          <Text style={styles.modalHeading}>Order Successfully Done</Text>
          <TouchableOpacity style={styles.Donebutton} onPress={() => Done()}>
            <Text style={styles.donebtnText}>Done</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  forgotHeadline: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: WIDTH(4),
    borderColor: COLOR.Gray,
    borderWidth: 0.2,
    shadowOffset: {width: 1, height: 1.5},
    shadowOpacity: 0.4,
    shadowRadius: 2,
    backgroundColor: COLOR.White,
    elevation: 10,
  },

  insideBox: {
    marginTop: HEIGHT(1),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  radioView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  paymentMethodText: {
    marginTop: -2,
    marginLeft: 14,
    fontSize: FONTSIZE(2.4),
    fontFamily: NotoSans_Medium,
    color: COLOR.Black,
  },

  box: {
    height: HEIGHT(12),
    padding: WIDTH(2),
    marginTop: HEIGHT(2),
    justifyContent: 'center',
    backgroundColor: COLOR.White,
    borderRadius: 9,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  boxForHeight: {
    height: HEIGHT(39),
    padding: WIDTH(2),
    marginBottom: HEIGHT(2),
    backgroundColor: COLOR.White,
    borderRadius: 9,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  box2: {
    height: HEIGHT(12),
    padding: WIDTH(2),
    // marginBottom: HEIGHT(2),
    justifyContent: 'center',
    backgroundColor: COLOR.White,
    borderRadius: 9,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  dropdown: {
    height: HEIGHT(3.5),
    width: WIDTH(6),
  },

  InputField: {
    justifyContent: 'center',
    height: HEIGHT(7.5),
    width: WIDTH(85),
    marginTop: HEIGHT(2),
    borderRadius: 7,
    borderWidth: 1,
    paddingLeft: 12,
    borderColor: COLOR.Gray,
    color: COLOR.Gray,
    fontSize: FONTSIZE(2.2),
  },

  smallInputField: {
    height: HEIGHT(7.5),
    width: WIDTH(41),
    marginTop: HEIGHT(2),
    borderRadius: 7,
    borderWidth: 1,
    paddingLeft: 12,
    borderColor: COLOR.Gray,
    fontSize: FONTSIZE(2.2),
  },

  debitCardText: {
    color: COLOR.Black,
    fontFamily: NotoSans_Medium,
    fontSize: FONTSIZE(2),
    marginLeft: WIDTH(3),
  },

  bankNameText: {
    color: COLOR.Gray,
    marginLeft: WIDTH(3),
  },

  forCardText: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },

  forCODText: {
    color: COLOR.Black,
    fontFamily: NotoSans_Medium,
    fontSize: FONTSIZE(2),
    marginLeft: WIDTH(3),
  },

  checkoutPrice: {
    fontFamily: NotoSans_Bold,
    color: COLOR.Black,
    fontSize: FONTSIZE(2.1),
  },

  checkoutTextBtn: {
    fontFamily: NotoSans_Bold,
    fontSize: FONTSIZE(2),
    color: COLOR.Black,
    textAlign: 'center',
  },

  walletText: {
    color: COLOR.Black,
    fontFamily: NotoSans_Medium,
    fontSize: FONTSIZE(2),
    marginLeft: WIDTH(3),
  },

  insufficientText: {
    color: COLOR.Gray,
    marginLeft: WIDTH(3),
  },

  bottom: {
    position: 'absolute',
    bottom: 0,
    width: WIDTH(100),
    height: HEIGHT(10),
    paddingTop: HEIGHT(1),
    paddingRight: WIDTH(4),
    paddingLeft: WIDTH(4),
    paddingBottom: HEIGHT(1),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLOR.White,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  button: {
    width: WIDTH(45),
    height: HEIGHT(6),
    paddingBottom: HEIGHT(0.8),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#FFD43D',
  },

  btnDisable: {
    width: WIDTH(45),
    height: HEIGHT(6),
    paddingBottom: HEIGHT(0.8),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: COLOR.Gray,
  },

  modalWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    // paddingHorizontal: WIDTH(5),
    // paddingVertical: HEIGHT(3),
    alignItems: 'center',
    backgroundColor: 'white',
    width: WIDTH(80),
    height: HEIGHT(32),
    gap: WIDTH(2),
    borderWidth: 1,
    borderColor: COLOR.Gray,
    borderRadius: 20,
  },

  modalWrapClrChng: {
    justifyContent: 'center',
    alignItems: 'center',
    // paddingHorizontal: WIDTH(5),
    // paddingVertical: HEIGHT(3),
    alignItems: 'center',
    backgroundColor: '#4c4c4c',
    width: WIDTH(80),
    height: HEIGHT(32),
    gap: WIDTH(2),
    borderWidth: 1,
    borderColor: COLOR.Gray,
    borderRadius: 20,
  },

  gifImage: {
    height: HEIGHT(14),
    width: WIDTH(25),
    // marginBottom: HEIGHT(1),
    resizeMode: 'cover', // Adjust the image size to the container
  },

  modalHeading: {
    width: WIDTH(80),
    textAlign: 'center',
    fontFamily: NotoSans_Medium,
    fontSize: FONTSIZE(2),
    color: COLOR.Black,
  },

  Donebutton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFD43D',
    color: COLOR.Black,
    borderRadius: 9,
    width: WIDTH(40),
    height: HEIGHT(6),
    marginTop: HEIGHT(0.5),
  },

  donebtnText: {
    fontFamily: NotoSans_Bold,
    fontSize: FONTSIZE(2),
    color: COLOR.ButtonNameColor,
  },
});
