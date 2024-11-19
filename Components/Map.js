import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useState } from "react";
import MapView, { Marker } from "react-native-maps";

export default function Map({navigation}) {
  const [selectedLocation, setSelectedLocation] = useState(null);
  function confirmHandler() {
    // navigate to Porfile send the selected location to the server
    navigation.navigate("Profile", { selectedLocation });
  };

  return (
    <>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={(e) => {
          setSelectedLocation({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
          });
        }}
      >
        <Marker coordinate={selectedLocation} />
      </MapView>
      <Button
        disabled={!selectedLocation}
        title="Confirm Selected Location"
        onPress={confirmHandler}
      />
    </>
  );

}

const styles = StyleSheet.create({

})