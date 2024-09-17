import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

// update the Header component to accept a prop
export default function Header({name}) {
  console.log(name)
  return (
    <View>
      <Text>Welcome to {name}!</Text>
    </View>
  )
}

const styles = StyleSheet.create({})