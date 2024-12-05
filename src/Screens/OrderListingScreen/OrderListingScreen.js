import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import COLOR from '../../Config/color.json';
import {
  HEIGHT,
  Inter_Regular,
  Poppins_Bold,
  Poppins_Medium,
  Poppins_Regular,
  WIDTH,
} from '../../Config/appConst';
import ApiManager from '../../API/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DashedLine from 'react-native-dashed-line';

const OrderListingScreen = () => {
  const [listResponse, setListResponse] = useState([]);

  useEffect(() => {
    ListMyOrderAPI();
  }, []);

  const ListMyOrderAPI = async () => {
    const userDetails = await AsyncStorage.getItem('userData');
    const user = JSON.parse(userDetails);
    const userId = user?.customer_id;

    const params = {
      user_id: userId,
    };

    ApiManager.orderListing(params)
      .then(res => {
        const response = res?.data?.data?.orders;
        setListResponse(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const YourOrderFunction = ({item}) => {
    return (
      <View style={styles.box}>
        <Image
          source={require('../../Images/CategoryImages/CategoryImg1.png')}
          style={{height: HEIGHT(11), width: WIDTH(20), borderRadius: 16}}
        />
        <View>
          <Text style={styles.name}>{item?.name}</Text>
          <Text style={[styles.name, {fontSize: 12, color: COLOR.Gray}]}>
            {item?.order_placed_at}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.cartBox2}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.title}>Your Orders</Text>
      </View>

      <DashedLine
        dashLength={7}
        dashColor="#CCCCCC"
        style={styles.dashlineStyle}
      />

      {listResponse != [] ? (
        <View style={{paddingTop: HEIGHT(1), paddingBottom: HEIGHT(4)}}>
          <FlatList
            data={listResponse}
            // key={item => item?.id}
            renderItem={({item}) => <YourOrderFunction item={item} />}
          />
        </View>
      ) : (
        <Text style={styles.name}>No Orders Placed</Text>
      )}
    </ScrollView>
  );
};

export default OrderListingScreen;

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16,
    marginVertical: HEIGHT(1),
    // paddingVertical: WIDTH(2),
  },

  title: {
    fontFamily: Poppins_Bold,
    fontSize: 16,
  },

  total: {
    fontFamily: Poppins_Medium,
    fontSize: 16,
    color: COLOR.Gray,
  },

  name: {
    fontFamily: Inter_Regular,
    fontSize: 16,
    color: COLOR.Black,
  },

  cartBox2: {
    flex: 1,
    marginTop: HEIGHT(3),
    padding: HEIGHT(2),
    marginBottom: HEIGHT(3),
    marginHorizontal: WIDTH(3),
    borderRadius: 16,
    backgroundColor: COLOR.White,
  },

  TrackBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#008215',
    borderRadius: 10,
    height: 32,
    width: 62,
    marginHorizontal: 3,
  },

  trackBtnTxt: {
    fontFamily: Poppins_Regular,
    fontSize: 12,
    color: '#008215',
  },

  dashlineStyle: {
    marginTop: HEIGHT(1),
    marginBottom: HEIGHT(1),
    marginVertical: WIDTH(3),
  },

  name: {
    fontFamily: Inter_Regular,
    fontSize: 16,
    color: COLOR.Black,
  },
});
