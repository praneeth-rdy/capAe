import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
// import Recorder from '../screens/Recorder';

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
            {/* <Stack.Screen
                name="Recorder"
                component={Recorder}
                options={{
                    headerStyle: {
                        backgroundColor: '#2196F326',
                    },
                    headerTintColor: '#0065C1',
                    headerTitleStyle: {
                        color: '#0065C1',
                        fontSize: 20,
                    }
                }}
            /> */}
        </Stack.Navigator>
    );
}

export default HomeStack;