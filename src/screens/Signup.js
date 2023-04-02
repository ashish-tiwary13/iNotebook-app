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
  import React, { useLayoutEffect, useEffect, useState } from "react";
  import { useNavigation } from "@react-navigation/native";
  import loginJPG from "../../assets/login.png";
  import emailPNG from "../../assets/icons/email.png";
  import passwordPNG from "../../assets/icons/password.png";
  import namePNG from "../../assets/icons/name.png";
  import { useDispatch, useSelector } from "react-redux";
  import { login,signUp } from "../redux/action";
  import AsyncStorage from '@react-native-community/async-storage';

const SignupScreen = () => {
    const navigation = useNavigation();
    const myState = useSelector((state) => state.loginSignup);
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
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
          let status = await AsyncStorage.getItem("status");
          if(status=="success"){
            console.log("success " + status)
            navigation.navigate("Home");
          }else{
            console.log("failed "+status)
            setError(myState.error)
            setIsLoading(false)
            setTimeout(() => {
              setError("")
            }, 4000);
          }
        }
        data();
      }, [myState])
  
  

      return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <ScrollView>
                <View style={styles.header}>
                    <Image source={loginJPG} style={styles.image} />
                </View>
                <View style={styles.footer}>
                    <Text style={styles.title}>Register</Text>
                    <Text style={styles.text}>Name</Text>
                    <View style={styles.action}>
                        <Image source={namePNG} style={styles.icon} />
                        <TextInput

                            placeholder="Your Name"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(text) => setName(text)}
                        />  
                    </View>
                    <Text style={styles.text}>Email</Text>
                    <View style={styles.action}>
                        <Image source={emailPNG} style={styles.icon} />
                        <TextInput

                            placeholder="Your Email"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(text) => setEmail(text)}
                        />
                    </View>
                    <Text style={styles.text}>Password</Text>
                    <View style={styles.action}>
                        <Image source={passwordPNG} style={styles.icon} />
                        <TextInput


                            placeholder="Your Password"
                            style={styles.textInput}
                            autoCapitalize="none"
                            secureTextEntry={true}
                            onChangeText={(text) => setPassword(text)}
                        />
                    </View>
                    <Text style={styles.text}>Confirm Password</Text>
                    <View style={styles.action}>
                        <Image source={passwordPNG} style={styles.icon} />
                        <TextInput

                            placeholder="Confirm Password"
                            style={styles.textInput}
                            autoCapitalize="none"
                            secureTextEntry={true}
                            onChangeText={(text) => setConfirmPassword(text)}
                        />
                    </View>
                    <TouchableOpacity

                        style={styles.button}
                        onPress={() => {
                            // dispatch(signUp(name, email, password, confirmPassword));
                            dispatch(login({email:`${email}`,password:`${password}`}))    
                        }}
                        ><Text>Signup</Text></TouchableOpacity>
                    <View style={styles.signUp}>
                        <Text style={styles.text}>Already have an account? </Text>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("Login");
                            }
                        }>
                            <Text style={styles.signUpText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
        );
    };

        
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "#fff",
        },
        header: {
            flex: 1,
            justifyContent: "flex-end",
            paddingHorizontal: 20,
            paddingBottom: 50,
        },
        footer: {
            flex: 3,

            backgroundColor: "#fff",
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            paddingHorizontal: 20,
            paddingVertical: 30,
        },
        image: {
            width: "100%",
            height: "100%",
        },
        title: {
            color: "#05375a",
            fontSize: 30,
            fontWeight: "bold",
        },
        text: {
            color: "grey",
            marginTop: 5,
        },
        button: {

            alignItems: "center",
            marginTop: 50,
            backgroundColor: "#009387",
            padding: 10,
            borderRadius: 10,


        },
        action: {
            flexDirection: "row",
            marginTop: 10,
            borderBottomWidth: 1,
            borderBottomColor: "#f2f2f2",
            paddingBottom: 5,
        },
        textInput: {
            flex: 1,
            marginTop: Platform.OS === "ios" ? 0 : -12,
            paddingLeft: 10,
            color: "#05375a",
        },
        icon: {
            width: 20,
            height: 20,
        },
        signUp: {
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 20,
        },
        signUpText: {
            color: "#009387",
            fontWeight: "bold",
        },
    });

    export default SignupScreen;


















