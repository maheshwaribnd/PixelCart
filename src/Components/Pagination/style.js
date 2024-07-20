import { StyleSheet } from 'react-native';
import { HEIGHT } from '../../Config/appConst';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: HEIGHT(2)
  },

  dot: {
    // width: 10,
    height: 7,
    borderRadius: 5,
    backgroundColor: 'gray',
    marginHorizontal: 5
  },
});