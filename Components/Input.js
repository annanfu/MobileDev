import { Button, Modal, StyleSheet, Text, TextInput, View, Alert, Image } from 'react-native'
import React, {useState} from 'react'
import ImageManager from './ImageManager';

export default function Input({ textInputFocus, inputHandler, visibility, cancelHandler }) {
  const [text, setText] = useState('');
  const [focus, setFocus] = useState(false);
  const [count, setCount] = useState(0);
  const [imageUri, setImageUri] = useState("");


  function handleConfirm() {
    // console.log(text);
    // call the callback function you received from App.js and pass the text that user has typed
    inputHandler({text: text, imageUri: imageUri});
    setText('');
    setCount(0);
  }
  function handleCancel() {
    setText('');
    setCount(0);
    Alert.alert('Confirm Cancel', 'Are you sure to cancel?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {text: 'OK', onPress: () => {cancelHandler()}},
    ])
  }
  function receiveImageUri(uri) {
    setImageUri(uri);
    console.log(uri);
  }
  return (
    <Modal animationType='slide' visible={visibility} transparent={true}>
    <View style={styles.container}>
      <View style={styles.innerContainer}>
      <Image 
        source={{uri: "https://cdn-icons-png.flaticon.com/512/2617/2617812.png"}}
        style={styles.image}
        alt="icon"
      />
      <Image
        source={require('../assets/2617812.png')}
        style={styles.image}
        alt="icon"
      />

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
        <ImageManager
          receiveImageUri={receiveImageUri}
        />

        <View style={{flexDirection: 'row', gap: 20} }>
          <Button title="Cancel" onPress={handleCancel} />
          <Button title="Confirm" disabled={count < 3} onPress={handleConfirm} />
        </View>
      </View>
    </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    margin: 10,
    borderColor: 'gray',
    borderWidth: 2,
    padding: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
  innerContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
});