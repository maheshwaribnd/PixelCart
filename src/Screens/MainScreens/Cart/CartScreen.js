import {
  FlatList,
  Image,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {styles} from './style';
import COLOR from '../../../Config/color.json';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomHeader from '../../../Components/CustomHeader/CustomHeader';
import DashedLine from 'react-native-dashed-line';
import {HEIGHT, Poppins_Regular, WIDTH} from '../../../Config/appConst';
import CustomBtn2 from '../../../Components/CustomBtn/CustomBtn2';
import {CartDetailsArray} from '../../../Arrays/CartDetailsArray/CartDetailsArray';
import {useNavigation} from '@react-navigation/native';
import {Checkbox} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {
  addToCart,
  deleteToCart,
  removeToCart,
} from '../../../Redux/Reducers/Cart';
import {addTotalAmount} from '../../../Redux/Reducers/TotalAmount';

const CartScreen = () => {
  const dispatch = useDispatch();
  const Cart = useSelector(state => state.Cart);
  const navigation = useNavigation();
  const [empty, setEmpty] = useState(true);
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  const calculateTotal = items => {
    return items.reduce((total, item) => total + item.price * item.qty, 0);
  };

  const totalAmount = calculateTotal(Cart);

  const AddToCartFunction = item => {
    dispatch(addToCart(item));
  };

  const RemovefromCartFunction = item => {
    if (item.qty > 1) {
      dispatch(removeToCart(item));
    } else {
      dispatch(deleteToCart(item.id));
      navigation.goBack();
    }
  };

  const onHandleDelete = id => {
    if (Cart?.length > 1) {
      dispatch(deleteToCart(id));
    } else {
      dispatch(deleteToCart(id));
      navigation.goBack();
    }
  };

  const PurchaseFunction = () => {
    dispatch(addTotalAmount({Amount: totalAmount}));
    navigation.navigate('address');
  };

  const AddItemsFunction = () => {
    navigation.navigate('home')
  }

  const CartDetailsFunction = ({item}) => {
    return (
      <View style={{marginBottom: 6}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('productcartdetails')}
          activeOpacity={0.7}
          style={styles.alignStyle}>
          <View style={styles.alignStyle}>
            {/* <Checkbox
              status={checked ? 'checked' : 'unchecked'}
              onPress={() => {
                setChecked(!checked);
              }}
            /> */}
            <Image
              source={{uri: item?.image_name}}
              style={{height: HEIGHT(10), width: WIDTH(18), borderRadius: 14}}
            />
          </View>
          <View>
            <Text style={styles.name}>{item?.name}</Text>
            <Text style={[styles.name, {fontSize: 12, color: COLOR.Gray}]}>
              {item?.desc}
            </Text>
            <Text style={[styles.name, {fontFamily: Poppins_Regular}]}>
              ₹ {item?.price * item?.qty}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Quantity */}
        <View style={[styles.alignStyle, {alignItems: 'center'}]}>
          <View style={styles.QuantityWrapper}>
            <TouchableOpacity
              onPress={() => RemovefromCartFunction(item)}
              style={[
                styles.qty,
                {
                  borderBottomLeftRadius: 6,
                  borderTopLeftRadius: 6,
                  marginLeft: 9,
                },
              ]}
              activeOpacity={0.4}>
              <AntDesign name="minus" color={COLOR.White} size={16} />
            </TouchableOpacity>
            <View style={styles.quantityCount}>
              <Text style={[styles.name, {fontFamily: Poppins_Regular}]}>
                {item?.qty}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => AddToCartFunction(item)}
              style={[
                styles.qty,
                {borderBottomEndRadius: 6, borderTopRightRadius: 6},
              ]}
              activeOpacity={0.4}>
              <AntDesign name="plus" color={COLOR.White} size={15} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => onHandleDelete(item?.id)}
            style={styles.removebtnContainer}>
            <Text style={styles.removeBtnTxt}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const YourOrderFunction = ({item}) => {
    return (
      <View>
        {open ? (
          <View
            style={[
              styles.alignStyle,
              {alignItems: 'center', marginVertical: HEIGHT(1)},
            ]}>
            <View
              style={[
                styles.alignStyle,
                {alignItems: 'center', gap: 6, marginVertical: HEIGHT(1)},
              ]}>
              <Image
                source={item?.image}
                style={{height: HEIGHT(11), width: WIDTH(20), borderRadius: 16}}
              />
              <View>
                <Text style={styles.name}>{item?.name}</Text>
                <Text style={[styles.name, {fontSize: 12, color: COLOR.Gray}]}>
                  {item?.desc}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.TrackBtn}
              onPress={() => navigation.navigate('trackscreen')}>
              <View
                style={[
                  styles.alignStyle,
                  {justifyContent: 'center', alignItems: 'center'},
                ]}>
                <Text style={styles.trackBtnTxt}>Track</Text>
                <AntDesign name="right" color="#008215" size={7} />
                <AntDesign name="right" color="#008215" size={7} />
              </View>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CustomHeader name="Cart" />
      <ScrollView>
        <View style={{flex: 1, justifyContent: 'center'}}>
          {Cart.length > 0 ? (
            <View style={styles.cartBox}>
              <FlatList
                data={Cart}
                renderItem={({item}) => <CartDetailsFunction item={item} />}
              />

              <DashedLine
                dashLength={7}
                dashColor="#CCCCCC"
                style={styles.dashlineStyle}
              />
              <View style={[styles.alignStyle, {paddingHorizontal: WIDTH(3)}]}>
                <Text style={styles.total}>Total: </Text>
                <Text style={styles.total}>₹ {totalAmount.toFixed(2)}</Text>
              </View>
              <View style={{justifyContent: 'center'}}>
                <CustomBtn2
                  name="Purchase"
                  onPress={() => PurchaseFunction()}
                />
              </View>
            </View>
          ) : (
            <View style={styles.cartBox}>
              <View style={[styles.alignStyle, {alignItems: 'center'}]}>
                <Text style={styles.title}>Your Cart</Text>
                <Text style={styles.cartEmptyTxt}>Cart is empty</Text>
              </View>

              <CustomBtn2
                name="Add items in cart"
                onPress={() => AddItemsFunction()}
              />
            </View>
          )}

          <View style={styles.cartBox2}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.title}>Your Orders</Text>
              <TouchableOpacity onPress={() => setOpen(!open)}>
                <AntDesign
                  name={open ? 'upcircle' : 'downcircle'}
                  size={25}
                  color={COLOR.BtnColor}
                />
              </TouchableOpacity>
            </View>

            {open ? (
              <DashedLine
                dashLength={7}
                dashColor="#CCCCCC"
                style={styles.dashlineStyle}
              />
            ) : null}

            <FlatList
              data={CartDetailsArray}
              renderItem={({item}) => <YourOrderFunction item={item} />}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default CartScreen;
