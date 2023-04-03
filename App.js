import React,{useState,useEffect} from "react";
import { TailwindProvider } from "tailwindcss-react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/screens/Home";
import store from "./src/redux/store";
import { Provider } from "react-redux";
import LoginScreen from "./src/screens/LoginScreen";
import Setting from "./src/screens/Setting";
import Register from "./src/screens/Register";
import AddNote from "./src/screens/AddNote";
import ViewNote from "./src/screens/ViewNote";


export default function App() {
  const Stack = createNativeStackNavigator();
  // store.subscribe(() => console.log(store.getState()))

  return (
    <Provider store={store}>
      <TailwindProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home" screenOptions={{contentStyle:{backgroundColor:"#8accb4"}}} >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Setting" component={Setting} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="AddNote" component={AddNote} />
            <Stack.Screen name="View" component={ViewNote} />
          </Stack.Navigator>
        </NavigationContainer>
      </TailwindProvider>
    </Provider>
  );
}
