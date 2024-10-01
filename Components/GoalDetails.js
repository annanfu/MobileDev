import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function GoalDetails({navigation, route}) {
  console.log(route.params.goalData);
  return (
    <View>
      <Text>
        Goal Details This is details of a goal with text{" "}
        {route.params.goalData.text} and id {route.params.goalData.id}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({})