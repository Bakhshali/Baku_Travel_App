import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { FirstLoginProvider } from './src/context/FirstLogin'
import OpenScreen from './src/helpers/OpenScreen'
import Main from './src/navigations/tab/Main'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function App() {

  return (
    <NavigationContainer>
      <FirstLoginProvider>
        <OpenScreen />
        {/* <Main/> */}
      </FirstLoginProvider>
    </NavigationContainer>
  )
}