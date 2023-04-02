import { StyleSheet, Text, View } from 'react-native'
import React,{useState} from 'react'

const Card = (props) => {
    // const [title, setTitle] = useState("title");
    // const [description, setDescription] = useState("description");
    // const [tag, setTag] = useState("tag");
    const {note} = props;
    console.log("note"+note);
    // for(let i=0;i<note.length;i++){
    // console.log("note"+note[i].title);
    // }
  return (
    <View className="my-4" style={styles.cardContainer}>
      <View style={styles.card}>
        <Text className="text-xl" style={styles.cardText}>
            {/* {!note.title? "title": note.title} */}
        </Text>
        <Text className="text-lg" style={styles.cardText}>
            {/* {!note.description? "description": note.description} */}
        </Text>
        <Text className="text-sm" style={styles.cardText}>
            {/* {!note.tag? "tag": note.tag} */}
        </Text>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
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
})

export default Card
