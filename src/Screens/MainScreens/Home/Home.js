import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import SearchBarHeader from '../../../Components/CustomHeader/SearchBarHeader';
import HomeScreen from './HomeScreen';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FlatList} from 'react-native';

import COLOR from '../../../Config/color.json';
import {HEIGHT, Poppins_Medium, WIDTH} from '../../../Config/appConst';
import ApiManager from '../../../API/Api';

const Home = () => {
  const navigation = useNavigation();
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const [allProductListResponse, setAllProductListResponse] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filterProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    AllProductList();
  }, []);

  const AllProductList = () => {
    ApiManager.allProducts()
      .then(res => {
        const response = res?.data?.allProducts;
        setAllProductListResponse(response);
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (allProductListResponse.length === 0) {
      console.warn('No products received from API.');
    }
  }, [allProductListResponse]);

  const handleSearch = async text => {
    setQuery(text);

    if (text.trim().length > 0) {
      await saveSearch(text);

      // Filter products
      const filteredProducts = allProductListResponse.filter(item =>
        item?.products_name.toLowerCase().includes(text.toLowerCase()),
      );

      setFilteredProducts(filteredProducts); // Update the state here

      if (filteredProducts.length > 0) {
        // Check for category match
        const categoryMatch = filteredProducts.find(
          item =>
            item.category && item.category.toLowerCase() === text.toLowerCase(),
        );

        if (categoryMatch) {
          navigation.navigate('subcategory', {
            catID: categoryMatch.product_id,
            catName: categoryMatch.category,
          });
        } else {
          const product = filteredProducts[0];
          console.log('product', product);

          const products = {
            productID: product.product_id,
            productName: product.products_name,
          };
          // navigation.navigate('productcartdetails', {
          //   item: product,
          // })
        }
      } else {
        console.warn('No matching products or categories found.');
      }
    }
  };

  //   const handleSearch = async text => {
  //     setQuery(text);
  //     if (text.trim().length > 0) {
  //       await saveSearch(text)
  //       onSearch(text)
  //       //   navigation.navigate('subcategory', {
  //       //     catID: item?.product_id,
  //       //     catName: item?.category,
  //       //   })
  //     }
  //   };

  const saveSearch = async search => {
    try {
      const existingSearches =
        JSON.parse(await AsyncStorage.getItem('recentSearches')) || [];
      const updatedSearches = [
        search,
        ...existingSearches.filter(item => item !== search),
      ];
      await AsyncStorage.setItem(
        'recentSearches',
        JSON.stringify(updatedSearches),
      );
      const searches = JSON.parse(await AsyncStorage.getItem('recentSearches'));
      setRecentSearches(searches); // Update the state with the new searches
    } catch (error) {
      console.error('Error saving search:', error);
    }
  };

  const loadRecentSearches = async () => {
    try {
      const searches =
        JSON.parse(await AsyncStorage.getItem('recentSearches')) || [];
      setRecentSearches(searches);
    } catch (error) {
      console.error('Error loading recent searches', error);
    }
  };

  //   const handleRecentSearchClick = search => {
  //     setQuery(search);
  //     // onSearch(search); // Search with the selected recent search
  //   };

  const filteredSearch = text => {
    setQuery(text);
    const filterdData = allProductListResponse.filter(item => {
      setSelectedCategory(item);
      return item?.products_name.toLowerCase().includes(text.toLowerCase());
    });
    setFilteredProducts(filterdData);
  };

  const RecentList = ({item}) => {
    const obj = {
      image_name: item.products_img,
      name: item?.products_name,
      products_desc: item?.products_desc,
      price: item?.price,
      id: item?.product_id,
      qty: 0,
    };

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('productcartdetails', {
            item: obj,
          })
        }
        style={styles.addressListContainer}>
        <Text style={styles.addressListText}>{item.products_name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1}}>
      <SearchBarHeader
        query={query}
        setQuery={setQuery}
        handleSearch={() => handleSearch()}
        loadRecentSearches={() => loadRecentSearches()}
        filteredSearch={filteredSearch}
      />
      <View style={{flex: 1}}>
        {query ? (
          <View style={styles.listContainer}>
            {filterProducts.length === 0 ? (
              <Text>No matching products found.</Text>
            ) : (
              <FlatList
                data={filterProducts}
                keyExtractor={item => item.product_id.toString()}
                renderItem={({item}) => <RecentList item={item} />}
              />
            )}
          </View>
        ) : (
          <HomeScreen />
        )}
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  listContainer: {
    height: HEIGHT(100),
    // backgroundColor: '#FFF',
    gap: HEIGHT(1),
    paddingVertical: HEIGHT(3),
    paddingHorizontal: WIDTH(3),
  },

  addressListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: HEIGHT(1.5),
    // backgroundColor: '#F4F4F4',
    backgroundColor: '#FFF',
    paddingVertical: HEIGHT(1.5),
    paddingHorizontal: WIDTH(1.5),
    borderRadius: 6,
  },

  addressListText: {
    color: COLOR.Black,
    fontFamily: Poppins_Medium,
    width: WIDTH(65),
  },

  logoWithName: {
    flexDirection: 'row',
    gap: 6,
    textAlign: 'center',
  },
});
