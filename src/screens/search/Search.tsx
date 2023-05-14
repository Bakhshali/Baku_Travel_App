import { View, Text, StyleSheet, FlatList, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SvgLocation from '../../components/icons/Location'
import SvgWeather from '../../components/icons/Weather'
import SvgWatch from '../../components/icons/Watch'
import SvgStar from '../../components/icons/Star'
import SvgSave from '../../components/icons/Save'
import SvgSearch from '../../components/icons/Search'
import { SearchItem } from '../../components/icons'
import SvgRestaurant from '../../components/icons/Restaurant'
import { baseNetwork } from '../../network/Api'
import { FavoriteCategoryContext } from '../../context/FavoriteCategory'
import { getUserCategories } from '../../helpers/userCategoies'

export default function Home() {
  const [restaurant, setRestaurant] = useState<any>([])
  const [category, setCategory] = useState([])
  const [defaultFavCategory, setdefaultFavCategory] = useState([])

  const {favoriteCategory, setFavoriteCategory} = useContext(FavoriteCategoryContext)

  useEffect(() => {
    const Network = new baseNetwork()

    Network.getAllCategory().then(response => setCategory(response))
    getUserCategories().then(res => setdefaultFavCategory(res))

  }, [])

  useEffect(() => {
    const Network = new baseNetwork()
    Network.getAllRestaurant().then((response: []) => {
        response.forEach((res: any) => {
        defaultFavCategory.forEach((e: any) => {
          if (res.categoryId == e.id) {
              setRestaurant([...restaurant, res])
          }
        })
      })
    })
    


  }, [])

  const search = (value: string) => {
    restaurant.filter((q: { name: string; }) => q.name.toLowerCase().includes(value.toLowerCase()));
  }

  const renderCategory = ({ item }: any) => {
    const isExist = defaultFavCategory.find((e: any) => e.id == item.id)
    return (
      isExist ? <TouchableOpacity>
        <View style={{ backgroundColor: '#E0783E' ,marginLeft:20, marginTop: 18, borderWidth:1,borderColor:"#404040", padding: 5 ,borderRadius:7}}>
          <View style={{ flexDirection: "row", gap: 5,paddingRight:10 }}>
            <SvgRestaurant />
            <Text style={{ color: "white" }} >{item.name}</Text>
          </View>
        </View>
      </TouchableOpacity> : <TouchableOpacity>
        <View style={{ marginLeft:20, marginTop: 18, borderWidth:1,borderColor:"#404040", padding: 5 ,borderRadius:7}}>
          <View style={{ flexDirection: "row", gap: 5,paddingRight:10 }}>
            <SvgRestaurant />
            <Text style={{ color: "white" }} >{item.name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  const renderItem = ({ item }: any) => {
    return (
      <TouchableOpacity>
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
          <View style={styles.favorite} >
            <SvgSave
              style={{
                stroke: "white",
                width: 20,
                height: 20,
                fill: "none"
              }} />

          </View>
        </View>
      </TouchableOpacity>
    )
  }



  return (
    <SafeAreaView style={{ backgroundColor: "#1c1c1c", flex: 1 }}>
      {
        <View style={styles.input}>
          <TextInput onChangeText={search} placeholderTextColor="#B9B9B9" style={styles.inputStyle} placeholder='Search by items' />
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
            data={restaurant}
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