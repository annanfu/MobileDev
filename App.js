import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Header from './Components/Header';
import React, { useState } from 'react';
import Input from './Components/Input';

export default function App() {
  const [receivedData, setReceivedData] = useState('');
  const appName = 'My app'; 
  // update to receive data (The input data is stored in the local function scope, we
  // need to use the useState hook to store the data in the App component's state
  const handleInputData = (data) => {
    console.log("App.js", data);
    setReceivedData(data);
  };
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header name={appName} />
      <Input textInputFocus={true} inputHandler={handleInputData}/>
      <Text>{receivedData} </Text>
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
