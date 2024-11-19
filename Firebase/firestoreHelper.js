import { database } from './firebaseSetup';
import { collection, addDoc, deleteDoc, doc, getDocs, updateDoc, setDoc, getDoc } from "firebase/firestore"; 

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
    deleteAllFromDB(`goals/${deletedId}/users`);
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


export async function getAllDocuments(collectionName) {
  try {
    const querySnapshot = await getDocs(collection(database, collectionName));
    let data = [];
    if(!querySnapshot.empty) {

      querySnapshot.forEach((docSnap) => {
        data.push({ ...docSnap.data(), id: docSnap.id });
      });
  }
  return data;
  } catch (err) {  
    console.log("Get all documents", err);
  }
}

export async function updateDB(docId, data, collectionName) {
  try {
    await setDoc(doc(database, collectionName, docId), data, { merge: true });
    console.log("Document updated with ID: ", docId);
  } catch (err) {
    console.log("Update db", err);
  }
}

export async function getOneDocument(docId, collectionName) {
  try {
    const docSnapshot = await getDoc(doc(database, collectionName, docId));
    if(docSnapshot.exists()) {
      return docSnapshot.data();
    }
  }
  catch (err) {
    console.log("Get one document", err);
  }
}