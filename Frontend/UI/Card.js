import { StyleSheet, View } from "react-native";


const Card = (props) => {

    return(
        <View style={styles.card}>
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        width: "80%",
        height: "90%",
        borderRadius: 50,
        backgroundColor: "grey",
        marginLeft: "auto",
        marginRight: "auto",
        //justifyContent: "center",
        padding:5,
        flex:0
        
      },
})


export default Card