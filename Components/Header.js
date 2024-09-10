import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

// update the Header component to accept a prop
export default function Header({name, children}) {
  console.log(name, children)
  return (
    <View>
      <Text>Welcome to {name}!</Text>
        {children}
    </View>
  )
}

const styles = StyleSheet.create({})