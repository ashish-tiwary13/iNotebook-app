import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect,useState,useEffect } from "react";
import { useNavigation ,useIsFocused} from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic,
} from "@expo-google-fonts/poppins";
import BottomBar from "../components/BottomBar";
import ProfilePNG from "../../assets/profile.png";
import AsyncStorage from '@react-native-community/async-storage';
import { useSelector } from "react-redux";
import { LogBox } from 'react-native';
LogBox.ignoreLogs(["expo-app-loading","VirtualizedLists should never be nested"]);


const Setting = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const myState = useSelector((state) => state.loginSignup);
  const [username, setUsername] = useState("");
  const [emailId, setEmailId] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

const logout = async()=>{
  await AsyncStorage.setItem("status","failed");
  navigation.navigate("Login");
}

useEffect(() => {
  let data = async() =>{
    let status = await AsyncStorage.getItem("status");
    if(status=="success"){
      setEmailId(myState.emailId)
      if(myState.emailId==undefined){
        setEmailId(await AsyncStorage.getItem("username"));
        setUsername(await AsyncStorage.getItem("username"));
      }
      setUsername(myState.username);
    }else{
      navigation.navigate("Login");
    }
  }
  data();
}, [isFocused,myState,myState.authToken])

//fonts
  let [fontsLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_100Thin_Italic,
    Poppins_200ExtraLight,
    Poppins_200ExtraLight_Italic,
    Poppins_300Light,
    Poppins_300Light_Italic,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold,
    Poppins_700Bold_Italic,
    Poppins_800ExtraBold,
    Poppins_800ExtraBold_Italic,
    Poppins_900Black,
    Poppins_900Black_Italic,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <SafeAreaView style={styles.AndroidSafeArea}>
        <View>
          <Text style={styles.profile}>Profile</Text>
        </View>
        <ScrollView style={styles.ScrollView}>
          <View style={styles.view}>
            <View style={styles.circle}>
              <Image  source={ProfilePNG} style={{height:undefined,width:"100%",aspectRatio:1}}/>
            </View>
            <View style={{alignSelf:"center"}}>
              <Text style={styles.profile}>{username}</Text>
            </View>
            <View style={{alignSelf:"center"}}>
              <Text style={styles.profile}>{emailId}</Text>
            </View>
            <View style={{alignSelf:"center"}}>
              <Text style={styles.profile}>Date of Birth</Text>
            </View>
            <View style={{width:"100%",height:2,backgroundColor:"white",marginTop:"15%"}}></View>
            <TouchableOpacity>
              <Text style={styles.profile}>Manage Notification</Text>
            </TouchableOpacity>
            <View style={{width:"100%",height:2,backgroundColor:"white"}}></View>
            <TouchableOpacity>
              <Text style={styles.profile}>Give us feedback</Text>
            </TouchableOpacity>
            <View style={{width:"100%",height:2,backgroundColor:"white"}}></View>
            <TouchableOpacity>
              <Text style={styles.profile}>Deactivate Account</Text>
            </TouchableOpacity>
            <View style={{width:"100%",height:2,backgroundColor:"white"}}></View>
            <TouchableOpacity onPress={logout}>
              <Text style={styles.profile}>Logout</Text>
            </TouchableOpacity>
            <View style={{width:"100%",height:2,backgroundColor:"white"}}></View>
            <View style={{width:"100%",height:2,backgroundColor:"white",marginTop:"35%"}}></View>
          </View>
        </ScrollView>
        <BottomBar/>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "#8accb4",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  profile: { 
    fontFamily: "Poppins_500Medium",
    fontSize: 20, 
    margin: "3%" 
  },
  ScrollView:{
    // position:"relative",
    backgroundColor:"#8accb4",
  },
  view:{
    position:"relative",
    backgroundColor:"#dfe1e6",
    height:"100%",
    marginTop:"20%",
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
  },
  circle:{
    marginTop:"-10%",
    width:120,
    height:120,
    backgroundColor:"blue",
    alignSelf:"center",
    borderRadius:60,
    borderColor:"black",
    borderWidth:3,
  },
});

export default Setting;
