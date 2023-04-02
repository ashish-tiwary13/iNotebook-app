import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Platform, 
    StatusBar, 
    SafeAreaView,
  } from "react-native";
  import React, { useState, useEffect, useLayoutEffect } from "react";
  import { useNavigation } from "@react-navigation/native";
  import { User } from "react-native-unicons";
  import { useDispatch, useSelector } from "react-redux";
  import { incNumber, decNumber, login, signUp } from "../redux/action";
  

const Navbar = () => {

  const navigation = useNavigation();
  const myState = useSelector((state) => state.loginSignup);
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const dropdown = 
    isDropdownOpen?(

    <View style={styles.frame}>
      <View style={styles.dropDownFrame}>
        <View  style={styles.dropdown}>
        <TouchableOpacity style={{alignItems:"center", paddingHorizontal: 16, paddingVertical: 10,}}>
          <Text style={{color:"white", fontSize: 12, fontWeight: '300' }}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
        <View style={styles.dropdown}>
        <TouchableOpacity style={{alignItems:"center", paddingHorizontal: 16, paddingVertical: 10}}>
          <Text style={{ color:"white", fontSize: 12, fontWeight: '300' }}>
            SignUp
          </Text>
        </TouchableOpacity>
      </View>
    </View>
    </View>
    ):(<View></View>);


  console.log("myState " + myState.authToken);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
    <View style={{
    backgroundColor:"#8accb4"}}>
      <View
        className="bg-black flex-row justify-between"
        style={{ width: "100%" }}
      >
        <Text className="text-white text-2xl" style={styles.m4} >iNotebook</Text>
        <TouchableOpacity className=" m-4" onPress={toggleDropdown}>
          <User stroke="white" fill="#fff" width={26} height={26}  />
        </TouchableOpacity>
      </View>
      {/*  */}
      {dropdown}
      {/*  */}
      <View className="flex-row justify-center" style={styles.m5} >
          <Text className="text-2xl">Hello, Alok</Text>
        </View>
    </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
    dropDownFrame: {
        height: "100%",
        width: "30%",
        backgroundColor: "black",
        borderColor: "white",
        borderWidth: 2,
        borderRadius: 10,
      },
      frame: {
        marginTop: 50,
        position: "absolute",
        width: "100%",
        height: "60%",
        display: "flex",
        alignItems: "flex-end",
      },
      m4:{
        margin:"3%",
      },
      m5:{
        margin:"3%",
        position:"relative"
      },
    });

export default Navbar;