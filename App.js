import { StatusBar } from 'expo-status-bar';
import { Button, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import Header from './Components/Header';
import React, { useState } from 'react';
import Input from './Components/Input';

export default function App() {
  const [receivedData, setReceivedData] = useState('');
  const [visible, setVisible] = useState(false);
  const [goals, setGoals] = useState([]);
  const appName = 'My app'; 
  // update to receive data (The input data is stored in the local function scope, we
  // need to use the useState hook to store the data in the App component's state
  const handleInputData = (data) => {
    console.log("App.js", data);
    let newGoal = {text: data, id: Math.random()};
    // make a new obj and store the received data as the obj's text property
    //const newGoals = [...goals, newGoal];
    //setGoals(newGoals);  // asynchrnous function which will be updated in the next render cycle
    setGoals((currentGoals) => [...currentGoals, newGoal]); // update the status based on the previous state
    //setReceivedData(data);
    setVisible(false);
  };
  const handleCancel = () => {
    setVisible(false);
  }
  return (
    <SafeAreaView style={styles.container}>

      <StatusBar style="auto" />
      <View style={styles.topView}>
        <Header name={appName} />
        <Button title="Add a Goal" onPress={() => setVisible(true)}/>
        <Input 
          textInputFocus={true}
          inputHandler={handleInputData}
          visibility={visible}
          cancelHandler={handleCancel}
          />
      </View>

        <View style={styles.bottomView}>
          <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            {/* user goals.map() and return a view and a text for each array item*/}
            {goals.map((goalObject) => (
              <View style={styles.textContainer} key={goalObject.id}> 
                <Text style={styles.text}>{goalObject.text}</Text>
              </View>))}
          </ScrollView>
        </View>
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'darkblue',
    fontSize: 50,
    padding: 50,
  },
  topView:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomView:{
    color: 'white',
    backgroundColor: 'darkblue',
    flex:4,
    // alignItems: 'center', if using this the scroll will be inside the bottomView
   },
  textContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    marginTop: 20,

  },
  scrollViewContainer: {
    alignItems: 'center',
  },
});
