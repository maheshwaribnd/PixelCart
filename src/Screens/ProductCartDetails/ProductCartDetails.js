import {
  Alert,
  Animated,
  FlatList,
  Linking,
  ScrollView,
  Share,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './style';
import React, {useEffect, useRef, useState} from 'react';
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
import {useDispatch} from 'react-redux';
import {addToCart} from '../../Redux/Reducers/Cart';
import ApiManager from '../../API/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductCartDetails = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const navigation = useNavigation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [reviews, setReviews] = useState([]);
  // const [rating, setRating] = useState(null);

  const particularItem = route?.params?.item;

  const scrollX = useRef(new Animated.Value(0)).current;
  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

  const viewableItemsChanged = useRef(({viewableItems}) => {
    // setCurrentIndex(viewableItems[0].index);
  }).current;

  useEffect(() => {
    ProductReviewAPI();
  }, []);

  const ProductReviewAPI = () => {
    ApiManager.getProductReviews(particularItem?.id).then(res => {
      if (res?.data?.status === 200) {
        const response = res?.data?.reviews;
        setReviews(response);
        console.log('review', res?.data);
      }
    });
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
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

  const longText =
    'Be transported into the fierce battles and imaginative world of Dragon Ball with these super exciting Dragon Ball Evolved figures. These 5-inch favorites are expertly crafted and intricately detailed with over 16 points of articulation. So authentic and realistic you might think they re the real thing. His training and knowledge are in total harmony with his natural drives and impulses. His skills of offense and defense are balanced and refined and he is in touch with his true impulse and pure drive. He can do whatever it takes to achieve the ultimate goal and destroy all evil.';

  const shareContent = async () => {
    try {
      const result = await Share.share({
        message: 'Check out this amazing content!',
        url: 'https://example.com', // optional
        title: 'Share Title', // optional
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared with activity type:', result.activityType);
        } else {
          console.log('Content shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const addToCartFunction = async item => {
    Snackbar.show({
      text: 'Product Added!',
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor: 'grey',
    });
    dispatch(addToCart(item));
    setTimeout(() => {
      navigation.navigate('cart');
    }, 300);
  };

  const WriteReviewFunction = async item => {
    const jsonProduct = JSON.stringify(item);
    await AsyncStorage.setItem('product', jsonProduct);
    navigation.navigate('reviewscreen');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.cartBox}>
        <Image source={{uri: particularItem?.image_name}} style={styles.img} />

        {/* <View style={{ position: 'absolute', top: HEIGHT(48), left: WIDTH(36) }}>
          <Paginator data={PartiProductDetails} scrollX={scrollX} />
        </View> */}

        <Text style={styles.title}>{particularItem?.name}</Text>
        {/* <Text style={[styles.title, {fontSize: 12, color: COLOR.Gray}]}>
          Brand: Bandai SH figure arts
        </Text> */}
      </View>

      <View style={styles.cartBox}>
        <View style={styles.alignStyle}>
          <View>
            <Text style={styles.title}>₹ {particularItem?.price}</Text>
            <Text style={[styles.title, {fontSize: 12, color: COLOR.Gray}]}>
              Delivery by 20 July 2024
            </Text>
          </View>

          <TouchableOpacity
            onPress={shareContent}
            style={{flexDirection: 'row', alignItems: 'center', gap: 6}}>
            <Feather name="share-2" size={20} color={COLOR.Black} />
            <Text style={styles.shareTxt}>Share</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.alignStyle, {gap: 6}]}>
          <TouchableOpacity
            activeOpacity={0.4}
            onPress={() => addToCartFunction(particularItem)}
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
              // numberOfLines={5}
              numberOfLines={isExpanded ? undefined : 5}
              style={[
                styles.title,
                {fontSize: 14, color: '#171717', width: 322},
              ]}>
              {longText}
            </Text>
            <TouchableOpacity onPress={toggleExpand}>
              <Text style={styles.readmore}>
                {isExpanded ? 'Show Less' : 'Show More'}
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
                rating={reviews?.rating}
                // onRatingChange={newRating => setRating(newRating)}
                showRating
                // fractions={1}
                // startingValue={0}
                imageSize={21}
                style={{paddingVertical: 10}}
              />
            </View>
          </View>

          <Text style={styles.reviewerName}>John dory</Text>

          <View>
            <Text
              // numberOfLines={5}
              numberOfLines={isExpanded ? undefined : 2}
              style={[
                styles.title,
                {fontSize: 14, color: '#171717', width: 322},
              ]}>
              {longText}
            </Text>
            <TouchableOpacity onPress={toggleExpand}>
              <Text style={styles.readmore}>
                {isExpanded ? 'Show Less' : 'Show More'}
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
          onPress={() => WriteReviewFunction(particularItem)}
          style={styles.reviewbtn}>
          <Text style={styles.reviewtxtBtn}>Write a review</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProductCartDetails;
