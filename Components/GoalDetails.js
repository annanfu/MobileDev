import { StyleSheet, Text, View, Button, Image} from 'react-native'
import React from 'react'
import { useState, useLayoutEffect, useEffect } from "react";
import PressableButton from './PressableButton';
import AntDesign from "@expo/vector-icons/AntDesign";
import { updateGoalWarning } from '../Firebase/firestoreHelper';
import GoalUsers from './GoalUsers';
import { storage } from '../Firebase/firebaseSetup'; 
import { ref, getDownloadURL } from 'firebase/storage'; 

export default function GoalDetails({navigation, route}) {
  const [warning, setWarning] = useState(false);
  const [imageUri, setImageUri] = useState("");
 console.log(route);
    function moreDetailsHandler() {
        // navigation.navigate('Details'); Error without params, goalData is undefined
        navigation.push("Details");
    }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <PressableButton
          pressedHandler={async() => {
            await updateGoalWarning(route.params.goalData.id, 'goals');
            setWarning(true);
          }}
        >
          <AntDesign name="warning" size={24} color="black" />
        </PressableButton>
        /*<Button
          title="Warning"
          onPress={() => {
            setWarning(true);
          }}
        /> */
      ),
      title: warning
        ? "Warning!"
        : route.params
        ? route.params.goalData.text
        : "More details",
    });
  } , [warning, navigation, route]);


  useEffect(() => {
    async function getImageUri() {
      try {
      if (route.params && route.params.goalData.imageUri) {
        const imageRef = ref(storage, route.params.goalData.imageUri);
        const httpsImageUri = await getDownloadURL(imageRef);
        console.log(httpsImageUri);
        setImageUri(httpsImageUri);
      }
    } catch (error) {
      console.log(error);
    }
    }
    getImageUri();

    
  }, []);


  return (
    <View>
      {route.params ? (
        <Text style={warning && styles.text}>
          Goal Details This is details of a goal with text{" "}
          {route.params.goalData.text} and id {route.params.goalData.id}
        </Text>
      ) : (
        <Text style={warning && styles.text}>More details</Text>
      )}
      <Button title="More Details" onPress={moreDetailsHandler} />
      {route.params && <GoalUsers id={route.params.goalData.id} />}
      {imageUri && (
        <Image
          source={{
            uri: imageUri,
          }}
          style={styles.image}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: 'red',
  },
  image: {
    width: 100,
    height: 100,
  },
})