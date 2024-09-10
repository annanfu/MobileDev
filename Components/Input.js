import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, {useState} from 'react'

export default function Input() {
  const [text, setText] = useState('');
  return (
      <TextInput
        autoCorrect={true}
        placeholder="Type something"
        keyboardType="default"
        value={text}
        onChangeText={(changeText) => {
        console.log(changeText);
        setText(changeText);
        }}
        style={{borderBottomColor: 'gray', borderBottomWidth: 2}}
      />
  )
}

const styles = StyleSheet.create({})