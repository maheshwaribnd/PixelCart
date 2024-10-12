import {Provider} from 'react-redux';
import Index from './src';
import store from './src/Redux/Store/Store';

const App = () => {
  return (
    <Provider store={store}>
      <Index />
    </Provider>
  );
};

export default App;
