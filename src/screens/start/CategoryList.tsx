import React, { useContext, useState } from 'react'
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { FirstLoginContext } from '../../context/FirstLogin'
import { saveUserCategories } from '../../helpers/userCategoies'

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

export default function CategoryList({navigation}: any) {

  const [category, setCategory] = useState<any>([])
  const { firstLogin, setFirstLogin } = useContext(FirstLoginContext);

  const addToFavoriteCategory = (item: any) => {
    const isExistCategory = category.find((e: any) => e.id == item.id)
    if (!isExistCategory) {
      setCategory([...category, item])
    } else {
      const otherProduct = category.filter((e: any) => e.id !== item.id)
      setCategory(otherProduct)
    }
  }

  const next = () => {
    if (category.length > 0) {
        saveUserCategories(category)
            .then(res => {
                setFirstLogin(false)
            })
    }
    else {
        setFirstLogin(true)
    }

}

  const renderItem = ({ item }: any) => {
    const isExistCategory = category.find((e: any) => e.id == item.id)
    if (isExistCategory) {
      return (
        <TouchableOpacity style={[styles.item, {borderColor: 'white',}]} onPress={() => addToFavoriteCategory(item)}>
          <Image style={{ width: 36, height: 44, marginBottom: 12 }} source={item.image} />
          <Text style={styles.itemText}>{item.name}</Text>
        </TouchableOpacity>
      )
    }
    return (
      <TouchableOpacity style={[styles.item, {borderColor: '#494949',}]} onPress={() => addToFavoriteCategory(item)}>
      <Image style={{ width: 36, height: 44, marginBottom: 12 }} source={item.image} />
      <Text style={styles.itemText}>{item.name}</Text>
    </TouchableOpacity>
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
          showsVerticalScrollIndicator={false}
          numColumns={2}
        />
      </View>
      <TouchableOpacity style={styles.btn} onPress={next}>
        <Text style={styles.btnText}>Next</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 12,
    marginBottom: 12
  },
  item: {
    borderWidth: 1,
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
    fontSize: 15,
    fontFamily: 'Outfit-Regular'
  },
  btn: {
    backgroundColor: '#018CF1',
    marginHorizontal: 16,
    marginBottom: 46,
    borderRadius: 8,

  },
  btnText: {
    marginVertical: 16,
    fontFamily: 'Outfit-Regular',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  }
})