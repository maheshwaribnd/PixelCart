import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import COLOR from '../../../Config/color.json';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import Icon from 'react-native-vector-icons'
import CustomHeader from '../../../Components/CustomHeader/CustomHeader';
import DashedLine from 'react-native-dashed-line';
import {
  HEIGHT,
  Inter_Regular,
  Poppins_Bold,
  Poppins_Medium,
  Poppins_Regular,
  WIDTH,
} from '../../../Config/appConst';
import CustomBtn from '../../../Components/CustomBtn/CustomButton';
import {CartDetailsArray} from '../../../Arrays/CartDetailsArray/CartDetailsArray';
import {useNavigation} from '@react-navigation/native';

const CartScreen = () => {
  const navigation = useNavigation();
  const [empty, setEmpty] = useState(true);
  const [open, setOpen] = useState(false);

  const CartDetailsFunction = ({item}) => {
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            // gap: 16,
          }}>
          <Image
            source={item?.image}
            style={{height: HEIGHT(11), width: WIDTH(20), borderRadius: 16}}
          />
          <View>
            <Text style={styles.name}>{item?.name}</Text>
            <Text style={[styles.name, {fontSize: 12, color: COLOR.Gray}]}>
              {item?.desc}
            </Text>
            <Text style={[styles.name, {fontFamily: Poppins_Regular}]}>
              ₹ {item?.price}
            </Text>
          </View>
        </View>

        {/* Quantity */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={styles.QuantityWrapper}>
            <TouchableOpacity style={styles.qty} activeOpacity={0.4}>
              <AntDesign name="minus" color={COLOR.White} size={15} />
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
            <Text
              style={{
                fontFamily: Poppins_Regular,
                fontSize: 16,
                color: COLOR.BtnColor,
              }}>
              Remove
            </Text>
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
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              // gap: 16,
              marginVertical: HEIGHT(1),
            }}>
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

            <TouchableOpacity
              style={styles.TrackBtn}
              onPress={() => navigation.navigate('trackscreen')}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: Poppins_Regular,
                    fontSize: 12,
                    color: '#008215',
                  }}>
                  Track
                </Text>
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
        {empty ? (
          <View style={styles.cartBox}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.title}>Your Cart</Text>
              <Text
                style={{
                  fontFamily: Poppins_Regular,
                  fontSize: 14,
                  color: COLOR.Gray,
                }}>
                Cart is empty
              </Text>
            </View>

            <CustomBtn
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
              style={{
                marginTop: HEIGHT(1),
                marginBottom: HEIGHT(1),
                marginVertical: WIDTH(3),
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: WIDTH(3),
              }}>
              <Text style={styles.total}>Total: </Text>
              <Text style={styles.total}>₹ 38000</Text>
            </View>
            <View style={{justifyContent: 'center'}}>
              <CustomBtn
                name="Purchase"
                onPress={() => navigation.navigate('productcartdetail')}
              />
            </View>
          </View>
        )}

        <View style={styles.cartBox2}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.title}>Your Orders</Text>
            <TouchableOpacity onPress={() => setOpen(!open)}>
              <AntDesign
                name={open ? 'upcircle' : 'downcircle'}
                size={25}
                color="#503192"
              />
            </TouchableOpacity>
          </View>

          <DashedLine
            dashLength={7}
            dashColor="#CCCCCC"
            style={{
              marginTop: HEIGHT(1),
              marginBottom: HEIGHT(1),
              marginVertical: WIDTH(3),
            }}
          />

          <FlatList
            data={CartDetailsArray}
            renderItem={({item}) => <YourOrderFunction item={item} />}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F0FF',
  },

  cartBox: {
    justifyContent: 'center',
    // alignItems: 'center',
    padding: HEIGHT(2),
    marginVertical: HEIGHT(3),
    marginHorizontal: WIDTH(3),
    borderRadius: 16,
    backgroundColor: COLOR.White,
  },

  title: {
    fontFamily: Poppins_Bold,
    fontSize: 16,
  },

  total: {
    fontFamily: Poppins_Medium,
    fontSize: 16,
  },

  name: {
    fontFamily: Inter_Regular,
    fontSize: 16,
    color: COLOR.Black,
  },

  cartBox2: {
    padding: HEIGHT(3),
    marginBottom: HEIGHT(3),
    marginHorizontal: WIDTH(3),
    borderRadius: 16,
    backgroundColor: COLOR.White,
  },

  itemcartBox: {
    // justifyContent: 'center',
    alignItems: 'center',
    padding: HEIGHT(3),
    marginVertical: HEIGHT(3),
    marginHorizontal: WIDTH(3),
    borderRadius: 16,
    backgroundColor: COLOR.White,
  },

  QuantityWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: HEIGHT(1.2),
  },

  qty: {
    backgroundColor: COLOR.BtnColor,
    borderRadius: 6,
    height: 35,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginHorizontal: 12,
    borderColor: COLOR.LightGrey,
    // borderWidth:1,
    elevation: 5,
  },

  removebtnContainer: {
    backgroundColor: COLOR.White,
    // flexDirection: 'row',
    borderColor: COLOR.LightGrey,
    elevation: 5,
    height: HEIGHT(5),
    width: WIDTH(20),
    marginRight: WIDTH(1),
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  TrackBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#008215',
    borderRadius: 10,
    height: 32,
    width: 61,
  },
});
