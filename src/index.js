import React, {useEffect} from 'react';
import StackNavigation from './Navigation/StackNavigation';
import {LogBox} from 'react-native';
import {PaperProvider} from 'react-native-paper';

const Index = () => {
  console.disableYellowBox = true;

  useEffect(() => {
    LogBox.ignoreAllLogs(true);
  }, []);

  LogBox.ignoreLogs(['Warning: ...']);
  return (
    <PaperProvider>
      <StackNavigation />
    </PaperProvider>
  );
};

export default Index;
