import { StyleSheet } from 'react-native';
import DesignParams from '../DesignParams';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  captureButton: {
    height: 60,
    width: 60,
    position: 'absolute',
    alignSelf: 'center',
    bottom: 10,
  },
  captureButtonActive: {
    borderRadius: 5,
    backgroundColor: 'red',
  },
  captureButtonInactive: {
    borderRadius: 40,
    backgroundColor: 'red',
  }
});

export default Styles;
