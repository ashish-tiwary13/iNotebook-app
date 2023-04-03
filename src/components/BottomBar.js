import {Alert,Share,Image, StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import React,{useLayoutEffect} from 'react'
import { useNavigation } from "@react-navigation/native";
import Home from '../../assets/icons/homeOrg.png' 
// import Find from '../../assets/icons/searchOrg.png' 
import Settings from '../../assets/icons/settingsOrg.png' 
import Feedback from '../../assets/icons/chatOrg.png' 
import Add from '../../assets/icons/addCol.png' 
import SharePNG from '../../assets/icons/share.png' 


// color= #f1735b
// color= #8accb4

const BottomBar = () => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
          headerShown: false,
        });
      }, []);

    const press=()=>{
      navigation.navigate("AddNote");
    }

    // Share
  const onShare = async () => {
    try {
      const result = await Share.share({
        title: 'Share iNotebook',
        message: 'iNotebook is a simple note taking app. Download it now from playstore',
        subject: 'Share Link', // for email
        url: 'some share url'
      });
  
      if (result.action === Share.sharedAction) {
        console.log(result.activityType ? 'share button clicked' : 'shared');
      } else if (result.action === Share.dismissedAction) {
        console.log('dismissed');
      }
    } catch (error) {
      Alert.alert(error.message);
      console.log('error', error);
    }
  };
  
        

  return (
    <View className="justify-center flex-row align-middle px-20" style={styles.container}>
        <TouchableOpacity className="justify-center"  style={{width:"33%"}} onPress={()=>navigation.navigate("Home")}>
          <Image source={Home} style={styles.img}/>
          <Text style={styles.title}>HOME</Text>
        </TouchableOpacity>
        <TouchableOpacity className="justify-center"  style={{width:"35%"}} >
          <Image source={Feedback} style={styles.img}/>
          <Text style={styles.title}>FEEDBACK</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{margin:"2%"}} onPress={press}>
          <Image source={Add} style={styles.add}/>
        </TouchableOpacity>
        <TouchableOpacity className="justify-center"  style={{width:"33%"}} onPress={()=>navigation.navigate("Setting")}>
          <Image source={Settings} style={styles.img}/>
          <Text style={styles.title}>SETTINGS</Text>
        </TouchableOpacity>
        <TouchableOpacity className="justify-center" onPress={onShare} style={{width:"33%"}} >
          <Image source={SharePNG} style={styles.img}/>
          <Text style={styles.title}>SHARE</Text>
        </TouchableOpacity>
    </View>
  )
}


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
      width: 24,
      aspectRatio:1,
      alignSelf:"center"
    },
    title:{
      fontSize:12,
      alignSelf:"center"
    }
  })



  export default BottomBar