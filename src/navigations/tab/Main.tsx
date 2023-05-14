import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../../screens/home/Home'
import Search from '../../screens/search/Search'
import Favorite from '../../screens/favorite/Favorite'
import SvgHome from '../../components/icons/Home'
import SvgSearch from '../../components/icons/Search'
import SvgSave from '../../components/icons/Save'

const Tab = createBottomTabNavigator()

export default function Main() {
    return (
        <Tab.Navigator screenOptions={
            {
                headerShown: false
            }
        }>
            <Tab.Screen name='HomeTabScreen' component={Home} options={{
                tabBarStyle: {
                    backgroundColor: "#1C1C1C"
                },
                tabBarShowLabel: false,
                tabBarIcon: ({ focused }) => (
                    <SvgHome style={{
                        stroke: focused ? "#E0783E" : "#494949",
                    }} />
                )
            }} />
            <Tab.Screen name='SearchTabScreen' component={Search} options={{
                tabBarStyle: {
                    backgroundColor: "#1C1C1C"
                },
                tabBarShowLabel: false,
                tabBarIcon: ({ focused }) => (
                    <SvgSearch style={{
                        stroke: focused ? "#E0783E" : "#494949",
                    }} />
                )
            }} />
            <Tab.Screen name='FavoriteTabScreen' component={Favorite} options={{
                tabBarStyle: {
                    backgroundColor: "#1C1C1C"
                },
                tabBarShowLabel: false,
                tabBarIcon: ({ focused }) => (
                    <SvgSave style={{
                        stroke: focused ? "#E0783E" : "#494949",
                        width:28,
                        height:28,
                        fill:"none"
                    }} />
                )
            }} />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    mainIcons: {
        
    }
})