import { StyleSheet, Text, View, Button, Pressable } from 'react-native'
import React from 'react'

export default function GoalItem({goalObj, deleteHandler, navigation}) {
  function handleDelete() { // need a callback function that passed to the parent component
    console.log('Delete')
    deleteHandler(goalObj.id);
  }

  /*function handlePress() {
    // callback function that passed to the parent component
    // pass the goalObj back to the parent component Home.js
    pressHandler(goalObj);
  } */
 function handlePress() {
    // navigate to the GoalDetails screen
    navigation.navigate('Details', {goalData: goalObj});
  }
  return (
    <View style={styles.textContainer}>
      <Pressable
        onPress={handlePress}
        style={({pressed}) => [
        styles.horizontalContainer,  // define the style comes first
        pressed && styles.pressedStyle,  // conditional style comes last
        ]
      }
        android_ripple={{color: 'yellow', radius: 30}}>
        <Text style={styles.text}>{goalObj.text}</Text>
        <Button title="X" color="grey" onPress={handleDelete} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: 'darkblue',
    fontSize: 20,
    padding: 5,
  },
  textContainer: {
    backgroundColor: 'white',
    borderRadius: 5,
    margin: 20,
    flexDirection: 'row', // only apply to the direct children
    alignContent: 'center',  // center the text and button
  },
  horizontalContainer: {
    flexDirection: 'row',
    //justifyContent: 'space-between',
    alignItems: 'center', // vertical alignment
  },
  pressedStyle: {
    opacity: 0.5,
    backgroundColor: 'red',
  },
})