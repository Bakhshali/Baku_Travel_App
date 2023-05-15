import { View, Text, StyleSheet, FlatList, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SvgLocation from '../../components/icons/Location'
import SvgWeather from '../../components/icons/Weather'
import SvgWatch from '../../components/icons/Watch'
import SvgStar from '../../components/icons/Star'
import SvgSave from '../../components/icons/Save'
import SvgSearch from '../../components/icons/Search'
import { SearchItem } from '../../components/icons'
import SvgRestaurant from '../../components/icons/Restaurant'
import { useIsFocused } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getUserFavorites } from '../../helpers/userFavorites'

export default function Favorite() {
  const [save, setsave] = useState<any>([])
  const isFocused = useIsFocused()

  useEffect(() => {
    try {
      if (isFocused) {
        getUserFavorites().then(res => {
          if(res){
            setsave(res)
            return
          }
          return
        })
      }
    } catch (error) {
      console.log(error)
    }
  }, [isFocused])

  const render = ({ item }: any) => {
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
                fill: "white"
              }} />

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
          data={save}
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