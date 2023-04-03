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
  const [username, setUsername] = useState("");
  const isFocused = useIsFocused();
  const [toggle, setToggle] = useState(null);
  const [tags, setTags] = useState([
    {
      id: "",
      tag: "",
    }
  ]);
  const [notes, setNotes] = useState([
    {
      id: "",
      title: "",
      description: "",
      tag: "",
    }
  ]);

  useEffect(() => {
    //tags
    const unique=[];
    if(myNotes.length!==undefined){
    const filter = myNotes.filter (item =>{
      if(item.tag==""){
        return false;
      }
      const isDuplicate = unique.includes(item.tag);
      if(!isDuplicate){
        unique.push(item.tag);
        return true;
      }
      return false;
      })
      setTags(filter);
    }


    //notes
    if(toggle!==null){
      setNotes([]);
    const filterNotes = myNotes.filter (item =>{
      if(item.tag==toggle){
        return true;
      }
      return false;
      })
      setNotes(filterNotes);
    }else{
      setNotes(myNotes);
    }
  },[myNotes,toggle])


  useEffect(() => {
    let data = async() =>{
      let status = await AsyncStorage.getItem("status");
      if(status=="success"){
        await AsyncStorage.getItem("username").then((value) => setUsername(value));
        dispatch(getNotes());
      }else{
        navigation.navigate("Login");
      }
    }
    data();
  }, [isFocused,myState,myState.authToken])
  

  const handleCardPress = (item) => {
    navigation.navigate("View", {itemId:item._id, titleProp:item.title, descriptionProp:item.description, tagProp:item.tag, dateProp:item.date}); 
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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

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
            <Text className="align-bottom" style={{fontFamily: 'Roboto_500Medium',fontSize:50 , marginLeft:50,color:"white"}}>/{myNotes.length}</Text>
          </View>
          <View style={{height:100,width:"100%"}}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row" style={{marginTop:"5%",maxHeight:48}}>
            {myNotes && (
              <FlatList scrollEnabled horizontal data={tags} keyExtractor={(item) => item.id} renderItem={({ item }) => (
                <TouchableOpacity onPress={()=>{
                  if(toggle!==`${item.tag}`){
                  setToggle(item.tag);
                  }else{
                    setToggle(null);
                  }
                }} style={{marginHorizontal:10,borderWidth:2,borderColor:"white",borderRadius:51,paddingHorizontal:10,paddingVertical:8,backgroundColor:`${toggle!==`${item.tag}`?"#8accb4":"white"}`}}>
                  <Text style={{fontSize:20}}>{item.tag}</Text>
                </TouchableOpacity>
              )} />
            )}
          </ScrollView>
          </View>
          <View className="border-b-2 border-black mx-5" style={{marginBottom:"2%"}} ></View>
        <View style={{ minHeight:"100%"}}>
          {/* {card} */}
          {myNotes && (
            <FlatList
              data={notes}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <TouchableOpacity className="my-4" style={styles.cardContainer} onPress={()=>handleCardPress(item)}>
                  <View className="" style={styles.card}>
                    <Text className="text-2xl" style={styles.cardText}>
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

