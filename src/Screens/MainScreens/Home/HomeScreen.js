import {
  Animated,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {HEIGHT, WIDTH} from '../../../Config/appConst';
import Paginator from '../../../Components/Pagination/Pagination';
import SearchBarHeader from '../../../Components/CustomHeader/SearchBarHeader';
import {useNavigation} from '@react-navigation/native';
import {styles} from './style';
import ApiManager from '../../../API/Api';

const HomeScreen = () => {
  const slides = useRef(null);
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bannerResponse, setBannerResponse] = useState([]);
  const [categoryResponse, setcategoryResponse] = useState([]);
  const [featureproductResponse, setFeatureproductResponse] = useState([]);
  const [bestsellerResponse, setBestsellerResponse] = useState([]);
  const [trendingResponse, setTrendingResponse] = useState([]);
  const [dealsofthedayResponse, setDealsofthedayResponse] = useState([]);
  const scrollX = useRef(new Animated.Value(0)).current;
  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

  useEffect(() => {
    BannerAPI();
    CategoryAPI();
    FeatureListAPI();
    BestSellerProductAPI();
    TrendingProductListAPI();
    DealsofthedayProductListAPI();
  }, []);

  // API Integration
  // For Banner
  const BannerAPI = () => {
    ApiManager.banner()
      .then(res => {
        setBannerResponse(res?.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  // For Categories
  const CategoryAPI = () => {
    ApiManager.allCategories()
      .then(res => {
        if (res?.data?.status == 200) {
          const response = res?.data;
          setcategoryResponse(response);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  // For Featured list Products
  const FeatureListAPI = () => {
    ApiManager.featureProduct()
      .then(res => {
        if (res?.data?.status == 200) {
          const response = res?.data?.FeaturedProducts;
          setFeatureproductResponse(response);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  // For BestSeller Products
  const BestSellerProductAPI = () => {
    ApiManager.bestSellerProducts()
      .then(res => {
        if (res?.data?.status == 200) {
          const response = res?.data?.bestSellers;
          setBestsellerResponse(response);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  // For Trending Products
  const TrendingProductListAPI = () => {
    ApiManager.trendingProducts()
      .then(res => {
        if (res?.data?.status == 200) {
          const response = res?.data?.trendingProducts;
          setTrendingResponse(response);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  // For Deals of the Day Products

  const DealsofthedayProductListAPI = () => {
    ApiManager.dealsofthedayProducts()
      .then(res => {
        if (res?.data?.status == 200) {
          const response = res?.data?.dealsOfTheDay;
          setDealsofthedayResponse(response);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  const viewableItemsChanged = useRef(({viewableItems}) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const CategoryImgsList = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('particularcategory')}
        style={styles.listView}>
        <Image source={{uri: item?.img_name}} style={styles.catlistImg} />
        <Text style={[styles.name, {fontSize: 10}]}>{item?.category}</Text>
      </TouchableOpacity>
    );
  };

  const SwipeImageFunction = ({item}) => {
    return (
      <View style={styles.swipeView}>
        <Image
          source={{uri: item?.img_name}}
          style={{width: WIDTH(85), height: HEIGHT(26), borderWidth: 1}}
        />
      </View>
    );
  };

  const FeatureListFunction = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('particularcategory')}
        style={[styles.listView, {alignItems: 'flex-start'}]}>
        <Image
          source={{uri: item?.products_img}}
          style={{height: 112, width: 88}}
        />
        <Text style={[styles.name, {fontSize: 12}]}>{item?.products_name}</Text>
        <Text style={[styles.name, {fontSize: 16}]}>₹{item?.price}</Text>
      </TouchableOpacity>
    );
  };

  const BestSellerFunction = ({item}) => {
    return (
      <View style={{marginHorizontal: WIDTH(2.5), marginVertical: HEIGHT(2)}}>
        <Image
          source={{uri: item?.products_img}}
          style={{height: HEIGHT(23), width: WIDTH(42)}}
        />
        <Text style={[styles.name, {fontSize: 12}]}>{item?.products_name}</Text>
        <Text style={[styles.name, {fontSize: 14, color: 'red'}]}>
          from ₹{item?.price}
        </Text>
      </View>
    );
  };

  const TrendingProductFunction = ({item}) => {
    console.log('111', item);
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('particularcategory')}
        style={[styles.listView, {alignItems: 'flex-start'}]}>
        <Image
          style={{width: WIDTH(20), height: WIDTH(20)}}
          source={{uri: item?.products_img}}
        />
        <Text style={[styles.name, {fontSize: 12}]}>{item?.name}</Text>
        <Text style={[styles.name, {fontSize: 14}]}>₹{item?.price}</Text>
      </TouchableOpacity>
    );
  };

  const DealofthedayFunction = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('particularcategory')}
        style={[
          styles.listView,
          {alignItems: 'flex-start', marginRight: WIDTH(2.5)},
        ]}>
        <Image
          source={{uri: item?.image}}
          style={{height: HEIGHT(17), width: WIDTH(30)}}
        />
        <Text style={[styles.name, {fontSize: 12}]}>{item?.name}</Text>
        <Text style={[styles.name, {fontSize: 16}]}>₹{item?.price}</Text>
      </TouchableOpacity>
    );
  };

  renderItem = ({item}) => {
    return (
      <View>
        <Image source={{uri: item.image}} />
      </View>
    );
  };

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <SearchBarHeader />

      <ScrollView>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <View style={styles.catlistView}>
            <FlatList
              data={categoryResponse}
              renderItem={({item}) => <CategoryImgsList item={item} />}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>

          <View style={{padding: WIDTH(3), paddingTop: HEIGHT(0)}}>
            <FlatList
              data={bannerResponse}
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
              <Paginator data={bannerResponse} scrollX={scrollX} />
            </View>
          </View>

          <View style={{padding: WIDTH(3), paddingTop: HEIGHT(4)}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.subtitle}>Featured Product</Text>
              <Text style={styles.seeAllText}>See all</Text>
            </View>

            <View>
              <FlatList
                data={featureproductResponse}
                renderItem={({item}) => <FeatureListFunction item={item} />}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </View>

          <View style={styles.bestsellerFlatView}>
            <View style={styles.alignStyle}>
              <Text style={styles.subtitle}>Bestseller</Text>
              <Text style={styles.seeAllText}>See all</Text>
            </View>
            <View>
              <FlatList
                data={bestsellerResponse}
                renderItem={({item}) => <BestSellerFunction item={item} />}
                numColumns={2}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </View>

          <View style={{padding: WIDTH(3), paddingTop: HEIGHT(0)}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.subtitle}>Trending Product</Text>
              <Text>See all</Text>
            </View>

            <View>
              <FlatList
                data={trendingResponse}
                renderItem={({item}) => <TrendingProductFunction item={item} />}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </View>

          <View style={styles.dealofdayFlatView}>
            <Text style={styles.subtitle}>Deals Of The Day</Text>
            <View>
              <FlatList
                data={dealsofthedayResponse}
                renderItem={({item}) => <DealofthedayFunction item={item} />}
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
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
