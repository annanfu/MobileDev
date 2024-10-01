import { StyleSheet, Text, View, Button } from 'react-native'
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
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerTintColor: "yellow",
          headerStyle: { backgroundColor: "blue" },
        }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: "My Goals",
          }}
        />
        <Stack.Screen
          name="Details"
          component={GoalDetails}
          options={({ route }) => {
            return {
              // conditionally render the title
              title: route.params ? route.params.goalData.text : "More details",
              headerRight: () => {
                return (
                  <Button
                    title="Warning"
                    onPress={() => {
                      console.log("Warning");
                    }}
                  />
                );
              },
            };
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({})