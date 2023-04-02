import {Image, StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import React,{useLayoutEffect} from 'react'
import { useNavigation } from "@react-navigation/native";
import Home from '../../assets/icons/homeOrg.png' 
import Find from '../../assets/icons/searchOrg.png' 
import Settings from '../../assets/icons/settingsOrg.png' 
import Chat from '../../assets/icons/chatOrg.png' 
import Add from '../../assets/icons/addCol.png' 
import Done from '../../assets/icons/done.png' 


// color= #f1735b
// color= #8accb4

const BottomBar = () => {
    const navigation = useNavigation();
    // const [changeImg, setChangeImg] = useState("Add")

    useLayoutEffect(() => {
        navigation.setOptions({
          headerShown: false,
        });
      }, []);

    const press=()=>{
      navigation.navigate("AddNote");
      // setChangeImg("Done");
    }
  return (
    <View className="justify-center flex-row align-middle px-20" style={styles.container}>
        <TouchableOpacity className="justify-center"  style={{width:"33%"}} onPress={()=>navigation.navigate("Home")}>
          <Image source={Home} style={styles.img}/>
          <Text style={styles.title}>HOME</Text>
        </TouchableOpacity>
        <TouchableOpacity className="justify-center"  style={{width:"33%"}} >
          <Image source={Find} style={styles.img}/>
          <Text style={styles.title}>FIND</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{margin:"2%"}} onPress={press}>
          <Image source={Add} style={styles.add}/>
        </TouchableOpacity>
        {/* <View style={{width:"10%"}}></View> */}
        <TouchableOpacity className="justify-center"  style={{width:"33%"}} onPress={()=>navigation.navigate("Setting")}>
          <Image source={Settings} style={styles.img}/>
          <Text style={styles.title}>SETTINGS</Text>
        </TouchableOpacity>
        <TouchableOpacity className="justify-center"  style={{width:"33%"}} >
          <Image source={Chat} style={styles.img}/>
          <Text style={styles.title}>CHAT</Text>
        </TouchableOpacity>
    </View>
  )
}

export default BottomBar

const styles = StyleSheet.create({
    container: {
        height: 80,
        width: "90%",
        backgroundColor: "white",
        alignSelf: "center",
        marginBottom:"5%",
        borderRadius: 15,
        position:"absolute",
        bottom:0,
    },
    add: {
        height:undefined,
        width:70,
        aspectRatio:1,
        position: "relative",
        bottom: "55%",
    },  
    img:{
        height:undefined,
        width:"40%",
        aspectRatio:1,
        alignSelf:"center"
    },
    title:{
        fontSize:12,
        alignSelf:"center"
    }
})