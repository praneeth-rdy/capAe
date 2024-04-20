import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import Recorder from '../screens/Recorder';

const Stack = createStackNavigator();

function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={Home}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Recorder"
                component={Recorder}
            />
        </Stack.Navigator>
    );
}

export default HomeStack;