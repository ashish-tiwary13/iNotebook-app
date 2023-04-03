import {SafeAreaView, StyleSheet, Text, View, Platform, StatusBar,} from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const Setting = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <View>
        <Text>Setting</Text>
      </View>
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

export default Setting;
