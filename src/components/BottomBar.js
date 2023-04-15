import {Alert,Share,Image, StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import React,{useLayoutEffect} from 'react'
import { useNavigation } from "@react-navigation/native";
import Home from '../../assets/icons/homeOrg.png' 
// import Find from '../../assets/icons/searchOrg.png' 
import Settings from '../../assets/icons/settingsOrg.png' 
import Feedback from '../../assets/icons/chatOrg.png' 
import Add from '../../assets/icons/addCol.png' 
import SharePNG from '../../assets/icons/share.png' 
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";


// color= #f1735b
// color= #8accb4
// color= #4c445c

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
        message: 'iNotebook - the app for all your note-taking needs. Jot down your ideas and stay organized on-the-go! Download it now....  https://i-notebook-app-website-download.vercel.app/',
        subject: 'Share Link', // for email
        url: 'https://i-notebook-app-website-download.vercel.app/'
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
        <TouchableOpacity className="justify-center"  style={{width:"40%"}} onPress={()=>navigation.navigate("Feedback")}>
          <Image source={Feedback} style={styles.img}/>
          <Text style={styles.title}>FEEDBACK</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{margin:"0%",alignSelf:"center",justifyContent:"center",width:"40%"}} onPress={press}>
          <Image source={Add} style={styles.add}/>
        </TouchableOpacity>
        <TouchableOpacity className="justify-center"  style={{width:"45%"}} onPress={()=>navigation.navigate("Setting")}>
          <Image source={Settings} style={styles.img}/>
          <Text style={styles.title}>SETTINGS</Text>
        </TouchableOpacity>
        <TouchableOpacity className="justify-center" style={{width:"33%"}} onPress={onShare}>
          <Image source={SharePNG} style={styles.img}/>
          <Text style={styles.title}>SHARE</Text>
        </TouchableOpacity>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: "5%",
    height: 80,
    width: "91%",
    backgroundColor: "rgb(150, 145, 161)",
    borderColor: "rgb(223, 216, 214)",
    borderWidth: 2,
    alignSelf: "center",
    marginBottom:"5%",
    borderRadius: 15,
    position:"absolute",
        bottom:0,
    },
    add: {
      height:undefined,
      width: "100%",
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
      // fontSize:12,
      fontSize:responsiveWidth(3),
      alignSelf:"center"
    }
  })



  export default BottomBar