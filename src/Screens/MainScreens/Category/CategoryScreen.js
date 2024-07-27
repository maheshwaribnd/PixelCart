import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomHeader from '../../../Components/CustomHeader/CustomHeader';
import {CategoryArray} from '../../../Arrays/CategoryArray/CategoryArray';
import {useNavigation} from '@react-navigation/native';
import {styles} from './style';
import ApiManager from '../../../API/Api';

const CategoryScreen = () => {
  const navigation = useNavigation();

  const [categoryResponse, setcategoryResponse] = useState([]);

  useEffect(() => {
    CategoryListAPI();
  }, []);

  const CategoryListAPI = () => {
    ApiManager.allCategories().then(res => {
      if (res?.data?.status == 200) {
        setcategoryResponse(res?.data);
      }
    });
  };

  const RenderItemFunction = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('productcartdetail')}
        style={styles.imgWrap}>
        <Image source={{uri: item?.img_name}} style={styles.image} />
        <Text style={styles.name}>{item?.category}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <CustomHeader name="Category" />
      <View style={styles.viewWrap}>
        <FlatList
          data={categoryResponse}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => <RenderItemFunction item={item} />}
        />
      </View>
    </View>
  );
};

export default CategoryScreen;
