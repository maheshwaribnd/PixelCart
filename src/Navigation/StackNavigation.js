import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
// import Splash from '../Screens/Splash'
import Login from '../Screens/Authentication/Login';
import Signup from '../Screens/Authentication/Signup';
import Forgot from '../Screens/Authentication/Forgot';
import AppDashboard from '../Screens/MainScreens/Home/HomeScreen';
import CategoryScreen from '../Screens/Category/CategoryScreen';
import BottomNavigation from './BottomNavigation';
import HomeScreen from '../Screens/MainScreens/Home/HomeScreen';
import ProductCartDetails from '../Screens/ProductCartDetails/ProductCartDetails';
import TrackScreen from '../Screens/TrackOrderScreen/TrackScreen';
import ReviewScreen from '../Screens/ReviewScreen/ReviewScreen';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {/* <Stack.Screen name='splash' component={Splash}/> */}
        {/* <Stack.Screen name="login" component={Login} /> */}
        {/* <Stack.Screen name="signup" component={Signup} /> */}
        {/* <Stack.Screen name="forgot" component={Forgot} /> */}
      <Stack.Screen name="Dashboard" component={BottomNavigation} />
        <Stack.Screen name="productcartdetail" component={ProductCartDetails} />
        <Stack.Screen name="trackscreen" component={TrackScreen} />
        {/* <Stack.Screen name="reviewscreen" component={ReviewScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
