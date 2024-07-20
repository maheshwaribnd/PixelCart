import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import CustomHeader from '../../../Components/CustomHeader/CustomHeader';
import { CategoryArray } from '../../../Arrays/CategoryArray/CategoryArray';
import {HEIGHT, Poppins_Regular, WIDTH} from '../../../Config/appConst';
import COLOR from '../../../Config/color.json';

const CategoryScreen = () => {
  const RenderItemFunction = ({item}) => {
    return (
      <View style={styles.imgWrap}>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.name}>{item.name}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CustomHeader name="Category" />
      <View style={styles.viewWrap}>
        <FlatList
          data={CategoryArray}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => <RenderItemFunction item={item} />}
        />
      </View>
    </View>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F0FF',
  },

  viewWrap: {
    paddingVertical: HEIGHT(2),
    paddingHorizontal: WIDTH(2),
    marginBottom: HEIGHT(7),
  },

  imgWrap: {
    width: 107,
    height: 145,
    backgroundColor: COLOR.White,
    marginHorizontal: 3,
    marginBottom: HEIGHT(2),
  },

  image: {
    width: 96,
    height: 107,
    marginHorizontal: WIDTH(1.5),
    marginVertical: HEIGHT(1),
  },

  name: {
    fontFamily: Poppins_Regular,
    fontSize: 14,
    color: COLOR.Black,
    textAlign: 'center',
  },
});
