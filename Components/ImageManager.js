import { Button, StyleSheet, Text, View, Image } from 'react-native';
import React, {useState} from 'react';
import * as ImagePicker from "expo-image-picker";

// receive the callback from the Input
export default function ImageManager( {receiveImageUri} ) {
    const [response, requestPermission] = ImagePicker.useCameraPermissions();
    const [imageUri, setImageUri] = useState("");
    async function verifyPermission() {
        try{
        console.log(response);
        // check if the user has granted permission to camera
        // if so, return true
        if (response.granted) {
            return true;
        }
        // if not ask for permission and return what the user has chosen
        const permissionResponse = await requestPermission();

        console.log(permissionResponse);
        return permissionResponse.granted;
    } catch (error) {
        console.log("verify permission:", error);
    }

    }

    async function takeImageHandler() {
        try {
        // only launch camera if the user has granted permission to camera
            const hasPermission = await verifyPermission();
            console.log(hasPermission);
            if (!hasPermission) {
                Alert.alert("You need to give permission to launch camera");
                return;
            }
            const result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
            });
            console.log(result);
            // read the first element from assets array, and access its uri property
            console.log(result.assets[0].uri);
            if (!result.canceled) {
                setImageUri(result.assets[0].uri);
            }
            receiveImageUri(result.assets[0].uri);

        }
        catch (error) {
            console.log(error);
        }
    }
  return (
    <View>
        <Button 
        title="Take An Image"
        onPress={() => {
            takeImageHandler();
        }}
        />
        {imageUri && <Image
        source={{uri: imageUri}}
        style={styles.image}
        alt="preview of the image taken"
        />
        }
    </View>
  )
}

const styles = StyleSheet.create({ image: { width: 100, height: 100 } });