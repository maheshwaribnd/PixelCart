import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
// import Splash from '../Screens/Splash'
import Login from '../Screens/Authentication/Login';
import Signup from '../Screens/Authentication/Signup';
import Forgot from '../Screens/Authentication/Forgot';
import AppDashboard from '../Screens/MainScreens/Home/HomeScreen';
import BottomNavigation from './BottomNavigation';
import HomeScreen from '../Screens/MainScreens/Home/HomeScreen';
import ProductCartDetails from '../Screens/ProductCartDetails/ProductCartDetails';
import TrackScreen from '../Screens/TrackOrderScreen/TrackScreen';
import ReviewScreen from '../Screens/ReviewScreen/ReviewScreen';
import AddressScreen from '../Screens/Address/AddressScreen';
import SubCategory from '../Screens/SubCategory/SubCategory';
import NewPassword from '../Screens/Authentication/NewPassword';
import Splash from '../Screens/Splash/Splash';
import RecentSearchScreen from '../Components/RecentSearchScreen/RecentSearchScreen';
import EditProfile from '../Screens/MainScreens/Profile/EditProfile';
import CheckoutScreen from '../Screens/Checkout/CheckoutScreen';
import OrderListingScreen from '../Screens/OrderListingScreen/OrderListingScreen';
import NotificationComp from '../Components/Notification/NotificationComp';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="splash"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="splash" component={Splash} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="signup" component={Signup} />
        <Stack.Screen name="forgot" component={Forgot} />
        <Stack.Screen name="newpassword" component={NewPassword} />
        <Stack.Screen name="recentsearch" component={RecentSearchScreen} />
        <Stack.Screen name="Dashboard" component={BottomNavigation} />
        <Stack.Screen name="subcategory" component={SubCategory} />
        <Stack.Screen name="checkout" component={CheckoutScreen} />
        <Stack.Screen name="notification" component={NotificationComp} />
        <Stack.Screen
          name="productcartdetails"
          component={ProductCartDetails}
        />
        <Stack.Screen name="trackscreen" component={TrackScreen} />
        <Stack.Screen name="reviewscreen" component={ReviewScreen} />
        <Stack.Screen name="address" component={AddressScreen} />
        <Stack.Screen name="editprofile" component={EditProfile} />
        <Stack.Screen name="orderlist" component={OrderListingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
