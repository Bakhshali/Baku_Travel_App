import { View, Text ,Image,TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import { baseNetwork } from '../../network/Api'
import SvgStar from '../../components/icons/Star'
import SvgWatch from '../../components/icons/Watch'
import SvgPhone from '../../components/icons/Phone'
import SvgLocation from '../../components/icons/Location'

const ProductDetail = ({route}:any) => {

    const [detail, setdetail] = useState<any>([])

    useEffect(() => {
      
        const network = new baseNetwork
        // const {id} = route.params

        network.getAllRestaurant().then(resp=>{
            setdetail(resp.data)
          })
    }, [])
    

  return (
    <View>
          <View style={{backgroundColor: '#1C1C1C', flex: 1}}>
      <View style={{alignItems: 'center',marginTop:20,marginHorizontal:20}}>
      <Image source={{uri:detail?.image}} style={{height:210,width:350,borderTopLeftRadius:10,borderTopRightRadius:10}}/>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 20,
          marginTop: 10,
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 20, color: 'white',fontWeight:"600",fontFamily:"SF-Pro-Text-Bold"}}>Museum in</Text>
        <View style={{flexDirection:"row",alignItems:"center",}}>
          <SvgStar width={14} />
          <Text style={{color: 'white',marginLeft:5}}>4.3</Text>
        </View>
      </View>
      <View style={{marginLeft: 20, marginTop: 20}}>
        <View>
          <Text style={{fontSize: 16, color: 'white',fontWeight:"500",fontFamily:"SF-Pro-Text-Bold"}}>Information</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center',marginTop:10}}>
          <SvgWatch width={14} height={14} />
          <Text style={{marginLeft: 5,color:"#B9B9B9",fontFamily:"SF-Pro-Text-Bold"}}> Mon - Fri, 08:00 - 23:00</Text>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center',marginTop:5}}>
          <SvgPhone width={14} height={14} />
          <Text style={{marginLeft: 5,color:"#B9B9B9",fontFamily:"SF-Pro-Text-Bold"}}>+994 01 234 56 78</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center',marginTop:5}}>
          <SvgLocation width={14} height={14} />
          <Text style={{marginLeft: 5,color:"#B9B9B9",fontFamily:"SF-Pro-Text-Bold"}}>Nizami küçəsi, 203B</Text>
        </View>
      </View>
      <View style={{marginLeft: 20, marginTop: 20}}>
        <Text style={{fontSize: 16, color: 'white',fontFamily:"SF-Pro-Text-Bold"}}>Map</Text>
      </View>
      {/* <View style={{alignItems: 'center'}}>
        <SvgMap width={350} height={175} />
      </View> */}
      <View style={{alignItems: 'center', marginTop: 10}}>
        <TouchableOpacity>
          <View
            style={{
              width: 350,
              backgroundColor: '#018CF1',
              alignItems: 'center',
              height: 40,
              justifyContent: 'center',
              borderRadius: 10,
            }}>
            <Text style={{color: 'white',fontWeight:"500",fontFamily:"Outfit-Black"}}>Go to Map</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
    </View>
  )
}

export default ProductDetail