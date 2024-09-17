import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import Header from './Components/Header';
import React, { useState } from 'react';
import Input from './Components/Input';

export default function App() {
  const [receivedData, setReceivedData] = useState('');
  const [visible, setVisible] = useState(false);
  const appName = 'My app'; 
  // update to receive data (The input data is stored in the local function scope, we
  // need to use the useState hook to store the data in the App component's state
  const handleInputData = (data) => {
    console.log("App.js", data);
    setReceivedData(data);
    setVisible(false);
  };
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header name={appName} />
      <Button title="Add a Goal" onPress={() => setVisible(true)}/>
      <Input 
        textInputFocus={true}
        inputHandler={handleInputData}
        visibility={visible}
        />
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
