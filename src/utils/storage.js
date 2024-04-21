import AsyncStorage from '@react-native-async-storage/async-storage';
import { showToastShort } from './toast';

export const storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
        console.log('Data stored successfully!');
    } catch (error) {
        console.error('Error storing data:', error);
    }
};

export const retrieveData = async (key) => {
    let value = null;
    try {
        value = await AsyncStorage.getItem(key);
        if (value !== null) {
            console.log('Retrieved data:', value);
        } else {
            console.log('No data found for key:', key);
            if (key == 'server-ip-address') {
                showToastShort('Error retrieving the ip address');
                // console.error('Error retrieving the ip address');
            }
        }
    } catch (error) {
        console.error('Error retrieving data:', error);
    }

    return value;
};