import {Text, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './style';
import CustomHeader from '../../Components/CustomHeader/CustomHeader';
import {HEIGHT, WIDTH} from '../../Config/appConst';
import COLOR from '../../Config/color.json';
import {Image} from 'react-native';
import CustomBtn1 from '../../Components/CustomBtn/CustomBtn1';
import {Rating} from 'react-native-elements';
import ApiManager from '../../API/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';

const ReviewScreen = () => {
  const navigation = useNavigation();

  const [reviewHeadline, setReviewHeadline] = useState('');
  const [reviewDesc, setReviewDesc] = useState('');
  const [userIdd, setUserId] = useState(null);
  const [productId, setProductId] = useState(null);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const fetchIds = async () => {
      try {
        const userDetails = await AsyncStorage.getItem('userData');
        const user = JSON.parse(userDetails);
        const userId = user?.customer_id;

        const jsonProduct = await AsyncStorage.getItem('product');
        const product = JSON.parse(jsonProduct);
        const productID = product?.id;

        if (userId !== null) {
          setUserId(userId);
        }
        if (productID !== null) {
          setProductId(productID);
        }
      } catch (error) {
        console.error('Error retrieving IDs:', error);
      }
    };

    fetchIds();
  }, []);

  const ReviewPostAPI = async () => {
    const params = {
      user_id: userIdd,
      product_id: productId,
      heading: reviewHeadline,
      description: reviewDesc,
      rating: rating,
    };

    ApiManager.postProductReview(params)
      .then(res => {
        const message = res?.data?.message;
        Snackbar.show({
          text: message,
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: 'grey',
          textColor: COLOR.White,
        });
        navigation.goBack();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const PostReview = () => {
    ReviewPostAPI();
    // navigation.goBack();
  };

  return (
    <View>
      <CustomHeader name="Write a review" />
      <View style={{marginTop: HEIGHT(2)}}>
        <View style={styles.cartBox}>
          <View style={styles.container}>
            <Image
              source={require('../../Images/FeatureList/featureImg1.png')}
              style={styles.img}
            />
            <View>
              <Text style={[styles.text, {width: WIDTH(75)}]}>
                Boat stone 1350 (25 W charging support)
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.cartBox}>
          <Text style={styles.text}>Review headline</Text>
          <TextInput
            value={reviewHeadline}
            onChangeText={text => setReviewHeadline(text)}
            multiline
            placeholder="Write review headline"
            style={styles.input}
          />

          <Text style={styles.text}>
            Write a detailed review{' '}
            <Text style={[styles.text, {color: COLOR.Gray}]}>(optional)</Text>
          </Text>
          <TextInput
            value={reviewDesc}
            onChangeText={text => setReviewDesc(text)}
            multiline
            placeholder="e.g: write your experience with item you purchased"
            style={styles.input}
          />

          <Text style={styles.text}>Rating</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Rating
              startingValue={rating}
              onFinishRating={newRating => setRating(newRating)}
              showRating
              minValue={1}
              imageSize={21}
              style={{paddingVertical: 10}}
            />
            <Text>{}</Text>
          </View>
        </View>
      </View>
      <View style={{marginLeft: WIDTH(4)}}>
        <CustomBtn1 name="Submit review" onPress={() => PostReview()} />
      </View>
    </View>
  );
};

export default ReviewScreen;
