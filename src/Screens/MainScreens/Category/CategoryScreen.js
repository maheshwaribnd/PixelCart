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

  const CategoryListAPI = async () => {
    ApiManager.allCategories().then(res => {
      const response = res?.data?.Categories;
      setcategoryResponse(response);
    });
  };

  const RenderItemFunction = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('subcategory', {catID: item?.id})}
        style={styles.imgWrap}>
        <Image source={{uri: item?.icon}} style={styles.image} />
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
