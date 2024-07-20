import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import CustomHeader from '../../Components/CustomHeader/CustomHeader';
import {HEIGHT, WIDTH} from '../../Config/appConst';
import COLOR from '../../Config/color.json';
import {Image} from 'react-native';
import CustomBtn from '../../Components/CustomBtn/CustomButton';

const ReviewScreen = () => {
  return (
    <View>
      <CustomHeader name="Write a review" />
      <View style={{marginTop: HEIGHT(2)}}>
        <View style={styles.cartBox}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 12,
              marginVertical: HEIGHT(1),
            }}>
            <Image
              source={require('../../Images/FeatureList/featureImg1.png')}
              style={{height: HEIGHT(11), width: WIDTH(20), borderRadius: 16}}
            />
            <View>
              <Text style={styles.name}>Product Name</Text>
              <Text style={[styles.name, {fontSize: 12, color: COLOR.Gray}]}>
                abcde
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.cartBox}>
          <Text>Review headline</Text>
          <TextInput
            multiline
            placeholder="Write review headline"
            style={styles.input}
          />

          <Text>
            Write a detailed review <Text>(optional)</Text>
          </Text>
          <TextInput
            multiline
            placeholder="e.g: write your experience with item you purchased"
            style={styles.input}
          />

          <Text>Rating</Text>
          <View style={{flexDirection: 'row'}}></View>
        </View>
      </View>
      <View style={{marginLeft: WIDTH(6.5)}}>
        <CustomBtn name="Submit review" />
      </View>
    </View>
  );
};

export default ReviewScreen;

const styles = StyleSheet.create({
  cartBox: {
    justifyContent: 'center',
    // alignItems: 'center',
    padding: HEIGHT(2),
    marginVertical: HEIGHT(1),
    marginHorizontal: WIDTH(3),
    borderRadius: 16,
    backgroundColor: COLOR.White,
  },

  input: {
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: COLOR.Gray,
    paddingLeft: WIDTH(3),
    marginVertical: HEIGHT(2.5),
    // width: 312,
    // height: 64,
  },
});
