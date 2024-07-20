import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomHeader from '../../Components/CustomHeader/CustomHeader';
import {
  HEIGHT,
  Inter_Regular,
  Poppins_Regular,
  WIDTH,
} from '../../Config/appConst';
import COLOR from '../../Config/color.json';
import CustomBtn from '../../Components/CustomBtn/CustomButton';
import StepIndicator from 'react-native-step-indicator';

const TrackScreen = () => {
  const labels = [
    'Cart',
    'Delivery Address',
    'Order Summary',
    'Payment Method',
    'Track',
  ];
  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#fe7013',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#fe7013',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#fe7013',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#fe7013',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#fe7013',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: '#fe7013',
  };

  // constructor() {
  //     this.state = {
  //         currentPosition: 0
  //     }
  // }

  return (
    <View>
      <CustomHeader name="Track Order" />
      <View style={styles.container}>
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

          <StepIndicator
            customStyles={customStyles}
            // currentPosition={this.state.currentPosition}
            labels={labels}
          />
          <CustomBtn name="Explore" />

        </View>
        {/* <View style={{marginLeft: WIDTH(6.5)}}>
          <CustomBtn name="Explore" />
        </View> */}
      </View>
    </View>
  );
};

export default TrackScreen;

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'center',
    //  alignItems: 'center',
    //  padding: HEIGHT(2),
    //  marginVertical: HEIGHT(3),
    //  marginHorizontal: WIDTH(3),
  },

  cartBox: {
    justifyContent: 'center',
    // alignItems: 'center',
    padding: HEIGHT(2),
    marginVertical: HEIGHT(3),
    marginHorizontal: WIDTH(3),
    borderRadius: 16,
    backgroundColor: COLOR.White,
  },

  name: {
    fontFamily: Inter_Regular,
    fontSize: 16,
    color: COLOR.Black,
  },
});
