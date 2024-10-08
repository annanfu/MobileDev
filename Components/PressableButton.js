import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function PressableButton({
  children,
  componentStyle,
  pressedHandler,
  pressedStyle,
}) {
  return (
    <Pressable
      onPress={pressedHandler}
      style={({ pressed }) => [         // the function can only apply to the style prop in the Pressable component
        styles.defaultStyle,  // default style
        componentStyle,
        pressed && styles.defaultPressedStyle,  // default onpressed style
        pressed && pressedStyle,
      ]}
    >
      <View>{children}</View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
    defaultStyle: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: 'skyblue',
    },
    defaultPressedStyle: {  
        backgroundColor: 'pink',
        opacity: 0.5,
    },
})