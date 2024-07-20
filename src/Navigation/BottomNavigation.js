import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import HomeScreen from '../Screens/MainScreens/Home/HomeScreen';
import CategoryScreen from '../Screens/MainScreens/Category/CategoryScreen';
import CartScreen from '../Screens/MainScreens/Cart/CartScreen';
import ProfileScreen from '../Screens/MainScreens/Profile/ProfileScreen';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useRef, useState} from 'react';
import * as Animatable from 'react-native-animatable';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {Icons} from '../Config/Icons';

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  const Tabs = [
    {
      route: 'home',
      label: 'Home',
      icon: 'home',
      type: Octicons,
      component: HomeScreen,
    },
    {
      route: 'category',
      label: 'Category',
      icon: 'home',
      type: Octicons,
      component: CategoryScreen,
    },
    {
      route: 'cart',
      label: 'Cart',
      icon: 'shoppingcart',
      type: AntDesign,
      component: CartScreen,
    },
    {
      route: 'profile',
      label: 'Profile',
      icon: 'home',
      type: Octicons,
      component: ProfileScreen,
    },
  ];

  // doing Animateble
  const animate1 = {
    0: {scale: 0.5, translateY: 1},
    1: {scale: 1, translateY: -3},
  };

  const animate2 = {
    0: {scale: 1, translateY: -2},
    1: {scale: 1, translateY: 3},
  };

  const circle1 = {
    0: {scale: 0},

    1: {scale: 1},
  };
  const circle2 = {0: {scale: 1}, 1: {scale: 0}};

  const TabButton = props => {
    const Navigation = useNavigation();
    const [changeColor, setChangeColor] = useState(false);

    const {item, onPress, accessibilityState} = props;
    const focused = accessibilityState.selected;

    const viewRef = useRef(null);
    const circleRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
      if (focused) {
        setChangeColor(!changeColor);
        viewRef.current.animate(animate1);
        circleRef.current.animate(circle1);
        textRef.current.transitionTo({scale: 1});
      } else {
        setChangeColor(changeColor);
        viewRef.current.animate(animate2);
        circleRef.current.animate(circle2);
        textRef.current.transitionTo({scale: 1});
      }
    }, [focused]);

    return (
      <TouchableOpacity
        // style={styles.container}
        onPress={() => onPress()}
        activeOpacity={1}>
        <Animatable.View
          ref={viewRef}
          duration={300}
          // style={styles.container}
        >
          <View
          // style={[
          //   styles.btn,
          //   {
          //     marginTop: focused ? HEIGHT(2) : 0,
          //   },
          // ]}
          >
            <Animatable.View
              ref={circleRef}
              // style={styles.circle}
            />
            <Icons
              type={item.type}
              name={item.icon}
              //   color={focused ? colors.White : colors.Black}
              style={{alignItems: 'center'}}
            />
            <Animatable.Text
              ref={textRef}
              //   style={focused ? styles.textColorChange : styles.text}
            >
              {item.label}
            </Animatable.Text>
          </View>
        </Animatable.View>
      </TouchableOpacity>
    );
  };
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      {Tabs.map(item => {
        return (
          <Tab.Screen
            name={item.route}
            component={item.component}
            options={{
              tabBarLabel: item.label,
              // tabBarButton: props => <TabButton {...props} item={item} />,
            }}
          />
        );
      })}
      {/* <Tab.Screen name='category' component={CategoryScreen} />
            <Tab.Screen name='cart' component={CategoryScreen} />
            <Tab.Screen name='profile' component={ProfileScreen} /> */}
    </Tab.Navigator>
  );
};

export default BottomNavigation;
