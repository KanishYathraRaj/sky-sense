import { db } from '../../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

export const handleWriteToFirestore = async (count) => {  // Accept count as a parameter
    try {
      // Add a new document to the "counts" collection
      const docRef = await addDoc(collection(db, "counts"), {
        count: count,
        timestamp: new Date()
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
};
