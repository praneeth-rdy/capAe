import { StyleSheet } from 'react-native';
import DesignParams from '../DesignParams';

const Styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#2196F326'
  },
  topActionContainer: {},
  topAction: {
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 5,
  },
  topActionText: {
    fontSize: 18,
    fontWeight: 600,
  },
  newVideoForm: {
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  textInput: {
    backgroundColor: '#fff',
    borderRadius: 5,
    marginVertical: 5,
  },
  filePicker: {
    backgroundColor: '#fff',
    minHeight: 120,
    marginVertical: 10,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filePickerText: {
    color: '#B9B9C3',
  },
  formSubmitButton: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#0065C1',
    marginVertical: 5,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  formSubmitText: {
    textAlign: 'center',
    color: '#fff',
  },
});

export default Styles;
