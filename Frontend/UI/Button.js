import { StyleSheet, Text, Pressable } from "react-native";

const Button = (props) => {


  return (
    <Pressable style={styles.btn} onPress={props.getMessage}>
      <Text style={styles.text}>{props.title}</Text>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  btn: {
    backgroundColor: "blue",
    color: "white",
    padding: "2%",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 25,
    fontWeight: "bold",
    width: "40%",
    height: "40%",
    alignSelf: "center",
    top:"1%",
    position:'absolute'
    },

  text:{
      color:"white",
  }
});
export default Button;


