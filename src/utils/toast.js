import { ToastAndroid } from 'react-native';

export const showToastShort = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
}
