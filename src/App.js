import React from 'react';
import {
    Text,
    View,
} from 'react-native';
import Recorder from './screens/Recorder';
import Home from './screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import HomeStack from './navigation/HomeStack';

function App() {
    return (
        <NavigationContainer>
            <HomeStack />
        </NavigationContainer>
    )
}

export default App;