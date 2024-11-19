import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import COLOR from '../../Config/color.json';
import {HEIGHT, Poppins_Regular, WIDTH} from '../../Config/appConst';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import ApiManager from '../../API/Api';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SearchBarHeader = ({
  query,
  handleSearch,
  loadRecentSearches,
  filteredSearch,
}) => {
  const navigation = useNavigation();
  const selector = useSelector(state => state.UserDetails);

  const [userResponse, setUserResponse] = useState([]);
  const [recentSearch, setRecentSearch] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const fetchUserProfile = async () => {
        const userDetails = await AsyncStorage.getItem('userData');
        const user = JSON.parse(userDetails);
        const userId = user?.customer_id;

        const params = {
          user_id: userId,
        };

        ApiManager.userData(params)
          .then(res => {
            setUserResponse(res?.data); // Update profile data on focus
          })
          .catch(err => {
            console.log('Error fetching profile data:', err);
          });
      };

      fetchUserProfile();
    }, []),
  );

  useEffect(() => {
    loadRecentSearches();
  }, []);

  return (
    <View style={styles.headerView}>
      <View>
        <Text>Hello,</Text>
        <Text style={styles.headerName}>{userResponse[0]?.users_name}</Text>
      </View>
      <View style={styles.searchbar}>
        <TextInput
          placeholder="Search products..."
          value={query}
          onChangeText={text => filteredSearch(text)}
          onSubmitEditing={() => handleSearch(query)} // Pass query here
          style={styles.searchInput}
        />
        <Fontisto
          name="search"
          size={21}
          onPress={() => handleSearch(query)} // Pass query here
          style={{paddingRight: 25}}
        />
      </View>
      <Ionicons
        name="notifications-outline"
        size={25}
        color={COLOR.BtnColor}
        onPress={() => navigation.navigate('notification')}
      />
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
  },

  searchbar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 260,
    height: 40,
    borderWidth: 1,
    borderRadius: 20,
    marginLeft: WIDTH(2),
    borderColor: COLOR.Gray,
  },

  searchInput: {
    width: 220,
    borderRadius: 20,
    paddingLeft: WIDTH(4),
  },

  searchIcon: {
    position: 'absolute',
    right: 10,
  },
});
