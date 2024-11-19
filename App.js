import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import Home from './Components/Home'
import GoalDetails from './Components/GoalDetails'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Signup from './Components/Signup'
import Login from './Components/Login'
import { app, auth } from './Firebase/firebaseSetup'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useEffect, useState, useLayoutEffect } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import PressableButton from './Components/PressableButton';
import Profile from './Components/Profile';
import Map from './Components/Map';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async() => {
  return {
    shouldShowAlert: true,
  };
  }
});

const Stack = createNativeStackNavigator(); // don't need to put in the component to avoid re-rendering

const authStack = (
  <>
    <Stack.Screen name="Signup" component={Signup} />
    <Stack.Screen name="Login" component={Login} />
  </>

)
const appStack = (
  <>
    <Stack.Screen
      name="Home"
      component={Home}
      options={({ navigation }) => ({
        title: "Profile",
        headerRight: () => (
          <PressableButton
            pressedHandler={() => navigation.navigate("Profile")}
          >
            <AntDesign name="user" size={24} color="black" />
          </PressableButton>
        ),
      })}
    />
    <Stack.Screen
      name="Details"
      component={GoalDetails}
      /*
          options={({ route }) => {
            return {
              // conditionally render the title
              title: route.params ? route.params.goalData.text : "More details",
              /* headerRight: () => {
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
          }}*/
    />
    <Stack.Screen
      name="Profile"
      component={Profile}
      options={{
        headerRight: () => (
          <PressableButton pressedHandler={() => signOut(auth)}>
            <AntDesign name="logout" size={24} color="black" />
          </PressableButton>
        ),
      }}
    />
    <Stack.Screen name="Map" component={Map} />
  </>
);






export default function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setIsUserLoggedIn(true);
        console.log("User is signed in");
      } else {
        // User is signed out
        setIsUserLoggedIn(false);
      }
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerTintColor: "yellow",
          headerStyle: { backgroundColor: "skyblue" },
        }}
      >
        {isUserLoggedIn ? appStack : authStack}

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({})