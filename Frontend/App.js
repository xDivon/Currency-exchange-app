import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Image, ActivityIndicator } from "react-native";
import BackGroundPicture from './assets/clouds.jpg'
import Button from "./UI/Button";
import Picker from "./UI/Picker";
import Card from './UI/Card';





export default function App() {
  const API_URL = "http://10.0.0.3:3000/news";
  const origin = ["ILS", "GBP", "USD"];
  const dest = ["ILS", "GBP", "USD","PHP","ITA"];
  



  const [result, setResult] = useState(0); 
  const [amount, setAmount] = useState(null);
  const [originCountry, setOriginCountry] = useState(origin[0]);
  const [destCountry, setDestCountry] = useState(dest[0]);
  const [isValid, setIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [isLoading,setIsLoading] = useState(false)




  const setAmountHandler = (amount) => {
    if (!parseFloat(amount) || amount<0 || amount === ""){
      setErrorMessage("Please Enter valid amount")
      setIsValid(false);
      return;
    }
    setIsValid(true);
    setAmount(amount);
  };



  const sendRequestHandler = () => {
    if(!isValid)
    {
      setResult(0)
      setErrorMessage("Please Enter valid amount")
      return;
    }
    if(originCountry == destCountry)
    {
      setResult(0)
      setErrorMessage("Please change one country")
      return;
    }
    setIsLoading(true)
    fetch(
      `${API_URL}?c1=${encodeURIComponent(originCountry)}&c2=${encodeURIComponent(
        destCountry
      )}&amount=${encodeURIComponent(amount)}`
    )
      .then((response) => {
        return response.json()
      }).catch(function(error){
        setIsLoading(false)
        console.log("1")
        setErrorMessage(error.message)
        return
      })
      .then((data) => {
        if(data)
        {
          setResult(data);
          setIsLoading(false)
          setErrorMessage("")
        
        }
      }).catch(function(error) {
          setIsLoading(false)
          console.log("1")
          setErrorMessage(error.message)
          return
});
  };

  return (
    <View style={styles.container}>
      <Image style={styles.img} source={BackGroundPicture}></Image>
      <Card>
        <View style={styles.pickersView}>
          <Text style={styles.text}>Origin Currency</Text>
          <Picker countries={origin} setCountry={setOriginCountry} flag={originCountry} ></Picker>
          <Text style={styles.text}>dest Currency</Text>
          <Picker countries={dest} setCountry={setDestCountry} flag={destCountry} ></Picker>
        </View >
        <View style={styles.inputView}>
          <Text style={styles.text}>Insert amount to convert:</Text>
          <TextInput placeholderTextColor="#000"  placeholder="Press to insert amount" type="number" style={[styles.input,styles.shadow]} onChangeText={setAmountHandler} />
        </View>
        <View style={styles.resultView}>
          <Text style={styles.result}>{result ?  String(result.toFixed(2))+destCountry : errorMessage }</Text>
        </View >
        {isLoading && <ActivityIndicator size="large" color="#00ff00" />}
        <View style={styles.btnView}>
        <Button getMessage={sendRequestHandler} title="Convert"></Button>
        </View>
      </Card>
      <StatusBar style="auto" />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",

  },
  btnView:{
    width:"100%",
    height:"20%",
    marginLeft: "auto",
    marginRight: "auto",
    justifyContent: "center",

  },
  inputView:{
    width:"100%",
    height:'20%',
  },
  pickersView:{
    width:"100%",
    height:"50%",
    marginLeft: "auto",
    marginRight: "auto",

  },
  resultView:{
    
    width:"100%",
    height:"10%",
    justifyContent:'center'
  },
  img:{
    backgroundColor:'blue',
    width:"100%",
    height:"100%",
    top:0,
    position: 'absolute',
  },
  text:{
    alignSelf:'center',
    width:'40%',
    fontWeight: "bold",    
  },

  result:{
    textAlign:'center',
    margin: 10,
    padding:10,
    width: '70%',
    height: '80%',
    marginLeft: "auto",
    marginRight: "auto",
    borderBottomColor: 'red',
    borderBottomWidth: 2,
    },
    shadow: {
      elevation: 2,
    },
  input: {
    height: "70%",
    width: "60%",
    alignSelf: "center",
    padding: 10,
    margin:10,
    textAlign:'center',

  },
});
