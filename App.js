import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Header from './Components/Header';
import React, { useState } from 'react';

export default function App() {
  const [text, setText] = useState('');
  const appName = 'My app'; 
  function updateText(changeText) {
    console.log(changeText);
    setText(changeText);
  }
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header name={appName}>
        <Text>My app is great!</Text>
        <Text>It's the best app ever!</Text>
      </Header>
      <TextInput
        autoCorrect={true}
        placeholder="Type something"
        keyboardType="default"
        onChangeText={updateText}
        value={text}
        style={{borderBottomColor: 'gray', borderBottomWidth: 2}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
