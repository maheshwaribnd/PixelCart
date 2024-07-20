import {
  Animated,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import COLOR from '../../Config/color.json';
import {
  HEIGHT,
  Inter_Regular,
  Poppins_Bold,
  Poppins_Regular,
  WIDTH,
} from '../../Config/appConst';
import Feather from 'react-native-vector-icons/Feather';
import {useRoute} from '@react-navigation/native';
import {Image} from 'react-native';
import CustomBtn from '../../Components/CustomBtn/CustomButton';
import Paginator from '../../Components/Pagination/Pagination';
import {PartiProductDetails} from '../../Arrays/PartiProductDetails/PartiProductDetails';

const ProductCartDetails = () => {
  const slides = useRef(null);
  const route = useRoute();
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

  const subStringFunction = () => {
    const longText =
      'Be transported into the fierce battles and imaginative world of Dragon Ball with these super exciting Dragon Ball Evolved figures. These 5-inch favorites are expertly crafted and intricately detailed with over 16 points of articulation. So authentic and realistic you might think they re the real thing. His training and knowledge are in total harmony with his natural drives and impulses. His skills of offense and defense are balanced and refined and he is in touch with his true impulse and pure drive. He can do whatever it takes to achieve the ultimate goal and destroy all evil.';
    if (longText.length <= 230) {
      return longText;
    } else {
      return longText.substring(0, 230);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.cartBox}>
        <Text style={styles.title}>Goku</Text>
        <Text style={[styles.title, {fontSize: 12, color: COLOR.Gray}]}>
          Delivery by 20 July 2024
        </Text>
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
        <View style={{position: 'absolute', top: HEIGHT(63), left: WIDTH(36)}}>
          <Paginator data={PartiProductDetails} scrollX={scrollX} />
        </View>
      </View>

      <View style={styles.cartBox}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View>
            <Text style={styles.title}>₹ 1200</Text>
            <Text style={[styles.title, {fontSize: 12, color: COLOR.Gray}]}>
              Delivery by 20 July 2024
            </Text>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center', gap: 6}}>
            <Feather name="share-2" size={20} color={COLOR.Black}/>
            <Text style={{fontSize: 14, fontFamily: Poppins_Regular, color: COLOR.Black}}>Share</Text>
          </View>
        </View>

        <View >
          <Text
            style={{
              fontFamily: Poppins_Bold,
              fontSize: 16,
              color: COLOR.Black,
            }}>
            Description
          </Text>
          <View >
            <Text style={[styles.title, {fontSize: 12, color: '#171717'}]}>
              {subStringFunction()}
            </Text>
            <TouchableOpacity>
              <Text>{expand ? 'read more' : 'read less.'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <CustomBtn name="Purchase" />
        </View>
      </View>
    </ScrollView>
  );
};

export default ProductCartDetails;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#F4F0FF',
  },

  cartBox: {
    justifyContent: 'center',
    padding: HEIGHT(3),
    paddingBottom: HEIGHT(6),
    marginTop: HEIGHT(3),
    marginBottom: HEIGHT(1),
    marginHorizontal: WIDTH(3),
    borderRadius: 6,
    backgroundColor: COLOR.White,
  },

  title: {
    fontFamily: Inter_Regular,
    fontSize: 16,
    color: COLOR.Black,
  },

  img: {
    width: WIDTH(80),
    height: HEIGHT(55),
  },
});
