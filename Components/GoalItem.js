import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'

export default function GoalItem({goalObj, deleteHandler, pressHandler}) {
  function handleDelete() { // need a callback function that passed to the parent component
    console.log('Delete')
    deleteHandler(goalObj.id);
  }

  function handlePress() {
    pressHandler();
  }
  return (
    <View style={styles.textContainer}>
      <Text style={styles.text}>{goalObj.text}</Text>
      <Button title="X" color="grey" onPress={handleDelete} />
      <Button title="i" color="grey" onPress={handlePress} />
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
    flexDirection: 'row',
    alignContent: 'center',  // center the text and button
  },

})