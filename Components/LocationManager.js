import { StyleSheet, Text, View, Button, Image } from 'react-native'
import { Dimensions } from "react-native";
import React, { useEffect, useState } from 'react'
import * as Location from "expo-location";
import { useNavigation, useRoute } from "@react-navigation/native";


const windowWidth = Dimensions.get("window").width;

const mapsApiKey = process.env.EXPO_PUBLIC_mapsApiKey;


export default function LocationManager() {
    // as LocationManager is not a screen, we need to use the navigation and route hooks
    const navigation = useNavigation();
    const route = useRoute();
    const [response, requestPermission] = Location.useForegroundPermissions();
    const [location, setLocation] = useState(null);

    useEffect(() => {
      if (route.params) {
      setLocation(route.params?.selectedLocation);
      }
    }, [route]);

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
  if (location)console.log(`https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location.latitude},${location.longitude}&key=${mapsApiKey}`);
  
  return (
    <View>
      <Button title="Locate Me" onPress={locateUserHandler} />
      <Button 
        title="Let me choose on the map"
        onPress={() => {
            navigation.navigate("Map");
        }}
      />
      {location && (
        <Image
          source={{
            uri: `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location.latitude},${location.longitude}&key=${mapsApiKey}`,
          }}
          style={styles.image}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 200,
    width: windowWidth,
  },

})