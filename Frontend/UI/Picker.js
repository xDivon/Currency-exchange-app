import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Picker } from "../node_modules/@react-native-picker/picker";
import Flag from 'react-native-flags';

const customPicker = (props) => {
  const [selectedValue, setSelectedValue] = useState("");
  const originCorrnciesSymbol = ["₪",`\u00A3`,`\u0024`,`\u20B1`,`\u20AC`]
  const [symbol, setSymbol] = useState(originCorrnciesSymbol[1])


  let flag = props.flag.slice(0, -1)

  return (
    <View style={[styles.container, styles.shadow]}>
        <Flag code={flag}  size={32}/>
        <View style={styles.pickerView}>
      <Picker
        
        style={styles.picker}
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) => {
          setSelectedValue(itemValue);
          props.setCountry(itemValue);
          setSymbol(originCorrnciesSymbol[itemIndex])
        }}
      >
        {props.countries.map((country,index) => {
          return (
            <Picker.Item

              label={`${originCorrnciesSymbol[index]} ${country}`}
              value={country}
              key={country}
            ></Picker.Item>
          );
        })}
      </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  shadow: {
    shadowOffset: { width: 10, height: 10 },
    shadowColor: "black",
    shadowOpacity: 10,
    elevation: 30,
    shadowRadius: 2,

    backgroundColor: "#000", // invisible color
  },
  container: {
    alignSelf: "center",
    width: "80%",
    height: "30%",
    padding: 10,
    alignItems: "center",
    borderWidth: 15,
    borderColor: "blue",
    margin: 10,
    flexDirection: "row",
    borderRadius:20

  },
  picker: {
    width: "80%",
    height: "70%",
    //backgroundColor: "rgb(0, 114, 251)",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop:0
    //position:'relative'
    
  },
  pickerView:{
    width: "80%",
    height: "100%",
    backgroundColor: "rgb(0, 114, 251)",
    borderColor: "black",
    borderWidth: 5,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius:20,
    justifyContent:'center'
    
  },
});

export default customPicker;
