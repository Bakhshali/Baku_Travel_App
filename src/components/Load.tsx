import { View, Text, SafeAreaView, ActivityIndicator, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { SettingsContext } from '../context/SettingsContext'

export default function Loading() {
  const { darkMode, setDarkMode } = useContext<any>(SettingsContext)

  return (
    <SafeAreaView style={[styles.container, {backgroundColor:darkMode?"black":"white"}]}>
      <ActivityIndicator size="large" />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})