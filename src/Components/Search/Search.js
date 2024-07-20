import {StyleSheet, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import COLOR from '../../Config/color.json';
import React from 'react';

const Search = () => {
  return (
    <View>
      <Feather name="search" size={25} color={COLOR.Black} />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({});
