import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useLayoutEffect,useState } from "react";
import { useNavigation } from "@react-navigation/native";
import BottomBar from "../components/BottomBar";
import { AutoGrowingTextInput } from "react-native-autogrow-textinput";
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

const Feedback = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [msg, setMsg] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const handleOnPress = () => {
    setName("");
    setEmail("");
    setSubject("");
    setMsg("");
    Alert.alert("Thank you for your feedback!");
  };


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
      <SafeAreaView style={styles.AndroidSafeArea}>
        <View style={{ width: "100%", height: "100%" }}>
          <ScrollView>
            <View>
              <Text className="align-middle m-5 my-6" style={styles.profile}>
                Feedback
              </Text>
            </View>
            <View style={{ marginHorizontal: "5%", marginVertical: "5%" }}>
              <TextInput
              value={name}
                className="mx-1"
                placeholder="Name"
                style={{ width: "100%" }}
                onChangeText={(newText) => setName(newText)}
              />
              <View className="border-b-2 border-black"></View>
            </View>
            <View style={{ marginHorizontal: "5%", marginVertical: "8%" }}>
              <TextInput
                value={email}
                className="mx-1"
                placeholder="Email"
                style={{ width: "100%" }}
                onChangeText={(newText) => setEmail(newText)}
              />
              <View className="border-b-2 border-black"></View>
            </View>
            <View style={{ marginHorizontal: "5%", marginVertical: "8%" }}>
              <TextInput
                value={subject}
                className="mx-1"
                placeholder="Subject"
                style={{ width: "100%" }}
                onChangeText={(newText) => setSubject(newText)}
              />
              <View className="border-b-2 border-black"></View>
            </View>
            <View
              style={{
                height: 150,
                width: "90%",
                marginHorizontal: "5%",
                marginVertical: "1%",
              }}
            >
              <AutoGrowingTextInput
                value={msg}
                style={{ fontSize: 15, marginTop: 20,alignSelf:"flex-start",height:"100%",width:"100%" }}
                placeholder={"Type message"}
                onChangeText={(newText) => setMsg(newText)}
              />
              <View className="border-b-2 border-black"></View>
            </View>
            <View style={{height:"30%",marginVertical:"5%"}}>
            <TouchableOpacity onPress={handleOnPress} className="align-middle mx-8 justify-center" style={{ borderRadius:5,height:"27%",backgroundColor:"#f1735b"}}>
                <Text className="text-center" style={{fontFamily: "Poppins_600SemiBold",color:"white"}}>Register</Text>
            </TouchableOpacity>
            </View>
          </ScrollView>
            <View style={{ marginHorizontal: "5%", marginVertical: 50 ,}}></View>
        </View>
        <BottomBar />
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "#4c445c",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  profile: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 25,
    alignSelf: "center",
    marginTop: "15%",
  },
});

export default Feedback;
