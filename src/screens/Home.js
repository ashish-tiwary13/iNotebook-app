import {
  View,
  Text,
  TouchableOpacity,
  Button,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Platform, 
  StatusBar, 
  Image,
  FlatList,
} from "react-native";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getNotes } from "../redux/action";
import BottomBar from "../components/BottomBar";
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Roboto_100Thin,
  Roboto_100Thin_Italic,
  Roboto_300Light,
  Roboto_300Light_Italic,
  Roboto_400Regular,
  Roboto_400Regular_Italic,
  Roboto_500Medium,
  Roboto_500Medium_Italic,
  Roboto_700Bold,
  Roboto_700Bold_Italic,
  Roboto_900Black,
  Roboto_900Black_Italic,
} from '@expo-google-fonts/roboto';
import ProfilePNG from "../../assets/profile.png";
import AsyncStorage from '@react-native-community/async-storage';



const Home = () => {
  const navigation = useNavigation();
  const myState = useSelector((state) => state.loginSignup);
  const myNotes= useSelector((state) => state.notes);
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [username, setUsername] = useState("");
  const isFocused = useIsFocused();


  useEffect(() => {
    let data = async() =>{
      let status = await AsyncStorage.getItem("status");
      if(status=="success"){
        await AsyncStorage.setItem("username",myState.username);
        setUsername(myState.username);
        dispatch(getNotes());
      }else{
        navigation.navigate("Login");
      }
    }
    data();
  }, [isFocused,myState,myState.authToken])
  

  const handleCardPress = (item) => {
    navigation.navigate("View", {itemId:item._id, titleProp:item.title, descriptionProp:item.description, tagProp:item.tag}); 
  };



//fonts
  let [fontsLoaded] = useFonts({
    Roboto_100Thin,
    Roboto_100Thin_Italic,
    Roboto_300Light,
    Roboto_300Light_Italic,
    Roboto_400Regular,
    Roboto_400Regular_Italic,
    Roboto_500Medium,
    Roboto_500Medium_Italic,
    Roboto_700Bold,
    Roboto_700Bold_Italic,
    Roboto_900Black,
    Roboto_900Black_Italic,
  });

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };


  console.log("myState " + myState.authToken);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const card = (
    <View className="my-4" style={styles.cardContainer}>
      <View className="" style={styles.card}>
        <Text className="text-xl" style={styles.cardText}>
          title
        </Text>
        <Text className="text-lg" style={styles.cardText}>
          description
        </Text>
        <Text className="text-sm" style={styles.cardText}>
          #tag
        </Text>
      </View>
    </View>
  );

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
    <View style={{height:"100%"}}>
      {/* <Navbar/> */}
      <ScrollView style={styles.scrollView} >
        <TouchableOpacity className="flex-row justify-start" style={{margin:"2%"}} onPress={()=>dispatch(getNotes())}>
          <Image source={ProfilePNG} style={{width: 40, height: 40, marginHorizontal:10}} />
          <Text className="text-lg"  >morning, </Text>
          <Text className="text-xl" style={{ fontFamily: 'Roboto_500Medium'}} >{username}</Text>
        </TouchableOpacity>
        <View className="border-b-2 border-black mx-5" style={{marginVertical:"2%"}} ></View>
        <View className="justify-start" style={{height:"30%"}}>
          <Text className="" style={{marginHorizontal:"3%",fontFamily: 'Roboto_500Medium',fontSize:70}}>your</Text>
          <View className="flex-row justify-start" style={{marginHorizontal:"3%"}}>
            <Text className="" style={{marginHorizontal:"3%",fontFamily: 'Roboto_500Medium',fontSize:70 , marginLeft:50}}>notes</Text>
            <Text className="align-bottom" style={{fontFamily: 'Roboto_500Medium',fontSize:50 , marginLeft:50,color:"white"}}>/14</Text>
          </View>
          <View style={{height:100,width:"100%"}}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row" style={{marginTop:"5%",maxHeight:48}}>
            <View style={{marginHorizontal:5,borderWidth:2,borderColor:"white",borderRadius:51,paddingHorizontal:10,paddingVertical:8,}}>
              <Text style={{fontSize:20}}>#personal</Text>
            </View>
            <View style={{marginHorizontal:5,borderWidth:2,borderColor:"white",borderRadius:51,paddingHorizontal:10,paddingVertical:8,}}>
              <Text style={{fontSize:20}}>#personal</Text>
            </View>
            <View style={{marginHorizontal:5,borderWidth:2,borderColor:"white",borderRadius:51,paddingHorizontal:10,paddingVertical:8,}}>
              <Text style={{fontSize:20}}>#personal</Text>
            </View>
            <View style={{marginHorizontal:5,borderWidth:2,borderColor:"white",borderRadius:51,paddingHorizontal:10,paddingVertical:8,}}>
              <Text style={{fontSize:20}}>#personal</Text>
            </View>
            <View style={{marginHorizontal:5,borderWidth:2,borderColor:"white",borderRadius:51,paddingHorizontal:10,paddingVertical:8,}}>
              <Text style={{fontSize:20}}>#personal</Text>
            </View>
            <View style={{marginHorizontal:5,borderWidth:2,borderColor:"white",borderRadius:51,paddingHorizontal:10,paddingVertical:8,}}>
              <Text style={{fontSize:20}}>#personal</Text>
            </View>
          </ScrollView>
          </View>
          <View className="border-b-2 border-black mx-5" style={{marginBottom:"2%"}} ></View>
        <View style={{ minHeight:"100%"}}>
          {/* {card} */}
          {myNotes && (
            <FlatList
              data={myNotes}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <TouchableOpacity className="my-4" style={styles.cardContainer} onPress={()=>handleCardPress(item)}>
                  <View className="" style={styles.card}>
                    <Text className="text-xl" style={styles.cardText}>
                      {item.title}
                    </Text>
                    <Text className="text-lg" style={styles.cardText}>
                      {item.description}
                    </Text>
                    <Text className="text-sm" style={styles.cardText}>
                      {item.tag}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
        </View>
        <View className="my-14"></View>
      </ScrollView>
      {/*  */}
      <BottomBar/>
    </View>
    </SafeAreaView>
  );
};
};

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "#8accb4",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  cardContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  card: {
    width: "90%",
    backgroundColor: "rgba(223, 216, 214, 0.2)",
    borderRadius: 10,
    borderColor: "rgb(223, 216, 214)",
    borderWidth: 2,
    paddingVertical: 7,
  },
  cardText: {
    margin: 2,
    marginHorizontal: 15,
  },
  scrollView: {
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor:"#8accb4"
  },
});

export default Home;

{
  /* <Text className="flex-row justify-center">{myState.authToken}</Text> */
}
{
  /* <Button title="Login" onPress={()=>{ dispatch(login({email:"himoo@gmail.com",password:"himoo"}))}}/>
<Button title="SignUp" onPress={()=>{ dispatch(signUp({name:"alok",email:"alok1@gmail.com",password:"alokk",Rpassword:"alokk"}))}}/> */
}
