import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Header from './Components/Header';

export default function App() {
  const appName = 'My app'; 
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header name={appName}>
        <Text>My app is great!</Text>
        <Text>It's the best app ever!</Text>
      </Header>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
