import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import * as Notifications from "expo-notifications";



export default function NotificationManager() {
  async function verifyPermission() {
    try {
      const response = await Notifications.getPermissionsAsync();
      if (response.granted) {
        return true;
      }
      const newResponse = await Notifications.requestPermissionsAsync();
      return newResponse.granted;
    } catch (err) {
      console.log("permission ", err);
    }
  }

  async function scheduleNotificationHandler() {
    try {
      const hasPermission = await verifyPermission();
      if(!hasPermission) {
        Alert.alert("You need to give permission to access notifications");
        return;
      }
      await Notifications.scheduleNotificationAsync({
        content: { body: "First Notification", title: "This is My First Notification" },
        trigger: { seconds: 3 },
      });
    } catch (err) {
      console.log("schedule notification ", err);
    }
  }


  return (
    <View>
      <Button title="Schedule a Notification" onPress={scheduleNotificationHandler} />
    </View>
  )
}

const styles = StyleSheet.create({})