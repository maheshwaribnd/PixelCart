import {
  Animated,
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './style';
import React, {useRef, useState} from 'react';
import COLOR from '../../Config/color.json';
import {HEIGHT, WIDTH} from '../../Config/appConst';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Image} from 'react-native';
import Paginator from '../../Components/Pagination/Pagination';
import {PartiProductDetails} from '../../Arrays/PartiProductDetails/PartiProductDetails';
import {SimilarProductArray} from '../../Arrays/SimilarProductArray/SimilarProductArray';
import {ReviewPhotosArray} from '../../Arrays/ReviewPhotosArray/ReviewPhotosArray';
import {Rating} from 'react-native-elements';
import Snackbar from 'react-native-snackbar';

const ProductCartDetails = () => {
  const slides = useRef(null);
  const route = useRoute();
  const navigation = useNavigation();
  const [expand, setExpand] = useState(false);

  const scrollX = useRef(new Animated.Value(0)).current;
  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

  const viewableItemsChanged = useRef(({viewableItems}) => {
    // setCurrentIndex(viewableItems[0].index);
  }).current;

  const ShowProDetailsFunction = ({item}) => {
    return (
      <View style={styles.listView}>
        <Image source={item?.image} style={styles.img} />
      </View>
    );
  };

  const ShowSimilarProduct = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('particularcategory')}
        style={styles.similarProductView}>
        <Image source={item?.img} />
        <Text style={[styles.name, {fontSize: 12}]}>{item?.title}</Text>
        <Text style={[styles.name, {fontSize: 16}]}>₹{item?.price}</Text>
      </TouchableOpacity>
    );
  };

  const ShowReviewPhotos = ({item}) => {
    return (
      <View style={{marginRight: WIDTH(2.5)}}>
        <Image source={item?.img} />
      </View>
    );
  };

  const subStringFunction = () => {
    const longText =
      'Be transported into the fierce battles and imaginative world of Dragon Ball with these super exciting Dragon Ball Evolved figures. These 5-inch favorites are expertly crafted and intricately detailed with over 16 points of articulation. So authentic and realistic you might think they re the real thing. His training and knowledge are in total harmony with his natural drives and impulses. His skills of offense and defense are balanced and refined and he is in touch with his true impulse and pure drive. He can do whatever it takes to achieve the ultimate goal and destroy all evil.';
    if (longText.length <= 230) {
      return longText;
    } else {
      return longText.substring(0, 222);
    }
  };

  const subStringReviewFunction = () => {
    const longText =
      'An incredible depiction of Gokus Super Saiyan form, the SH Figuarts action figure captures the essence of his power.';
    if (longText.length <= 160) {
      return longText;
    } else {
      return longText.substring(0, 160);
    }
  };

  const addToCartFunction = () => {
    return Snackbar.show({
      text: 'Product Added!',
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor: 'grey',
      // textColor: 'black'
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.cartBox}>
        {/* <Image
          source={require('../../Images/TrendingProImg/TrendPro4.png')}
          style={styles.img}
        /> */}

        <FlatList
          data={PartiProductDetails}
          renderItem={({item}) => <ShowProDetailsFunction item={item} />}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          // bounces={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {
              useNativeDriver: false,
            },
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          ref={slides}
          viewabilityConfig={viewConfig}
        />
        <View style={{position: 'absolute', top: HEIGHT(48), left: WIDTH(36)}}>
          <Paginator data={PartiProductDetails} scrollX={scrollX} />
        </View>

        <Text style={styles.title}>Goku Supersaiyan SH figure arts</Text>
        <Text style={[styles.title, {fontSize: 12, color: COLOR.Gray}]}>
          Brand: Bandai SH figure arts
        </Text>
      </View>

      <View style={styles.cartBox}>
        <View style={styles.alignStyle}>
          <View>
            <Text style={styles.title}>₹ 1200</Text>
            <Text style={[styles.title, {fontSize: 12, color: COLOR.Gray}]}>
              Delivery by 20 July 2024
            </Text>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center', gap: 6}}>
            <Feather name="share-2" size={20} color={COLOR.Black} />
            <Text style={styles.shareTxt}>Share</Text>
          </View>
        </View>

        <View style={[styles.alignStyle, {gap: 6}]}>
          <TouchableOpacity
            activeOpacity={0.4}
            onPress={() => addToCartFunction()}
            style={[styles.button, {backgroundColor: COLOR.BlueLightShade}]}>
            <Text style={[styles.txtBtn, {color: COLOR.BtnColor}]}>
              Add to Cart
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.4}
            onPress={() => navigation.navigate('address')}
            style={[styles.button, {backgroundColor: COLOR.BtnColor}]}>
            <Text style={styles.txtBtn}>Purchase</Text>
          </TouchableOpacity>
        </View>

        <View>
          <Text
            style={[styles.txtBtn, {color: COLOR.Black, marginTop: HEIGHT(2)}]}>
            Description
          </Text>
          <View>
            <Text
              style={[
                styles.title,
                {fontSize: 14, color: '#171717', width: 322},
              ]}>
              {subStringFunction()}
            </Text>
            <TouchableOpacity>
              <Text style={styles.readmore}>
                {expand ? '...read more' : '...read less.'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.horizontalLine} />

        <Text style={[styles.txtBtn, {color: COLOR.Black}]}>
          Similar product for you
        </Text>

        <FlatList
          data={SimilarProductArray}
          renderItem={({item}) => <ShowSimilarProduct item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
        />

        <Text style={[styles.txtBtn, {color: COLOR.Black}]}>
          Customer reviews
        </Text>

        <View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
              <Image
                source={require('../../Images/DealsOfTheDay/Img1.png')}
                style={{width: 32, height: 32, borderRadius: 16}}
              />
              <Text style={styles.reviewerName}>John dory</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Rating
                showRating
                imageSize={10}
                onFinishRating={4}
                style={{paddingVertical: 10}}
              />
            </View>
          </View>

          <Text style={styles.reviewerName}>John dory</Text>

          <View>
            <Text
              style={[
                styles.title,
                {fontSize: 14, color: '#171717', width: 322},
              ]}>
              {subStringReviewFunction()}
            </Text>
            <TouchableOpacity>
              <Text style={styles.readmore}>
                {expand ? '...read more' : '...read less.'}
              </Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={ReviewPhotosArray}
            renderItem={({item}) => <ShowReviewPhotos item={item} />}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.4}
          onPress={() => navigation.navigate('reviewscreen')}
          style={styles.reviewbtn}>
          <Text style={styles.reviewtxtBtn}>Write a review</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProductCartDetails;
