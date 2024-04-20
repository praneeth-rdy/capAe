import { StyleSheet } from 'react-native';
import DesignParams from '../DesignParams';

const Styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#2196F326'
  },
  uploadSection: {},
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
  errText: {
    borderRadius: 5,
    color: '#EA5455',
    fontSize: 14,
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
  selectedVideoNameContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#B9B9C3',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 5,
  },
  selectedVideoName: {
    color: '#fff',
    marginRight: 5,
    fontSize: 12,
  },
  resetVideoIcon: {
    color: '#fff',
    fontSize: 14,
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
