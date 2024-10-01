import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Home from './Components/Home'
import GoalDetails from './Components/GoalDetails'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'



const Stack = createNativeStackNavigator(); // don't need to put in the component to avoid re-rendering
console.log(Stack);


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'My Goal',
            headerStyle: {
              backgroundColor: 'darkblue',
            },
            headerTintColor: 'yellow',
            }} />
        <Stack.Screen name="Details" component={GoalDetails} options={{title: 'Goal Details'}} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({})