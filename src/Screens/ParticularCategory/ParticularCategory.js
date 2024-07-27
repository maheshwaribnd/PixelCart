import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {styles} from './style';
import CustomHeader from '../../Components/CustomHeader/CustomHeader';
import {CategoryListArray} from '../../Arrays/HomeScreenArray/CategoryListArray';
import {HEIGHT, WIDTH} from '../../Config/appConst';
import {Image} from 'react-native';
import {ParticularCatArray} from '../../Arrays/ParticularCatArray/ParticularCatArray';
import {useNavigation} from '@react-navigation/native';

const ParticularCategory = () => {
  const navigation = useNavigation();

  const CategoryImgsList = ({item}) => {
    return (
      <View style={styles.categoryListView}>
        <Image source={item?.Image} style={styles.catListImage} />
        <Text style={[styles.name, {fontSize: 10}]}>{item?.name}</Text>
      </View>
    );
  };

  const ParticularCategoryList = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('productcartdetail')}
        style={styles.ParticularCatlistView}>
        <Image source={item.img} />
        <View style={{justifyContent: 'space-between'}}>
          <View>
            <Text style={styles.title}>{item.title}</Text>
          </View>

          <View>
            <Text style={styles.desc}>{item.desc}</Text>
            <Text style={styles.price}>₹ {item.price}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <CustomHeader name="Fashion" />
      <View>
        <View style={styles.catListFlatlistView}>
          <FlatList
            data={CategoryListArray}
            renderItem={({item}) => <CategoryImgsList item={item} />}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View style={[styles.alignStyle, {marginHorizontal: WIDTH(4)}]}>
          <Text style={[styles.name, {fontSize: 16}]}>Results</Text>
        </View>

        <View style={{marginBottom: HEIGHT(6)}}>
          <FlatList
            data={ParticularCatArray}
            renderItem={({item}) => <ParticularCategoryList item={item} />}
            scrollEnabled={true}
          />
        </View>
      </View>
    </View>
  );
};

export default ParticularCategory;
