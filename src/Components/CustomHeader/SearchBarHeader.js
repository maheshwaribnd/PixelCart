import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import COLOR from '../../Config/color.json';
import {HEIGHT, Poppins_Regular, WIDTH} from '../../Config/appConst';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import ApiManager from '../../API/Api';

const SearchBarHeader = () => {
  const navigation = useNavigation();

  const [allProductListResponse, setAllProductListResponse] = useState([]);
  const [filterProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState('');

  // For All products List

  useEffect(() => {
    AllProductList();
  }, []);

  const AllProductList = () => {
    ApiManager.allProducts()
      .then(res => {
        const response = res?.data?.Product_description;
        setAllProductListResponse(response);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const filteredSearch = text => {
    setSearch(text);

    const filterdData = allProductListResponse.filter(item =>
      item.products_name.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredProducts(filterdData);

    navigation.navigate('recentsearch', {filterProducts: filterProducts});
  };

  return (
    <View style={styles.headerView}>
      <View>
        <Text>Hello,</Text>
        <Text style={styles.headerName}>Mahi</Text>
      </View>
      <View style={styles.searchbar}>
        <TextInput
          value={search}
          onChangeText={() => filteredSearch()}
          style={styles.searchInput}
        />
        <Feather
          name="search"
          size={25}
          color={COLOR.BtnColor}
          style={styles.searchIcon}
        />
      </View>
      <Ionicons name="notifications-outline" size={25} color={COLOR.BtnColor} />
    </View>
  );
};

export default SearchBarHeader;

const styles = StyleSheet.create({
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: HEIGHT(1.5),
    height: 64,
    shadowOffset: {
      height: 10,
      width: 2,
    },
    elevation: 6,
    backgroundColor: COLOR.White,
  },

  headerName: {
    fontSize: 16,
    fontFamily: Poppins_Regular,
    color: COLOR.Black,
    textAlign: 'center',
  },

  searchbar: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 260,
    height: 40,
    borderWidth: 0.5,
    borderRadius: 20,
    borderColor: COLOR.Gray,
  },

  searchInput: {
    width: 260,
    borderRadius: 20,
    paddingLeft: WIDTH(4),
  },

  searchIcon: {
    position: 'absolute',
    right: 10,
  },
});
