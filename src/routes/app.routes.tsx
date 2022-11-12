import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Cart } from '../screens/Cart';
import { CreditCard } from '../screens/CreditCard';
import { Detail } from '../screens/Detail';
import { Home } from '../screens/Home';

const Stack = createNativeStackNavigator();

export function AppRoutes() {
    return <Stack.Navigator screenOptions={{headerShown: false, }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="CreditCard" component={CreditCard} />
    </Stack.Navigator>
}
