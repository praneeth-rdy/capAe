import { StyleSheet } from 'react-native';
import DesignParams from '../DesignParams';

const Styles = StyleSheet.create({
  record: {
    margin: 5,
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  recordHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  recordTitle: {
    fontSize: 16,
    fontWeight: 600,
    color: '#5E5873'
  },
  statusContainer: {
    borderRadius: 5,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderWidth: 1,
  },
  inProcessState: {
    backgroundColor: '#FF6D001F',
    borderColor: '#FF6D00',
  },
  doneState: {
    backgroundColor: '#28C76F1F',
    borderColor: '#28C76F',
  },
  errorState: {
    backgroundColor: '#EA54551F',
    borderColor: '#EA5455',
  },
  statusText: {
    fontSize: 12,
    fontWeight: 400,
  },
  inProcessStatusText: {
    color: '#FF6D00',
  },
  doneStatusText: {
    color: '#28C76F',
  },
  errorStatusText: {
    color: '#EA5455',
  },
  recordRuntimeContainer: {},
  recordRuntime: {
    fontSize: 14,
  },
  createdAtContainer: {
    marginTop: 5,
  },
  createdAtText: {
    fontSize: 14,
    lineHeight: 16,
  },
  bottomActionContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  viewInputButton: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    marginVertical: 10,
    marginRight: 5,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#0065C1',
    borderRadius: 6,
  },
  viewInputButtonText: {
    textAlign: 'center',
    color: '#0065C1',
  },
  viewOutputButton: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#0065C1',
    marginVertical: 10,
    marginLeft: 5,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  viewOutputButtonText: {
    textAlign: 'center',
    color: '#fff',
  }
});

export default Styles;
