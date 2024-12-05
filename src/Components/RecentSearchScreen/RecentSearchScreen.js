import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';

const RecentSearchScreen = () => {
  const route = useRoute();
  const filterproducts = route.params;

  const handleRecentSearchClick = search => {
    setQuery(search);
    // onSearch(search); // Search with the selected recent search
  };

  const ShowSearchItems = ({item}) => {
    return (
      <TouchableOpacity onPress={() => handleRecentSearchClick(item)}>
        <Text>{item}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <FlatList
        data={filterproducts}
        keyExtractor={item => item}
        renderItem={({item}) => ShowSearchItems(item)}
      />
    </View>
  );
};

export default RecentSearchScreen;

const styles = StyleSheet.create({});
