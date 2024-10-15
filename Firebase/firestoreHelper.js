import { database } from './firebaseSetup';
import { collection, addDoc } from "firebase/firestore"; 

export async function writeToDB(data, collectionName) {
  try{
    const docRef = await addDoc(collection(database, collectionName), data); 
    // addDoc takes two arguments: a reference to the collection and the data to be added
    // collection takes two arguments: a reference to the database and the name of the collection
    console.log("Document written with ID: ", docRef.id);
  } catch (err) {
  console.log("Write to db", err);
  }

}