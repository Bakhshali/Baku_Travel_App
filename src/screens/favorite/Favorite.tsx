import { useIsFocused } from '@react-navigation/native'
import React, { useContext, useEffect, useState } from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import SvgLocation from '../../components/icons/Location'
import SvgSave from '../../components/icons/Save'
import SvgStar from '../../components/icons/Star'
import SvgWatch from '../../components/icons/Watch'
import { SavedContext } from '../../context/Saved'
import { getUserFavorites, saveUserFavorites } from '../../helpers/userFavorites'

export default function Favorite() {
  const [save, setsave] = useState<any>([])
  const [favorite, setFavorite] = useState<any>([])
  const { savedItem, setSavedItem } = useContext(SavedContext)
  const isFocused = useIsFocused()

  useEffect(() => {
    try {
      if (isFocused) {
        getUserFavorites().then(res => {
          if (res) {
            setSavedItem(res)
            return
          }
          return
        })
      }
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    saveUserFavorites(savedItem).then(res => console.log('Save olundu', res))
  }, [savedItem])

  const deleteSave = (item: any) => {
    const filtered = savedItem.filter(e => e.id !== item.id)
    setSavedItem(filtered)
    console.log('Oldugu ucun dusdu bura')
  }

  const render = ({ item }: any) => {
    return (
      <TouchableOpacity >
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

            <TouchableOpacity onPress={() => deleteSave(item)} >
              <SvgSave
                style={{
                  stroke: "white",
                  width: 20,
                  height: 20,
                  fill: "white"
                }} />
            </TouchableOpacity>

          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={{ backgroundColor: "#1c1c1c", flex: 1 }}>

      <View>
        <View style={{ marginHorizontal: 20, marginTop: 25 }}>
          <Text style={{ fontWeight: "600", fontSize: 25, color: "white" }}>Saved</Text>
        </View>
        <FlatList
          data={savedItem}
          keyExtractor={(item, index) => item + index}
          renderItem={render}
          showsVerticalScrollIndicator={false}
        />
      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
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