import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import CategoryList from '../../screens/start/CategoryList'
import Onboarding from '../../screens/start/Onboarding'
import Geolocation from '../../screens/start/Geolocation'
import ProductDetail from '../../screens/detail/ProductDetail'

const Stack = createNativeStackNavigator()

export default function Start() {
    return (
        <Stack.Navigator
            screenOptions={
                { headerShown: false }
            }>
            <Stack.Screen name='OnboardingStackScreen' component={Onboarding} />
            <Stack.Screen name='CategoryListStackScreen' component={CategoryList} />
            <Stack.Screen name='ProductDetailScreen' component={ProductDetail} />
            {/* <Stack.Screen name='GeolocationStackScreen' component={Geolocation} /> */}
        </Stack.Navigator>
    )
}