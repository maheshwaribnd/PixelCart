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

const CartScreen = () => {
  const navigation = useNavigation();
  const [empty, setEmpty] = useState(true);
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  const CartDetailsFunction = ({item}) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate('productcartdetail')}
          activeOpacity={0.7}
          style={styles.alignStyle}>
          <View style={styles.alignStyle}>
            <Checkbox
              status={checked ? 'checked' : 'unchecked'}
              onPress={() => {
                setChecked(!checked);
              }}
            />
            <Image
              source={item?.image}
              style={{height: HEIGHT(10), width: WIDTH(18), borderRadius: 14}}
            />
          </View>
          <View>
            <Text style={styles.name}>{item?.name}</Text>
            <Text style={[styles.name, {fontSize: 12, color: COLOR.Gray}]}>
              {item?.desc}
            </Text>
            <Text style={[styles.name, {fontFamily: Poppins_Regular}]}>
              ₹ {item?.price}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Quantity */}
        <View style={[styles.alignStyle, {alignItems: 'center'}]}>
          <View style={styles.QuantityWrapper}>
            <TouchableOpacity style={styles.qty} activeOpacity={0.4}>
              <AntDesign name="minus" color={COLOR.White} size={16} />
            </TouchableOpacity>
            <View>
              <Text
                style={{
                  fontFamily: Poppins_Regular,
                  fontSize: 16,
                }}>
                1{/* {item?.qty} */}
              </Text>
            </View>
            <TouchableOpacity style={styles.qty} activeOpacity={0.4}>
              <AntDesign name="plus" color={COLOR.White} size={15} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.removebtnContainer}>
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
          {empty ? (
            <View style={styles.cartBox}>
              <View style={[styles.alignStyle, {alignItems: 'center'}]}>
                <Text style={styles.title}>Your Cart</Text>
                <Text style={styles.cartEmptyTxt}>Cart is empty</Text>
              </View>

              <CustomBtn2
                name="Add items in cart"
                onPress={() => setEmpty(false)}
              />
            </View>
          ) : (
            <View style={styles.cartBox}>
              <FlatList
                data={CartDetailsArray}
                renderItem={({item}) => <CartDetailsFunction item={item} />}
              />

              <DashedLine
                dashLength={7}
                dashColor="#CCCCCC"
                style={styles.dashlineStyle}
              />
              <View style={[styles.alignStyle, {paddingHorizontal: WIDTH(3)}]}>
                <Text style={styles.total}>Total: </Text>
                <Text style={styles.total}>₹ 38000</Text>
              </View>
              <View style={{justifyContent: 'center'}}>
                <CustomBtn2
                  name="Purchase"
                  onPress={() => navigation.navigate('address')}
                />
              </View>
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
