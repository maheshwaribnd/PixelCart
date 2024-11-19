import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './style';
import CustomHeader from '../../Components/CustomHeader/CustomHeader';
import {HEIGHT, WIDTH} from '../../Config/appConst';
import {Image} from 'react-native';
import {Divider} from '@rneui/themed';
import {useNavigation, useRoute} from '@react-navigation/native';
import ApiManager from '../../API/Api';
import {Rating} from 'react-native-elements';

const SubCategory = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const [categoryResponse, setcategoryResponse] = useState([]);
  const [subcategoryResponse, setsubcategoryResponse] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);

  const categoryID = route?.params?.catID;
  const categoryName = route?.params?.catName;

  useEffect(() => {
    CategoryListAPI();
    getCategoryWiseListingAPI();
  }, [categoryID]);

  // Category List API
  const CategoryListAPI = async () => {
    ApiManager.allCategories()
      .then(res => {
        if (res?.data?.status == 200) {
          const response = res?.data?.Categories;
          setcategoryResponse(response);
        }
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  // Get Category Wise Listing API
  const getCategoryWiseListingAPI = () => {
    ApiManager.getCategoriesWiseProducts(categoryID)
      .then(res => {
        if (res?.data?.status == 200) {
          const response = res?.data?.Categories;
          setsubcategoryResponse(response);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleCategoryPress = item => {
    setSelectedItem(item);
    ApiManager.getCategoriesWiseProducts(item?.id)
      .then(res => {
        if (res?.data?.status == 200) {
          const response = res?.data?.Categories;
          setsubcategoryResponse(response);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  const CategoryImgsList = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => handleCategoryPress(item)}
        style={styles.categoryListView}>
        <Image source={{uri: item?.icon}} style={styles.catListImage} />
        <Text style={[styles.name, {fontSize: 10}]}>{item?.category}</Text>
      </TouchableOpacity>
    );
  };

  const ShowCategoryWiseList = ({item}) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('productcartdetails', (particularItem = {item}))
          }
          style={styles.ParticularCatlistView}>
          <Image
            source={{uri: item?.image_name}}
            style={{height: 152, width: 116, borderWidth: 1}}
          />
          <View style={{justifyContent: 'space-between', alignItems: 'center'}}>
            <View>
              <Text style={styles.title}>{item?.name}</Text>
            </View>

            <View>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 6}}>
                <Rating
                  imageSize={20}
                  onFinishRating={4}
                  style={{paddingVertical: 10}}
                  ratingBackgroundColor="gray"
                />
                <Text style={styles.desc}>{item?.review}/5</Text>
              </View>
              <Text style={styles.price}>₹ {item?.price}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <Divider
          width={0.7}
          color="gray"
          style={{marginVertical: 10, marginHorizontal: 16}}
        />
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <CustomHeader name={categoryName} />
      <View style={{backgroundColor: '#fff'}}>
        <View style={styles.catListFlatlistView}>
          <FlatList
            data={categoryResponse}
            renderItem={({item}) => <CategoryImgsList item={item} />}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View style={[styles.alignStyle, {marginHorizontal: WIDTH(4)}]}>
          <Text style={[styles.name, {fontSize: 16}]}>Results</Text>
        </View>

        <View style={{marginBottom: HEIGHT(52)}}>
          <FlatList
            data={subcategoryResponse}
            renderItem={({item}) => <ShowCategoryWiseList item={item} />}
            scrollEnabled={true}
          />
        </View>
      </View>
    </View>
  );
};

export default SubCategory;
