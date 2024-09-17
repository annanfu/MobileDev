import { Button, Modal, StyleSheet, Text, TextInput, View } from 'react-native'
import React, {useState} from 'react'

export default function Input({ textInputFocus, inputHandler, visibility }) {
  const [text, setText] = useState('');
  const [focus, setFocus] = useState(false);
  const [count, setCount] = useState(0);
  function handleConfirm() {
    // console.log(text);
    // call the callback function you received from App.js and pass the text that user has typed
    inputHandler(text);
  }

  return (
    <Modal animationType='slide' visible={visibility}>
    <View style={styles.container}>
      
      <TextInput
        style={styles.input}
        autoFocus={textInputFocus}
        autoCorrect={true}
        placeholder="Type something"
        keyboardType="default"
        value={text}
        onChangeText={(changeText) => {
          setText(changeText);
          setCount(changeText.length);
        }}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
        {focus && count > 0 && (
          <Text>{count}</Text>
        )}
        {!focus && count > 0 && (
          <Text>{count >= 3 ? "Thank you" : "Please type more than 3 characters"}</Text>
        )}
        <Button title="Confirm" onPress={handleConfirm} />
    </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderColor: 'gray',
    borderWidth: 2,
    padding: 10,
  }
});