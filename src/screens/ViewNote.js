import {Keyboard,SafeAreaView, StyleSheet, Text, View, Platform, StatusBar, TouchableOpacity,Image, TextInput} from "react-native";
import React, {useEffect,useState, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import BottomBar from "../components/BottomBar";
import BackPNG from "../../assets/icons/back.png";
import Done from "../../assets/icons/done.png";
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import { useDispatch, useSelector } from "react-redux";
import { editNote,getNotes,deleteNote } from "../redux/action";

const ViewNote = ({ route }) => {
  const { itemId,titleProp,descriptionProp, tagProp} = route.params;
//   console.log(itemId);

  const navigation = useNavigation();
  const myNotes = useSelector((state) => state.notes);
  const dispatch = useDispatch();
  const [KeyboardStatus, setKeyboardStatus] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [editTitle,setEditTitle]= useState(titleProp);
  const [editDes,setEditDes]= useState(descriptionProp);
  const [editTag,setEditTag]= useState(tagProp);


  const deleted = () => {
    dispatch(deleteNote({
      id: itemId,
    }));
    dispatch(getNotes());
    setTimeout(() => {
    dispatch(getNotes());
    }, 500);
    navigation.navigate("Home");
  }

  useEffect(() => {
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
    dispatch(editNote({
      id: itemId,
      title: title,
      description: description,
      tag: tag,
    }));
    dispatch(getNotes());
    setTimeout(() => {
      dispatch(getNotes());
    }, 500);
    console.log(title);
    navigation.navigate("Home");
  }



  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <View className="flex-row justify-between">
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Image source={BackPNG} style={{width: 30, height: 30, marginLeft: 20, marginTop: 20}}/>
        </TouchableOpacity>
        <TouchableOpacity className="mx-6" onPress={deleted}>
            <Text style={{fontSize: 20, marginTop: 20}}>delete</Text>
        </TouchableOpacity>
      </View>
      <View className="border-b-2 border-black mx-5" style={{marginTop:"5%"}} ></View>
      <View className="flex-row justify-between">
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Text style={{fontSize: 20, marginLeft: 20, marginTop: 20}}>18/11/22</Text>
        </TouchableOpacity>
        <TouchableOpacity className="mx-6" onPress={() => navigation.navigate("Home")}>
            <TextInput value={editTag} style={{fontSize: 20, marginLeft: 20, marginTop: 20}} placeholder="#tag" onChangeText={newText => {setTag(newText); setEditTag(newText)}}></TextInput>
        </TouchableOpacity>
      </View>
      <View >
        <TextInput value={editTitle} style={{fontSize: 45, marginHorizontal: 20, marginTop: 20}} placeholder="title" onChangeText={newText => {setTitle(newText); setEditTitle(newText)}}></TextInput>
      </View>
      <View >
      <View style={{height:"63%",width:"100%"}}>
        <AutoGrowingTextInput value={editDes} style={{fontSize: 20, marginHorizontal: 20, marginTop: 20}} placeholder={'type message'} onChangeText={newText => {setDescription(newText); setEditDes(newText)}}/>
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
        backgroundColor: "#8accb4",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
      },
});

export default ViewNote;