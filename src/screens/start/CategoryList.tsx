import { View, Text, FlatList, Image, Dimensions, StyleSheet } from 'react-native'
import React from 'react'

const data = [
  {
    id: 1,
    name: 'Restaurant',
    image: require('../../assets/images/onboarding/Hospital.png')
  },
  {
    id: 2,
    name: 'Sight',
    image: require('../../assets/images/onboarding/Hospital.png')
  },
  {
    id: 3,
    name: 'Shop',
    image: require('../../assets/images/onboarding/Hospital.png')
  },
  {
    id: 4,
    name: 'Museum',
    image: require('../../assets/images/onboarding/Hospital.png')
  },
  {
    id: 8,
    name: 'Restaurant',
    image: require('../../assets/images/onboarding/Hospital.png')
  },
  {
    id: 7,
    name: 'Sight',
    image: require('../../assets/images/onboarding/Hospital.png')
  },
  {
    id: 6,
    name: 'Shop',
    image: require('../../assets/images/onboarding/Hospital.png')
  },
  {
    id: 5,
    name: 'Museum',
    image: require('../../assets/images/onboarding/Hospital.png')
  }
]

export default function CategoryList() {

  const renderItem = ({ item }: any) => {
    return (
      <View style={styles.item}>
        <Image style={{width: 36, height: 44, marginBottom: 12}} source={item.image} />
        <Text style={styles.itemText}>{item.name}</Text>
      </View>
    )
  }


  return (
    <View style={{ flex: 1, backgroundColor: '#1C1C1C' }}>
      <View style={{ marginTop: 52, marginHorizontal: 16 }}>
        <Text style={{ fontWeight: '600', fontSize: 20, color: '#FFFFFF', fontFamily: 'Outfit-Bold' }}>Choose your interest</Text>
        <Text style={{ color: '#B9B9B9', marginTop: 8, fontFamily: 'Outfit-Regular' }}>Select at least 2 options that we can suggest you on the home page.</Text>
      </View>
      <View style={styles.container}>
        <FlatList
          data={data}
          style={styles.container}
          renderItem={renderItem}
          numColumns={2}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
  },
  item: {
    borderWidth: 1,
    borderColor: '#494949',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 7,
    height: Dimensions.get('window').width / 3, // approximate a square
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    color: '#fff',
    fontFamily: 'Outfit-Regular'
  },
})