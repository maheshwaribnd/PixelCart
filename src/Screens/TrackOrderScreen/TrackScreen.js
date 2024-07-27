import {Image, Text, View} from 'react-native';
import React from 'react';
import {styles} from './style';
import CustomHeader from '../../Components/CustomHeader/CustomHeader';
import COLOR from '../../Config/color.json';
import StepIndicator from 'react-native-step-indicator';
import {useNavigation} from '@react-navigation/native';
import CustomBtn2 from '../../Components/CustomBtn/CustomBtn2';

const TrackScreen = () => {
  const navigation = useNavigation();

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
      <View style={styles.cartBox}>
        <View style={styles.viewBox}>
          <Image
            source={require('../../Images/FeatureList/featureImg1.png')}
            style={styles.img}
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
        <CustomBtn2
          name="Explore"
          onPress={() => navigation.navigate('home')}
        />
      </View>
    </View>
  );
};

export default TrackScreen;
