import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { auth } from "../Firebase/firebaseSetup";
import LocationManager from "./LocationManager";
import NotificationManager from "./NotificationManager";

export default function Profile() {


  return (
    <View style={styles.infoContainer}>
      <Text style={styles.info}>{auth.currentUser.email}</Text>
      <Text style={styles.info}>{auth.currentUser.uid}</Text>
      <LocationManager />
      <NotificationManager />
    </View>
  );
}

const styles = StyleSheet.create({});
