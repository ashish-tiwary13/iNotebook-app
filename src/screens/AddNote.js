import {Keyboard,SafeAreaView, StyleSheet, Text, View, Platform, StatusBar, TouchableOpacity,Image, TextInput} from "react-native";
import React, {useEffect,useState, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import BottomBar from "../components/BottomBar";
import BackPNG from "../../assets/icons/back.png";
import Done from "../../assets/icons/done.png";
import { useDispatch, useSelector } from "react-redux";
import { addNote,getNotes } from "../redux/action";

const AddNote = () => {
  const navigation = useNavigation();
  const myNotes = useSelector((state) => state.notes);
  const dispatch = useDispatch();
  const [KeyboardStatus, setKeyboardStatus] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let finalDate = day + "/" + month + "/" + year;
    setDate(finalDate);
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(false);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(true);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);


  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);



  const saveNotes = () => {
    dispatch(addNote({
      title: title,
      description: description,
      tag: tag,
    }));
    dispatch(getNotes());
    navigation.navigate("Home");
  }



  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <View className="flex-row justify-between">
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Image source={BackPNG} style={{width: 30, height: 30, marginLeft: 20, marginTop: 20}}/>
        </TouchableOpacity>
        <TouchableOpacity className="mx-6" onPress={() => navigation.navigate("Home")}>
            <Text style={{fontSize: 20, marginTop: 20,color:"#f5f5f5"}}>delete</Text>
        </TouchableOpacity>
      </View>
      <View className="border-b-2 border-black mx-5" style={{marginTop:"5%"}} ></View>
      <View className="flex-row justify-between">
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Text style={{fontSize: 20, marginLeft: 20, marginTop: 20,color:"#f5f5f5"}}>{date}</Text>
        </TouchableOpacity>
        <TouchableOpacity className="mx-6" onPress={() => navigation.navigate("Home")}>
            <TextInput style={{fontSize: 20, marginLeft: 20, marginTop: 20,color:"#f5f5f5"}} placeholderTextColor="#f5f5f5" placeholder="#tag" onChangeText={newText => setTag(newText)}></TextInput>
        </TouchableOpacity>
      </View>
      <View >
        <TextInput style={{fontSize: 45, marginHorizontal: 20, marginTop: 20,color:"#f5f5f5"}} placeholderTextColor="#f5f5f5" placeholder="title" onChangeText={newText => setTitle(newText)}></TextInput>
      </View>
      <View >
      <View style={{height:"63%",width:"100%"}}>
        <TextInput editable multiline style={{fontSize: 20, marginHorizontal: 20, marginTop: 20,color:"#f5f5f5"}} placeholderTextColor="#f5f5f5" placeholder={'type message'} onChangeText={newText => setDescription(newText)}/>
      </View>
      <View style={{width:"100%",height:38}}>
        <TouchableOpacity  className="align-middle my-6 justify-center" style={{width:95,alignSelf:"flex-end" ,borderRadius:45,height:"100%"}} onPress={saveNotes}>
          <View >
            <Image source={Done} style={{width: 30, height: 30, alignSelf:"center", marginTop: 3}}/>
          </View>
        </TouchableOpacity>
      </View>
      </View>
      {KeyboardStatus &&
      <BottomBar/>
      }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    AndroidSafeArea: {
        flex: 1,
        backgroundColor: "#4c445c",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
      },
});

export default AddNote;
