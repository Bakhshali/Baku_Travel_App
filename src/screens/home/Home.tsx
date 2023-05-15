import { Button, View, Text, StyleSheet, FlatList, Image, ScrollView, TouchableOpacity, PermissionsAndroid, Pressable, SectionList } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SvgLocation from '../../components/icons/Location'
import SvgWeather from '../../components/icons/Weather'
import SvgWatch from '../../components/icons/Watch'
import SvgStar from '../../components/icons/Star'
import SvgSave from '../../components/icons/Save'
import { baseNetwork } from '../../network/Api'
import { useFocusEffect, useIsFocused } from '@react-navigation/native'
import { LatLongContext } from '../../context/UserLocation'
import Geolocations from 'react-native-geolocation-service'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { parse } from 'react-native-svg'
import { getUserCategories } from '../../helpers/userCategoies'
import axios from 'axios'
import { getUserFavorites, saveUserFavorites } from '../../helpers/userFavorites'

export default function Home({ navigation }: any) {

  const [restaurant, setRestaurant] = useState<any>([])
  const [category, setCategory] = useState<any>([])
  const [location, setLocation] = useState<any>([])
  const [address, setAddress] = useState<any>({})
  const [weather, setWeather] = useState<any>({})
  const [favorites, setFavorites] = useState<any>([])

  useEffect(() => {

    const network = new baseNetwork()

    network.getAllRestaurant().then(resp => {
      setRestaurant(resp)
    })

    getUserCategories().then(res => setCategory(res)
    );

  }, [])


  const formatData = () => {
    const formattedData: any = [];
    category.forEach((category: any) => {
      const categoryRestaurants = restaurant.filter((restaurant: any) => restaurant.categoryId === category.id);
      formattedData.push({ category: category.name, data: categoryRestaurants });
    });

    return formattedData;
  };

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Geolocation Permission',
            message: 'Can we access your location?',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        console.log('granted', granted);
        if (granted === 'granted') {
          console.log('You can use Geolocation');
          Geolocations.getCurrentPosition(
            position => {
              setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude });
              axios.get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${position.coords.latitude}&lon=${position.coords.longitude}`)
                .then((res: any) => setAddress(res.data.address),
                  axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&exclude=hourly&appid=0134f46adb6106459889455578b2efc3`)
                    .then((res: any) => {
                      let newObj = {
                        temp: res.data.main.temp,
                        condition: res.data.weather[0].main
                      }
                      setWeather(newObj)
                    }),
                );
            },
            error => {
              // See error code charts below.
              console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
          )
          return true;
        } else {
          console.log('You cannot use Geolocation');
          return false;
        }
      } catch (err) {
        return false;
      }

    };

    requestLocationPermission()
  }, [])

  const addToSave = async (item: any) => {
    if (favorites.length > 0) {
      setFavorites([...favorites, item])
      saveUserFavorites(favorites).then(res => console.log('2.defe save olundu'))
      return
    }
    setFavorites([item])
    saveUserFavorites(favorites).then(res => console.log('ilk defe save olundu'))
  }


  const renderCategory = ({ item }: any) => (
    <View>
      <Text style={{ marginHorizontal: 20, marginTop: 10, fontSize: 17, color: "white" }} >{item.category} nearby</Text>
      <FlatList
        data={item.data}
        horizontal
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );


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
          <View style={styles.favorite} >
            <TouchableOpacity onPress={() => addToSave(item)}>
              <SvgSave
                style={{
                  stroke: "white",
                  width: 20,
                  height: 20,
                  fill: "none"
                }} />

            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={{ backgroundColor: "#1c1c1c", flex: 1 }}>

      <View style={styles.headerMain}>
        <View style={styles.location}>
          <SvgLocation style={{ marginLeft: 8, width: 20, height: 20 }} />
          <Text style={styles.locationText}>{address.city}, {address.country}</Text>
        </View>
        <View style={styles.weather}>
          <SvgWeather style={{ marginLeft: 5 }} />
          <Text style={styles.weatherText}>+{Math.floor(weather.temp)}</Text>
        </View>
      </View>
      <ScrollView horizontal>
        <View>
          <FlatList
            data={formatData()}
            keyExtractor={(item, index) => item.category + index}
            renderItem={renderCategory}
          />
        </View>
      </ScrollView>
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