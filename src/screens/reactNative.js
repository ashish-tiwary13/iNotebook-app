// issues with ScrollView
issue: "height and width of the scrollview are not working";
solution: "wrap scrollview with a view and give height and width to the view";


// asyncStorage:

// yarn add @react-native-community/async-storage
import AsyncStorage from '@react-native-community/async-storage';
const storeData = async () => {
    try {
        await AsyncStorage.setItem('name', 'Tom');
        console.log("data saved");
      } catch (error) {
    }
}

 const retrieveData = async () => {
  try {
      const value = await AsyncStorage.getItem('name');
      if (value !== null) {
          console.log(value);
      }
  } catch (error) {
  }
}