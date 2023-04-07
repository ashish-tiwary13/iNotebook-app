import {
    View,
    Text,
    Image,
    SafeAreaView,
    Platform,
    StatusBar,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView
  } from "react-native";
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
  import React, { useLayoutEffect, useEffect, useState } from "react";
  import { useNavigation } from "@react-navigation/native";
  import loginJPG from "../../assets/login.png";
  import emailPNG from "../../assets/icons/email.png";
  import passwordPNG from "../../assets/icons/password.png";
  import namePNG from "../../assets/icons/name.png";
  import loadingGIF from "../../assets/icons/loading.gif";
  import { useDispatch, useSelector } from "react-redux";
  import { signUp } from "../redux/action";
  import AsyncStorage from '@react-native-community/async-storage';

  
  const LoginScreen = () => {
    const navigation = useNavigation();
    const myState = useSelector((state) => state.loginSignup);
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
  
    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: false,
      });
    }, []);

 
    const fetchRegister = async () => {
      setIsLoading(true);
      dispatch(signUp({name:`${name}`,email:`${email}`,password:`${password}`,confirmPassword:`${confirmPassword}`}))
    };

    useEffect(() => {
      let data= async()=>{
        navigation.addListener('beforeRemove', (e) => {
          e.preventDefault();
        });

        let status = await AsyncStorage.getItem("status");
        if(status=="success"){
          navigation.push("Home");
        }else{
          if(myState.error){
            setError(myState.error)
          }
          if(myState.errors){
            setError(myState.errors[0].msg)
          }
          setIsLoading(false)
          setTimeout(() => {
            setError("")
          }, 4000);
        }
      }
      data();
    }, [myState])


  
    // fonts
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
      <SafeAreaView 
    // style={styles.AndroidSafeArea}
    >
        <ScrollView  style={{height:"100%"}}>
        <View className="my-1" style={{ height: "100%", width: "100%" }}>
          <Image
            source={loginJPG}
            style={{ height: undefined, width: "100%", aspectRatio: 1.5,borderRadius:10 }}
          />
          <Text className="align-middle m-5 my-6" style={[styles.profile,{color:"#f5f5f5"}]}>Register</Text>
          <View className="align-middle mx-8 justify-center" style={{ borderRadius:5,height:"5%"}}>
            <View className="flex-row">
              <Image source={namePNG} style={{height:undefined,width:25,aspectRatio:1}}/>
              <TextInput className="mx-3" placeholder="Name" placeholderTextColor="#f5f5f5" style={{width:"100%",color:"#f5f5f5"}} onChangeText={newText => setName(newText)}/>
            </View>
            <View className="border-b-2 border-black" ></View>
          </View>
          <View className="align-middle mx-8 my-6 justify-center" style={{ borderRadius:5,height:"5%"}}>
            <View className="flex-row">
              <Image source={emailPNG} style={{height:undefined,width:25,aspectRatio:1}}/>
              <TextInput className="mx-3"placeholder="Email Address" placeholderTextColor="#f5f5f5" style={{width:"100%",color:"#f5f5f5"}} onChangeText={newText => setEmail(newText)}/>
            </View>
            <View className="border-b-2 border-black" ></View>
          </View>
          <View className="align-middle mx-8 justify-center" style={{ borderRadius:5,height:"5%"}}>
            <View className="flex-row">
              <Image source={passwordPNG} style={{height:undefined,width:25,aspectRatio:1}}/>
              <TextInput className="mx-3" secureTextEntry={true} placeholder="Password" placeholderTextColor="#f5f5f5" style={{width:"100%",color:"#f5f5f5"}} onChangeText={newText => setPassword(newText)}/>
            </View>
            <View className="border-b-2 border-black" ></View>
          </View>
          <View className="align-middle mx-8 my-6 justify-center" style={{ borderRadius:5,height:"5%"}}>
            <View className="flex-row">
              <Image source={passwordPNG} style={{height:undefined,width:25,aspectRatio:1}}/>
              <TextInput className="mx-3" secureTextEntry={true} placeholder="Confirm Password" placeholderTextColor="#f5f5f5" style={{width:"100%",color:"#f5f5f5"}} onChangeText={newText => setConfirmPassword(newText)}/>
            </View>
            <View className="border-b-2 border-black" ></View>
          </View>
          <Text style={{alignSelf:"center",fontFamily:"Poppins_300Light",color:"red"}}>{error}</Text>
          <TouchableOpacity onPress={fetchRegister} className="align-middle mx-8 justify-center" style={{ borderRadius:5,height:"7%",backgroundColor:"#f1735b"}}>
            <View >
              {!isLoading ? 
                <Text className="text-center" style={{fontFamily: "Poppins_600SemiBold",color:"white"}}>Register</Text>
                :
                <Image source={loadingGIF} style={{height:undefined,width:30,aspectRatio:1,alignSelf:"center"}}/>
              }
            </View>
          </TouchableOpacity>
        <View className="flex-row align-middle justify-center m-4" style={{ borderRadius:5,height:"7%"}}>
          <Text className="text-center" style={{fontFamily: "Poppins_300Light",}}>Already Register? </Text>
          <TouchableOpacity onPress={()=> {navigation.push("Login")}}>
            <Text style={{fontFamily:"Poppins_600SemiBold",color:"#f1735b"}}>Login</Text>
          </TouchableOpacity>
        </View>
        </View>
        <View className="my-4" style={{
    width: "100%",
    display: "flex",
    alignItems: "center",
    backgroundColor : "#4c445c",
    height: 100,
    position: "relative"
  }}></View>
        </ScrollView>
      </SafeAreaView>
    );
    }
  };
  
  const styles = StyleSheet.create({
    AndroidSafeArea: {
      flex: 1,
      backgroundColor: "#4c445c",
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    profile: { 
      fontFamily: "Poppins_600SemiBold",
      fontSize: 25, 
    },
  
  });
  
  export default LoginScreen;
  