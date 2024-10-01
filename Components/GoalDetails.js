import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'

export default function GoalDetails({navigation, route}) {
  console.log(route);
    function moreDetailsHandler() {
        // navigation.navigate('Details'); Error without params, goalData is undefined
        navigation.push("Details");
    }

  return (
    <View>
      {route.params ? (
        <Text>
          Goal Details This is details of a goal with text{" "}
          {route.params.goalData.text} and id {route.params.goalData.id}
        </Text>
      ) : (
        <Text>More details</Text>
      )}
      <Button title="More Details" onPress={moreDetailsHandler} />
    </View>
  );
}

const styles = StyleSheet.create({})