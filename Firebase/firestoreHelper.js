import { database } from './firebaseSetup';
import { collection, addDoc, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore"; 

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

export async function deleteFromDB(deletedId, collectionName) {
  try {
    await deleteDoc(doc(database, collectionName, deletedId));
    console.log("Document deleted with ID: ", deletedId);
  } catch (err) {
    console.log("Delete from db", err);
  }
}

export async function deleteAllFromDB(collectionName) {
  try{
    const querySnapshot = await getDocs(collection(database, collectionName));
    querySnapshot.forEach((docSnapshot) => {
    deleteFromDB(docSnapshot.id, collectionName);
  });
}catch (err) {
  console.log("Delete all from db", err);
}} 

export async function updateGoalWarning(goalId, collectionName) {
    try {
        await updateDoc(doc(database, collectionName, goalId), {
          warning: true,
        });
        console.log("Document updated with ID: ", goalId);
    } catch (err) {
        console.log("Update goal warning", err);
    }
}