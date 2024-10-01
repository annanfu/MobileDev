import { StyleSheet, Text, View, Button} from 'react-native'
import React from 'react'
import { useState, useLayoutEffect } from "react";

export default function GoalDetails({navigation, route}) {
  const [warning, setWarning] = useState(false);
  console.log(route);
    function moreDetailsHandler() {
        // navigation.navigate('Details'); Error without params, goalData is undefined
        navigation.push("Details");
    }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="Warning"
          onPress={() => {
            setWarning(true);
          }}
        />
      ),
      title: warning ? "Warning!" : (route.params ? route.params.goalData.text : "More details"),
    });
  } , [warning, navigation, route]);



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
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: 'red',
  },

})