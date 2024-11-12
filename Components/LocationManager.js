import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import * as Location from "expo-location";



export default function LocationManager() {
    const [response, requestPermission] = Location.useForegroundPermissions();
    const [location, setLocation] = useState(null);
    // check if the user has granted permission to location
    async function verifyPermission() {

        if (response.granted) {
            return true;
        }
        const permissionResponse = await requestPermission();
        return permissionResponse.granted;
    }

    // get the current location of the user
    async function locateUserHandler() {
        try {
            const hasPermission = await verifyPermission();
            if (!hasPermission) {
                Alert.alert("You need to give permission to access location");
                return;
            }
            const response = await Location.getCurrentPositionAsync();
            setLocation({latitude: response.coords.latitude, longitude: response.coords.longitude});
            console.log(location);
        } catch (error) {
            console.log(error);
        }
    }



  return (
    <View>
      <Button title="Find My Location" onPress={locateUserHandler} />
    </View>
  );
}

const styles = StyleSheet.create({})