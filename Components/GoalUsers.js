import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useEffect, useState } from "react";
import { writeToDB } from '../Firebase/firestoreHelper';

export default function GoalUsers({id}) {
    const [users, setUsers] = useState([]);
    useEffect(() => {
          // fetch data
      async function fetchData() {
        try {
          const response = await fetch(
            "https://jsonplaceholder.typicode.com/users/"
          );
          // promise is not getting rejected if there is an HTTP error (status code 4xx or 5xx)
          // we need to check response.ok
          console.log(response.status);
          if (!response.ok) {
            throw new Error(`An HTTP error occurred: ${response.status}`); // will be caught by the catch block
          }
          // this code will only run if the response is ok
          // extract the JSON from the response
          const data = await response.json(); // get back javascript object
          data.map((user) => {
            writeToDB(user, `goals/${id}/users`)
          });

          // set the users state variable from the data
          setUsers(data);
          //console.log(data[0].name);
        } catch (err) {
        console.log("fetch user data ", err);
        }
    }
    fetchData();
    }, []);
    
  return (
    <View>
        <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
          </View>
        )}
        />
    </View>
  )
}

const styles = StyleSheet.create({})