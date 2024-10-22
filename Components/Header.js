import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React from 'react'

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

// update the Header component to accept a prop
export default function Header({name}) {
  const { width, height } = useWindowDimensions();
  console.log(width);
  console.log(name)
  return (
    <View>
      <Text style={[styles.text, { paddingVertical: height < 415 ? 0 : 10 }]}></Text>
      <Text style={styles.text}>Welcome to {name}!</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    color: "darkblue",
    fontSize: windowWidth < 380 ? 20 : 26,
    borderColor: "darkblue",
    borderWidth: 2,
    padding: 5,
    marginBottom: 10,
  },
});