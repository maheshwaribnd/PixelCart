import {Text, TextInput, View} from 'react-native';
import React from 'react';
import {styles} from './style';
import CustomHeader from '../../Components/CustomHeader/CustomHeader';
import {HEIGHT, WIDTH} from '../../Config/appConst';
import COLOR from '../../Config/color.json';
import {Image} from 'react-native';
import CustomBtn1 from '../../Components/CustomBtn/CustomBtn1';
import {Rating} from 'react-native-elements';

const ReviewScreen = () => {
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
            multiline
            placeholder="Write review headline"
            style={styles.input}
          />

          <Text style={styles.text}>
            Write a detailed review{' '}
            <Text style={[styles.text, {color: COLOR.Gray}]}>(optional)</Text>
          </Text>
          <TextInput
            multiline
            placeholder="e.g: write your experience with item you purchased"
            style={styles.input}
          />

          <Text style={styles.text}>Rating</Text>
          <View style={{flexDirection: 'row'}}>
            <Rating
              // showRating
              imageSize={30}
              onFinishRating={4}
              style={{paddingVertical: 10}}
            />
          </View>
        </View>
      </View>
      <View style={{marginLeft: WIDTH(4)}}>
        <CustomBtn1
          name="Submit review"
          onPress={() => console.log('Write Review')}
        />
      </View>
    </View>
  );
};

export default ReviewScreen;
