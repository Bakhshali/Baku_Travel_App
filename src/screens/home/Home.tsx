import { View, Text, StyleSheet, FlatList, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SvgLocation from '../../components/icons/Location'
import SvgWeather from '../../components/icons/Weather'
import SvgWatch from '../../components/icons/Watch'
import SvgStar from '../../components/icons/Star'
import { TouchableOpacity } from 'react-native/Libraries/Components/Touchable/TouchableOpacity'

const product: any = [
  {
    "id": "1",
    "name": "Center Hotel",
    "categoryId": "1",
    "startDate": "09:00",
    "endDate": "22:00",
    "phone": "+994 01 234 56 78",
    "address": "Nizami küçəsi, 203B",
    "week": "Mon - Fri",
    "rate": "4.5",
    "km": 6,
    "lat": "40.371572",
    "long": "49.837411",
    "imageUrl": "https://images.adsttc.com/media/images/5e4c/1025/6ee6/7e0b/9d00/0877/large_jpg/feature_-_Main_hall_1.jpg?1582043123"
  },
  {
    "id": "2",
    "name": "Center Hotel",
    "categoryId": "1",
    "startDate": "09:00",
    "endDate": "22:00",
    "phone": "+994 01 234 56 78",
    "address": "Nizami küçəsi, 203B",
    "week": "Mon - Fri",
    "rate": "4.5",
    "km": 6,
    "lat": "40.371572",
    "long": "49.837411",
    "imageUrl": "https://images.adsttc.com/media/images/5e4c/1025/6ee6/7e0b/9d00/0877/large_jpg/feature_-_Main_hall_1.jpg?1582043123"
  },
  // {
  //   "id": "2",
  //   "name": "Fairmont Baku, Flame Towers",
  //   "categoryId": "1",
  //   "rate": "4.7",
  //   "lat": "40.366316",
  //   "long": "49.840805",
  //   "imageUrl": "https://example.com/fairmont-baku-image.jpg"
  // },
  // {
  //   "id": "3",
  //   "name": "Hilton Baku",
  //   "categoryId": "1",
  //   "rate": "4.4",
  //   "lat": "40.372045",
  //   "long": "49.837677",
  //   "imageUrl": "https://example.com/hilton-baku-image.jpg"
  // },
  // {
  //   "id": "4",
  //   "name": "Four Seasons Hotel Baku",
  //   "categoryId": "1",
  //   "rate": "4.6",
  //   "lat": "40.366759",
  //   "long": "49.842233",
  //   "imageUrl": "https://example.com/four-seasons-baku-image.jpg"
  // },
  // {
  //   "id": "5",
  //   "name": "JW Marriott Absheron Baku",
  //   "categoryId": "1",
  //   "rate": "4.3",
  //   "lat": "40.370033",
  //   "long": "49.841015",
  //   "imageUrl": "https://example.com/jw-marriott-baku-image.jpg"
  // },
  // {
  //   "id": "6",
  //   "name": "Nizami Restaurant",
  //   "categoryId": "2",
  //   "rate": "4.2",
  //   "lat": "40.365262",
  //   "long": "49.834723",
  //   "imageUrl": "https://example.com/nizami-restaurant-image.jpg"
  // },
  // {
  //   "id": "7",
  //   "name": "Firuze Restaurant",
  //   "categoryId": "2",
  //   "rate": "4.6",
  //   "lat": "40.373144",
  //   "long": "49.837021",
  //   "imageUrl": "https://example.com/firuze-restaurant-image.jpg"
  // },
  // {
  //   "id": "8",
  //   "name": "Mangal Steakhouse",
  //   "categoryId": "2",
  //   "rate": "4.5",
  //   "lat": "40.371518",
  //   "long": "49.835846",
  //   "imageUrl": "https://example.com/mangal-steakhouse-image.jpg"
  // },
  // {
  //   "id": "9",
  //   "name": "Sumakh Restaurant",
  //   "categoryId": "2",
  //   "rate": "4.3",
  //   "lat": "40.369855",
  //   "long": "49.842165",
  //   "imageUrl": "https://example.com/sumakh-restaurant-image.jpg"
  // },
  // {
  //   "id": "10",
  //   "name": "Shirvanshah Museum Restaurant",
  //   "categoryId": "2",
  //   "rate": "4.7",
  //   "lat": "40.364159",
  //   "long": "49.852235",
  //   "imageUrl": "https://example.com/sumakh-restaurant-image.jpg"
  // },
  // {
  //   "id": "11",
  //   "name": "National Museum of History of Azerbaijan",
  //   "categoryId": "3",
  //   "rate": "4.7",
  //   "lat": "40.364166",
  //   "long": "49.851830",
  //   "imageUrl": "https://example.com/national-museum-azerbaijan-image.jpg"
  // },
  // {
  //   "id": "12",
  //   "name": "Heydar Aliyev Center",
  //   "categoryId": "3",
  //   "rate": "4.6",
  //   "lat": "40.381277",
  //   "long": "49.829972",
  //   "imageUrl": "https://example.com/heydar-aliyev-center-image.jpg"
  // },
  // {
  //   "id": "13",
  //   "name": "Carpet Museum",
  //   "categoryId": "3",
  //   "rate": "4.4",
  //   "lat": "40.368775",
  //   "long": "49.837244",
  //   "imageUrl": "https://example.com/carpet-museum-image.jpg"
  // },
  // {
  //   "id": "14",
  //   "name": "Museum of Modern Art",
  //   "categoryId": "3",
  //   "rate": "4.5",
  //   "lat": "40.364812",
  //   "long": "49.833597",
  //   "imageUrl": "https://example.com/museum-modern-art-image.jpg"
  // },
  // {
  //   "id": "15",
  //   "name": "Palace of the Shirvanshahs",
  //   "categoryId": "3",
  //   "rate": "4.8",
  //   "lat": "40.368858",
  //   "long": "49.846125",
  //   "imageUrl": "https://example.com/palace-shirvanshahs-image.jpg"
  // }
]

const category: any = [
  {
    "name": "Hotel",
    "id": "1"
  },
  {
    "name": "Restaurant",
    "id": "2"
  },
  {
    "name": "Museum",
    "id": "3"
  }
]

export default function Home() {

  // const goToDetail(()=>{

  // })

  const renderItem = ({ item }: any) => {
    return (

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
                <Text style={styles.textDetailStyle}>{item.km}</Text>
              </View>
              <View style={{ flexDirection: "row", gap: 7 }}>
                <SvgWatch />
                <Text style={styles.textDetailStyle}>{item.startDate}-{item.endDate}</Text>
              </View>
              <View style={{ flexDirection: "row", gap: 7 }}>
                <SvgStar />
                <Text style={styles.textDetailStyle}>{item.rate}</Text>
              </View>
            </View>
          </View>
        </View>
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
            data={product}
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
  textDetailStyle: {
    fontSize: 12,
    fontWeight: "500",
    color: "white"
  },
  mainDetail: {
    flexDirection: "row",
    gap: 20,
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
    width: 270,
  },
  imageStyle: {
    width: 270,
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