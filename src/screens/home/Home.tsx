import { View, Text, StyleSheet, FlatList, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SvgLocation from '../../components/icons/Location'
import SvgWeather from '../../components/icons/Weather'
import SvgWatch from '../../components/icons/Watch'
import SvgStar from '../../components/icons/Star'
import SvgSave from '../../components/icons/Save'
import { baseNetwork } from '../../network/Api'

export default function Home() {

  const [restaurant, setRestaurant] = useState([])
  
  useEffect(() => {
    const Network = new baseNetwork()

    Network.getAllRestaurant().then(response => setRestaurant(response))

  }, [])

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
        <View style={styles.headerMain}>
          <View style={styles.location}>
            <SvgLocation style={{ marginLeft: 8, width: 20, height: 20 }} />
            <Text style={styles.locationText}>Baku, Azerbaijan</Text>
          </View>
          <View style={styles.weather}>
            <SvgWeather style={{ marginLeft: 5 }} />
            <Text style={styles.weatherText}>+2</Text>
          </View>
        </View>
      }
      {
        <View>
          <FlatList
            data={restaurant}
            renderItem={renderItem}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      }
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
    width: 280,
  },
  imageStyle: {
    width: 280,
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
  },
  headerMain: {
    // marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 40
  },
  location: {
    flexDirection: "row",
    backgroundColor: "#262626",
    width: 260,
    height: 45,
    alignItems: "center",
    gap: 10,
    borderRadius: 12
  },
  locationText: {
    fontSize: 17,
    fontWeight: "400",
    color: "white"
  },
  weatherText: {
    color: "white",
    fontSize: 16,
    fontWeight: "400"
  }
})