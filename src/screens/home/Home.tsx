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

export default function Home() {

  const [restaurant, setRestaurant] = useState<any>([])
  const [category, setCategory] = useState<any>([])



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

  //   const { latitude, longitude, setlatitude, setlongitude } = useContext(LatLongContext);
  //   console.log(latitude, longitude)

  //   async function requestLocationPermission() {
  //     try {
  //         const granted = await PermissionsAndroid.request(
  //             PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //             {
  //                 title: "Uygulama Konum Erişimi",
  //                 message:
  //                     "Uygulamanın konumunuza erişmesine izin vermeniz gerekiyor",
  //                 buttonNeutral: "Daha Sonra Sor",
  //                 buttonNegative: "İptal",
  //                 buttonPositive: "Tamam"
  //             }
  //         );
  //         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //             Geolocations.getCurrentPosition(
  //                 position => {
  //                     console.log(position)
  //                     setlatitude(position.coords.latitude)
  //                     setlongitude(position.coords.longitude)
  //                 },
  //                 error => {
  //                     console.log(error.code, error.message);
  //                 },
  //                 { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  //             );

  //         } else {
  //             console.log("Konum erişim izni reddedildi");
  //         }
  //     } catch (err) {
  //         console.warn(err);
  //     }
  // }


  // const [allPalace, setAllPalace] = useState<any>([])
  // const [restaurant, setRestaurant] = useState<any>([])
  // const [hotel, sethotel] = useState<any>([])

  // useEffect(() => {
  //   const Network = new baseNetwork()

  //   Network.getAllRestaurant().then(resp => {
  //     setAllPalace(resp.data)
  //   })

  //   Network.getAllRestaurant().then(response => {
  //     const data = response.filter((c: any) => c.categoryId == 5)
  //     sethotel(data)
  //   })

  //   Network.getAllRestaurant().then(response => {
  //     const data = response.filter((c: any) => c.categoryId == 1)
  //     setRestaurant(data)
  //   })
  // }, [])



  // const addToSave = async () => {
  //   let saves: any = await AsyncStorage.getItem("save")
  //   if (!saves) {
  //     saves = []
  //     let newItems = {
  //       product: allPalace
  //     }
  //     saves.push(newItems)
  //     console.log(saves);

  //     await AsyncStorage.setItem("save", JSON.stringify(saves))
  //   }
  //   else {
  //     let parseSave = JSON.parse(saves)
  //     let wishlistItem = parseSave.find((c: any) => c.product.id == allPalace.id)
  //     if (wishlistItem) {
  //       await AsyncStorage.setItem("save", JSON.stringify(parseSave));
  //     }
  //     else {
  //       let wishlistItem = {
  //         product: allPalace,
  //       }
  //       parseSave.push(wishlistItem);

  //       await AsyncStorage.setItem('save', JSON.stringify(parseSave));
  //     }

  //   }

  // }



  // const goToDetail = (id:any)=>{
  //   navigation.navigate("ProductDetail",{id:id})
  // }



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
            <TouchableOpacity>
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
          <Text style={styles.locationText}>Baku, Azerbaijan</Text>
        </View>
        <View style={styles.weather}>
          <SvgWeather style={{ marginLeft: 5 }} />
          <Text style={styles.weatherText}>+2</Text>
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