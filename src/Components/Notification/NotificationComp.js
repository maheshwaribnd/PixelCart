import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const NotificationComp = () => {
  const ShowNotifications = ({item}) => {
    return <View>{item.name}</View>;
  };
  return (
    <View>
      <Text>NotificationComp</Text>
      <FlatList renderItem={({item}) => <ShowNotifications item={item} />} />
    </View>
  );
};

export default NotificationComp;

const styles = StyleSheet.create({});
