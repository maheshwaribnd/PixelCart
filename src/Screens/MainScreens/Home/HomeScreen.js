import {
  Animated,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import COLOR from '../../../Config/color.json';
import {
  FONTSIZE,
  HEIGHT,
  Poppins_Medium,
  Poppins_Regular,
  WIDTH,
} from '../../../Config/appConst';
import {CategoryListArray} from '../../../Arrays/HomeScreenArray/CategoryListArray';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Paginator from '../../../Components/Pagination/Pagination';
import {SliderArray} from '../../../Arrays/SliderArray/SliderArray';
import {FeatureListArray} from '../../../Arrays/HomeScreenArray/FeatureListArray';
import {BestSelllerArray} from '../../../Arrays/HomeScreenArray/BestSellerArray';
import {TrendingProArray} from '../../../Arrays/HomeScreenArray/TrendingProArray';
import {DealofthedayArray} from '../../../Arrays/HomeScreenArray/DealofthedayArray';
import Search from '../../../Components/Search/Search';
import SearchBarHeader from '../../../Components/CustomHeader/SearchBarHeader';

const HomeScreen = () => {
  const slides = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [indexIncrease, setIndexIncrease] = useState(1);
  const [search, setSearch] = useState('');
  const scrollX = useRef(new Animated.Value(0)).current;
  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

  const viewableItemsChanged = useRef(({viewableItems}) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const CategoryImgsList = ({item}) => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          gap: 3,
          marginHorizontal: WIDTH(1.1),
          marginVertical: HEIGHT(1.5),
        }}>
        <Image
          source={item?.Image}
          style={{
            height: 64,
            width: 64,
            borderWidth: 0.5,
            borderRadius: 12,
          }}
        />
        <Text style={[styles.name, {fontSize: 10}]}>{item?.name}</Text>
      </View>
    );
  };

  const SwipeImageFunction = ({item}) => {
    return (
      <View style={styles.listView}>
        <Image source={item?.imgage} style={{marginHorizontal: WIDTH(0.7)}} />
      </View>
    );
  };

  const FeatureListFunction = ({item}) => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'flex-start',
          gap: 3,
          // marginRight: WIDTH(2.5),
          marginHorizontal: WIDTH(1.1),
          marginVertical: HEIGHT(1.5),
        }}>
        <Image source={item?.image} />
        <Text style={[styles.name, {fontSize: 12}]}>{item?.name}</Text>
        <Text style={[styles.name, {fontSize: 16}]}>₹{item?.price}</Text>
      </View>
    );
  };

  const BestSellerFunction = ({item}) => {
    return (
      <View style={{marginHorizontal: WIDTH(2.5), marginVertical: HEIGHT(2)}}>
        <Image
          source={item?.image}
          style={{height: HEIGHT(23), width: WIDTH(42)}}
        />
        <Text style={[styles.name, {fontSize: 12}]}>{item?.name}</Text>
        <Text style={[styles.name, {fontSize: 14, color: 'red'}]}>
          from ₹{item?.price}
        </Text>
      </View>
    );
  };

  const TrendingProductFunction = ({item}) => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'flex-start',
          gap: 3,
          // marginRight: WIDTH(2.5),
          marginHorizontal: WIDTH(1.1),
          marginVertical: HEIGHT(1.5),
        }}>
        <Image source={item?.image} />
        <Text style={[styles.name, {fontSize: 12}]}>{item?.name}</Text>
        <Text style={[styles.name, {fontSize: 14}]}>₹{item?.price}</Text>
      </View>
    );
  };

  const SearchFunction = () => {
    const filteredSearch = search.includes(name)
  }

  const DealofthedayFunction = ({item}) => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'flex-start',
          gap: 3,
          marginRight: WIDTH(2.5),
          marginVertical: HEIGHT(1),
        }}>
        <Image
          source={item?.image}
          style={{height: HEIGHT(17), width: WIDTH(30)}}
        />
        <Text style={[styles.name, {fontSize: 12}]}>{item?.name}</Text>
        <Text style={[styles.name, {fontSize: 16}]}>₹{item?.price}</Text>
      </View>
    );
  };

  renderItem = ({item}) => {
    return (
      <View>
        <Image source={item.image} />
      </View>
    );
  };

  return (
    <View>
      {/* <View style={styles.headerView}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: WIDTH(92),
          }}>
          <View style={{flexDirection: 'row', gap: 9, alignItems: 'center'}}>
            
            <View>
              <Text style={[styles.name, {fontSize: 12}]}>Hello</Text>
              <Text style={[styles.name, {fontSize: 16}]}>Mahi</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', gap: 7}}>
            <TouchableOpacity>
              <Search />
            </TouchableOpacity>
            <Ionicons
              name="notifications-outline"
              size={25}
              color={COLOR.Black}
            />
          </View>
        </View>
      </View> */}

      <SearchBarHeader name="Mahi" search={search} setSearch={setSearch} />

      <ScrollView>
        <View
          style={{
            justifyContent: 'center',
            gap: 9,
            paddingHorizontal: WIDTH(3),
            paddingTop: 2,
          }}>
          <FlatList
            data={CategoryListArray}
            renderItem={({item}) => <CategoryImgsList item={item} />}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View style={{padding: WIDTH(3), paddingTop: HEIGHT(0)}}>
          <FlatList
            data={SliderArray}
            renderItem={({item}) => <SwipeImageFunction item={item} />}
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
          <View
            style={{position: 'absolute', top: HEIGHT(20), left: WIDTH(36)}}>
            <Paginator data={SliderArray} scrollX={scrollX} />
          </View>
        </View>

        <View style={{padding: WIDTH(3), paddingTop: HEIGHT(4)}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.subtitle}>Featured Product</Text>
            <Text style={styles.seeAllText}>See all</Text>
          </View>

          <View>
            <FlatList
              data={FeatureListArray}
              renderItem={({item}) => <FeatureListFunction item={item} />}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>

        <View
          style={{
            backgroundColor: '#F4F0FF',
            padding: WIDTH(3),
            paddingTop: HEIGHT(0),
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.subtitle}>Bestseller</Text>
            <Text style={styles.seeAllText}>See all</Text>
          </View>
          <View>
            <FlatList
              data={BestSelllerArray}
              renderItem={({item}) => <BestSellerFunction item={item} />}
              // horizontal={false}
              numColumns={2}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>

        <View style={{padding: WIDTH(3), paddingTop: HEIGHT(0)}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.subtitle}>Trending Product</Text>
            <Text>See all</Text>
          </View>

          <View>
            <FlatList
              data={TrendingProArray}
              renderItem={({item}) => <TrendingProductFunction item={item} />}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>

        <View
          style={{
            backgroundColor: '#FFE9AB',
            padding: WIDTH(3),
            paddingBottom: HEIGHT(12),
          }}>
          <Text style={styles.subtitle}>Deals Of The Day</Text>
          <View>
            <FlatList
              data={DealofthedayArray}
              renderItem={({item}) => <DealofthedayFunction item={item} />}
              // horizontal={false}
              numColumns={3}
              showsHorizontalScrollIndicator={false}
            />
          </View>

          <TouchableOpacity
            activeOpacity={0.4}
            // onPress={() => onPress()}
            style={styles.button}>
            <Text style={styles.txtBtn}>Check all deals</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: WIDTH(4),
    // borderWidth: 1,
    borderColor: COLOR.Gray,
    shadowOffset: {
      height: 10,
      width: 2,
    },
    elevation: 6,
    backgroundColor: COLOR.White,
    height: 64,
  },

  profile: {
    height: 67,
    width: 61,
    // borderRadius: 12
  },

  name: {
    fontFamily: Poppins_Regular,
    color: COLOR.Black,
  },

  subtitle: {
    fontFamily: Poppins_Medium,
    fontSize: 16,
    color: COLOR.Black,
  },

  seeAllText: {
    fontFamily: Poppins_Medium,
    fontSize: 14,
    color: '#503192',
  },

  listView: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
  },

  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 328,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLOR.Black,
    backgroundColor: COLOR.White,
    marginTop: HEIGHT(1),
    marginBottom: HEIGHT(2),
  },

  txtBtn: {
    fontFamily: Poppins_Medium,
    fontSize: FONTSIZE(2.4),
    color: COLOR.Black,
  },
});
