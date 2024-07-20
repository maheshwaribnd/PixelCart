import React, {useEffect} from 'react';
import StackNavigation from './Navigation/StackNavigation';
import {LogBox} from 'react-native';

const Index = () => {
  console.disableYellowBox = true;

  useEffect(() => {
    LogBox.ignoreAllLogs(true)
  }, [])

  LogBox.ignoreLogs(['Warning: ...'])
  return <StackNavigation />;
};

export default Index;
