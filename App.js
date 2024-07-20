import {PaperProvider} from 'react-native-paper';
import Index from './src';

const App = () => {
  return (
    <PaperProvider>
      <Index />
    </PaperProvider>
  );
};

export default App;
