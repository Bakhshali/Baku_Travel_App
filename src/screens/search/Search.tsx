import React, { useContext, useEffect, useState } from 'react'
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SearchItem } from '../../components/icons'
import SvgLocation from '../../components/icons/Location'
import SvgRestaurant from '../../components/icons/Restaurant'
import SvgSave from '../../components/icons/Save'
import SvgStar from '../../components/icons/Star'
import SvgWatch from '../../components/icons/Watch'
import { baseNetwork } from '../../network/Api'
import { SavedContext } from '../../context/Saved'
import { saveUserFavorites } from '../../helpers/userFavorites'

export default function Home({ navigation }: any) {
  const [restaurant, setRestaurant] = useState<any>([])
  const [category, setCategory] = useState([])
  const [searchText, setSearchText] = useState<String>('')
  const [filteredRestaurant, setFilteredRestaurant] = useState<any>([])
  const [selectedCategory, setSelecetedCategory] = useState<any>([])
  const { savedItem, setSavedItem } = useContext(SavedContext)

  useEffect(() => {
    const Network = new baseNetwork()

    Network.getAllCategory().then(response => {
      setCategory(response)
    })
    Network.getAllRestaurant().then(response => {
      setRestaurant(response)
      setFilteredRestaurant(response)
    })

  }, [])

  useEffect(() => {
    try {
      const filteredData = restaurant.filter((q: any) => q.name.toLowerCase().includes(searchText.toLowerCase()));
      setFilteredRestaurant(filteredData)
    } catch (error) {
      console.log(error)
    }
  }, [searchText])

  useEffect(() => {
    saveUserFavorites(savedItem).then(res => console.log('Save olundu', res))
  }, [savedItem])

  const addToSave = (item: any) => {
    const isExist = savedItem.find(e => e.id == item.id)
    if (!isExist) {
      setSavedItem([...savedItem, item])
      console.log('Olmadigi ucun dusdu bura')
      return
    }
    const filtered = savedItem.filter(e => e.id !== item.id)
    setSavedItem(filtered)
    console.log('Oldugu ucun dusdu bura')
  }

  const addToSelecetedCategory = (item: any) => {
    try {
      setSelecetedCategory([item])
      const data = restaurant.filter((e: any) => e.categoryId == item.id)
      setFilteredRestaurant(data)
    } catch (error) {
      console.log(error)
    }
  }

  const renderCategory = ({ item }: any) => {
    const isExist = selectedCategory.find((e: any) => e.id == item.id)
    return (
      isExist ? <TouchableOpacity onPress={() => addToSelecetedCategory(item)}>
        <View style={{ backgroundColor: '#E0783E', marginLeft: 15, marginTop: 18, borderWidth: 1, borderColor: "#404040", padding: 5, borderRadius: 7 }}>
          <View style={{ flexDirection: "row", gap: 5, paddingRight: 10 }}>
            <SvgRestaurant />
            <Text style={{ color: "white" }} >{item.name}</Text>
          </View>
        </View>
      </TouchableOpacity> : <TouchableOpacity onPress={() => addToSelecetedCategory(item)}>
        <View style={{ marginLeft: 15, marginTop: 18, marginBottom: 10, borderWidth: 1, borderColor: "#404040", padding: 5, borderRadius: 7 }}>
          <View style={{ flexDirection: "row", gap: 5, paddingRight: 10 }}>
            <SvgRestaurant />
            <Text style={{ color: "white" }} >{item.name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  const renderItem = ({ item }: any) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate("ProductDetail", item)}>
        <View style={styles.card} >
          <View>
            <Image style={styles.imageStyle}
              source={{ uri: item.imageUrl }}
            />
          </View>
          <View style={styles.cardDetail}>
            <Text style={{ color: "white", fontSize: 20, fontWeight: "600" }}>{item.name}</Text>
            <View style={styles.mainDetail}>
              <View style={{ flexDirection: "row", gap: 7 }}>
                <SvgLocation style={{ width: 16, height: 18 }} />
                <Text style={styles.textDetailStyle}>{item.km} km</Text>
              </View>
              <View style={{ flexDirection: "row", gap: 7 }}>
                <SvgWatch />
                <Text style={styles.textDetailStyle}>{item.startDate} - {item.endDate}</Text>
              </View>
              <View style={{ flexDirection: "row", gap: 7 }}>
                <SvgStar />
                <Text style={styles.textDetailStyle}>{item.rate}</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.favorite} onPress={() => addToSave(item)}>
            <SvgSave
              style={{
                stroke: "white",
                width: 20,
                height: 20,
                fill: "none"
              }} />

          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={{ backgroundColor: "#1c1c1c", flex: 1 }}>
      {
        <View style={styles.input}>
          <TextInput onChangeText={setSearchText} placeholderTextColor="#B9B9B9" style={styles.inputStyle} placeholder='Search by items' />
          <SearchItem style={styles.inputSearch} />
        </View>

      }
      {
        <View>
          <FlatList
            data={category}
            horizontal
            renderItem={renderCategory}
            showsHorizontalScrollIndicator={false}

          />
        </View>
      }
      {
        <View>
          <FlatList
            data={filteredRestaurant}
            renderItem={renderItem}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  inputStyle: {
    paddingLeft: 40,
    color: "#B9B9B9"
  },
  inputSearch: {
    position: "absolute",
    top: 15,
    left: 12
  },
  input: {
    backgroundColor: "#262626",
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 13,

  },
  favorite: {
    width: 40,
    height: 40,
    backgroundColor: "#1C1C1C",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    position: "absolute",
    right: 10,
    top: 10
  },
  textDetailStyle: {
    fontSize: 13,
    fontWeight: "500",
    color: "white"
  },
  mainDetail: {
    flexDirection: "row",
    gap: 30,
    marginTop: 10
  },
  cardDetail: {
    // backgroundColor:"red",
    padding: 10,
    borderWidth: 1,
    borderColor: "#353535",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },

  card: {
    marginHorizontal: 20,
    marginTop: 20,
    width: 350,
  },
  imageStyle: {
    width: 350,
    height: 240,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  categoryName: {
    color: "white"
  },
  weather: {
    backgroundColor: "#262626",
    width: 75,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderRadius: 12,
  }
})