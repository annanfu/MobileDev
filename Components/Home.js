import { StatusBar } from "expo-status-bar";
import {
  Button,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  Pressable,
  Platform,
} from "react-native";
import { useEffect } from "react";  
import Header from "./Header";
import React, { useState } from "react";
import Input from "./Input";
import GoalItem from "./GoalItem";
import PressableButton from "./PressableButton";
import { database } from "../Firebase/firebaseSetup";
import { writeToDB, deleteFromDB } from "../Firebase/firestoreHelper";
import { collection, query, where, onSnapshot } from "firebase/firestore";

export default function Home( {navigation} ) {
  const [receivedData, setReceivedData] = useState("");
  const [visible, setVisible] = useState(false);
  const [goals, setGoals] = useState([]);
  const appName = "My app";

  // onSnapshot is a listener that listens to changes in the database
  // It takes a query as an argument and a callback function that will be called
  useEffect(() => {
    onSnapshot(collection(database, "goals"), (querySnapshot) => {
      let newArray = [];
      querySnapshot.forEach((docSnapshot) => {
        console.log(docSnapshot.id);
        newArray.push({ ...docSnapshot.data(), id: docSnapshot.id });
        console.log(newArray);
      });
      setGoals(newArray);
    });
  }, []);

  // update to receive data (The input data is stored in the local function scope, we
  // need to use the useState hook to store the data in the App component's state
  const handleInputData = (data) => {
    console.log("App.js", data);
    let newGoal = { text: data };
    writeToDB(newGoal, "goals"); // write the new goal to the database
    // make a new obj and store the received data as the obj's text property
    //const newGoals = [...goals, newGoal];
    //setGoals(newGoals);  // asynchrnous function which will be updated in the next render cycle
    //setGoals((currentGoals) => [...currentGoals, newGoal]); // update the status based on the previous state
    //setReceivedData(data);

  };
  const handleCancel = () => {
    setVisible(false);
  };
  function handleDelete(deletedId) {
    //console.log("App.js knows that the goal with id", deletedId, "is deleted");
    //setGoals((prevGoals) =>
    //  prevGoals.filter((goalObj) => goalObj.id !== deletedId)
    //); // update the status based on the previous state
    deleteFromDB(deletedId, "goals");
  }
  function handleDeleteAll() {
    Alert.alert("Confirm Delete All", "Are you sure to delete all?", [
      {
        text: "No",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => {
          setGoals([]);
        },
      },
    ]);
  }

/*
function handleGoalPress(pressedGoal) {  // navigate to the GoalDetails screen
    // receive the goalObj from the GoalItem component
    console.log('pressedGoal', pressedGoal);
    navigation.navigate('Details', {goalData: pressedGoal}); // param is an object
    }
*/


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.topView}>
        <Header name={appName} />
        <PressableButton
          componentStyle={{ backgroundColor: "purple" }}
          pressedHandler={() => setVisible(true)}
        >
          <Text style={styles.buttonText}>Add a Goal</Text>
        </PressableButton>

        <Input
          textInputFocus={true}
          inputHandler={handleInputData}
          visibility={visible}
          cancelHandler={handleCancel}
        />
      </View>

      <View style={styles.bottomView}>
        <FlatList
          ItemSeparatorComponent={({ highlighted }) => (
              <View
                style={[
                  styles.separator,
                  highlighted && styles.separatorHighlighted
                ]}
              />
            )
          }
          ListEmptyComponent={
            <Text style={styles.textList}>No goals to show</Text>
          }
          ListHeaderComponent={
            goals.length > 0 && <Text style={styles.textList}>Goals</Text>
          }
          ListFooterComponent={
            goals.length > 0 && (
              <Button onPress={handleDeleteAll} title="Delete all" />
            )
          }
          contentContainerStyle={styles.scrollViewContainer}
          data={goals}
          renderItem={({ item, separators }) => {
            // destructure the item from receivedObj
            // (console.log(receivedObj))
            return (
              <GoalItem
                deleteHandler={handleDelete}
                navigation={navigation}
                goalObj={item}
                onPressIn={separators.highlight}
                onPressOut={separators.unhighlight}
              />
            );
          }}
        />
        {/* <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            // user goals.map() and return a view and a text for each array item*
            {goals.map((goalObject) => (
              <View style={styles.textContainer} key={goalObject.id}> 
                <Text style={styles.text}>{goalObject.text}</Text>
              </View>))}
          </ScrollView> 
          */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: 'center',
    justifyContent: "center",
  },
  text: {
    color: "darkblue",
    fontSize: 50,
    padding: 50,
  },
  textList: {
    color: "yellow",
    fontSize: 20,
    padding: 10,
  },
  topView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomView: {
    color: "white",
    backgroundColor: "darkblue",
    flex: 4,
    // alignItems: 'center', if using this the scroll will be inside the bottomView
  },
  textContainer: {
    backgroundColor: "white",
    borderRadius: 20,
  },
  scrollViewContainer: {
    alignItems: "center",
  },
  separator: {
    backgroundColor: "yellow",
    height: 3,
  },
  separatorHighlighted: {
    backgroundColor: "purple",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
});
