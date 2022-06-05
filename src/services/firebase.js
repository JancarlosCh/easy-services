// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  collection,
  getDocs,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTAv8drOHh8763CXBkDNttLqn0M9M7OZs",
  authDomain: "easy-services-f0f80.firebaseapp.com",
  projectId: "easy-services-f0f80",
  storageBucket: "easy-services-f0f80.appspot.com",
  messagingSenderId: "867306564044",
  appId: "1:867306564044:web:5471b0dd705d4e01f51569",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

//collection
const dataCollection = collection(db, "service_requests");

export const database = () => {
  
  const getRecords = async (id) => {
    try {
      const response = query(dataCollection, where("user_id", "==", id));

      const querySnapshot = await getDocs(response);

      const records = querySnapshot.docs.map((record) => ({
        record_id: record.id,
        data: record.data(),
      }));

      return records;
    } catch (error) {
      console.log(error);
    }
  };

  const insertRecord = async (recordData) => {
    try {
      const response = await addDoc(
        collection(db, "service_requests"),
        recordData
      );
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const updateRecord = async (data) => {
    try {
      await updateDoc(doc(db, "service_requests", data.id), data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteRecord = async (id) => {
    try {
      const response = await deleteDoc(doc(dataCollection, id));
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return { getRecords, insertRecord, updateRecord, deleteRecord };
};
