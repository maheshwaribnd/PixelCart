import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';

const RecentSearchScreen = () => {
  const route = useRoute();
  const filterproducts = route.params.filterProducts;

  const ShowSearchItems = ({item}) => {
    return (
      <View>
        <Text>{item}</Text>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={filterproducts}
        renderItem={({item}) => <ShowSearchItems item={item} />}
      />
    </View>
  );
};

export default RecentSearchScreen;

const styles = StyleSheet.create({});
