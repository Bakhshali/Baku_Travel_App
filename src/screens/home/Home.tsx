import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, PermissionsAndroid, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Geolocations from 'react-native-geolocation-service'
import { SafeAreaView } from 'react-native-safe-area-context'
import SvgLocation from '../../components/icons/Location'
import SvgSave from '../../components/icons/Save'
import SvgStar from '../../components/icons/Star'
import SvgWatch from '../../components/icons/Watch'
import { getUserCategories } from '../../helpers/userCategoies'
import { saveUserFavorites } from '../../helpers/userFavorites'
import { baseNetwork } from '../../network/Api'
import { SavedContext } from '../../context/Saved'
import { getUserFavorites } from '../../helpers/userFavorites'
import Loading from '../../components/Load'
import { LocationContext } from '../../context/Location'

export default function Home({ navigation }: any) {

  const [loadingWeather, setWeatherLoading] = useState<Boolean>(true)
  const [loadingRestaurant, setLoadingRestaurant] = useState<Boolean>(true)
  const [restaurant, setRestaurant] = useState<any>([])
  const [category, setCategory] = useState<any>([])
  const [address, setAddress] = useState<any>({})
  const [weather, setWeather] = useState<any>({})
  const { savedItem, setSavedItem } = useContext(SavedContext)
  const { location, setLocation } = useContext<any>(LocationContext)

  useEffect(() => {

    const network = new baseNetwork()

    network.getAllRestaurant().then(resp => {
      setRestaurant(resp)
      setLoadingRestaurant(false)
    })

    getUserCategories().then(res => setCategory(res));

  }, [])


  const formatData = () => {
    try {
      const formattedData: any = [];
      category.forEach((category: any) => {
        const categoryRestaurants = restaurant.filter((restaurant: any) => restaurant.categoryId === category.id);
        formattedData.push({ category: category.name, data: categoryRestaurants });
      });

      return formattedData;
    } catch (error) {
      console.log(error)
    }
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
              console.log(location)
              axios.get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${position.coords.latitude}&lon=${position.coords.longitude}`)
                .then((res: any) => setAddress(res.data.address));

              axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&exclude=hourly&appid=0134f46adb6106459889455578b2efc3`)
                .then((res: any) => {
                  setWeather({ temp: res.data.main.temp, condition: res.data.weather[0].main, weatherIcon: res.data.weather[0].icon })
                })
              setWeatherLoading(false)
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

  useEffect(() => {
    saveUserFavorites(savedItem).then(res => console.log('Save olundu', res))
  }, [savedItem])

  const addToSave = (item: any) => {
    const isExist = savedItem.find(e => e.id == item.id)
    console.log('isExist', isExist)
    if (!isExist) {
      setSavedItem([...savedItem, item])
      console.log('Olmadigi ucun dusdu bura')
      return
    }
    const filtered = savedItem.filter(e => e.id !== item.id)
    setSavedItem(filtered)
    console.log('Oldugu ucun dusdu bura')
  }

  const renderCategory = ({ item }: any) => (
    <View>
      <Text style={{ marginHorizontal: 20, marginTop: 5, fontSize: 18, color: "white" ,fontFamily:"Outfit-Bold"}} >{item.category} nearby</Text>
      <FlatList
        data={item.data}
        horizontal
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );

  const renderItem = ({ item }: any) => {

    function distance(lat1: number, lon1: number, lat2: number, lon2: number) {
      const R = 6371; // Earth's radius in km
      const dLat = deg2rad(lat2 - lat1);
      const dLon = deg2rad(lon2 - lon1);
      console.log(dLat, dLon)
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const d = R * c; // Distance in km
      return d.toFixed(2);
    }

    function deg2rad(deg: number) {
      return deg * (Math.PI / 180);
    }
    const distanceInKm = distance(item.lat, item.long, location.latitude, location.longitude);

    let favorite = savedItem.find((c: any) => c.id == item.id)
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
                <Text style={styles.textDetailStyle}>{distanceInKm} km</Text>
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
              {
                favorite ?
                  <SvgSave
                    style={{
                      stroke: "white",
                      width: 20,
                      height: 20,
                      fill: "white"

                    }} />
                  :
                  <SvgSave style={{
                    stroke: "white",
                    width: 20,
                    height: 20,
                    fill: "none"

                  }} />
              }

            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  const weatherIcon = () => {
    switch (weather.condition) {
      case "Clouds":
        return "☁️"
        break;
      case "Clear":
        return "☀️"
        break;
      case "Rain":
        return "🌧️"
        break;
      case "Drizzle":
        return "🌦️"
        break;
      case "Snow":
        return "❄️"
        break;
      default:
        break;
    }
  }

  return (
    loadingRestaurant || loadingWeather ? <Loading /> : <SafeAreaView style={{ backgroundColor: "#1c1c1c", flex: 1 }}>

      <View style={styles.headerMain}>
        <View style={styles.location}>
          <SvgLocation style={{ marginLeft: 8, width: 20, height: 20 }} />
          <Text style={styles.locationText}>{address.city}, {address.country}</Text>
        </View>
        <View style={styles.weather}>
          <Text style={{fontSize:17}} >{weatherIcon()}</Text>
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
    gap: 25,
  },
  cardDetail: {
    // backgroundColor:"red",
    padding: 10,
    borderWidth: 1,
    borderColor: "#353535",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginBottom:20
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
    width: 80,
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"space-evenly",
    borderRadius: 12,
  },
  headerMain: {
    // marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 30,
    marginBottom: 10
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