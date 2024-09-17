import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, {useState} from 'react'

export default function Input({ textInputFocus }) {
  const [text, setText] = useState('');
  const [focus, setFocus] = useState(false);
  const [count, setCount] = useState(0);
  return (
    <View>
      
      <TextInput
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
        style={{borderBottomColor: 'gray', borderBottomWidth: 2}}
      />
        {focus && count > 0 && (
          <Text>{count}</Text>
        )}
        {!focus && count > 0 && (
          <Text>{count >= 3 ? "Thank you" : "Please type more than 3 characters"}</Text>
        )}
        <Button title="Confirm" onPress={() => console.log(text)} />
    </View>
  )
}

const styles = StyleSheet.create({})