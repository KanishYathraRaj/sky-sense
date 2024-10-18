import { db } from '../../firebaseConfig';
import { collection, addDoc, getDocs, getDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

// Collection reference for users
const userCollectionRef = collection(db, 'users');

// Create User
export const createUser = async (userData) => {
  try {
    const docRef = await addDoc(userCollectionRef, userData);
    return { id: docRef.id, ...userData };
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};

// Get All Users
export const getAllUsers = async () => {
  try {
    const querySnapshot = await getDocs(userCollectionRef);
    const users = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return users;
  } catch (error) {
    console.error("Error fetching users: ", error);
    throw error;
  }
};

// Get User By ID
export const getUserById = async (userId) => {
  try {
    const userDocRef = doc(db, 'users', userId);
    const userSnapshot = await getDoc(userDocRef);
    if (userSnapshot.exists()) {
      return { id: userId, ...userSnapshot.data() };
    } else {
      console.error("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user by ID: ", error);
    throw error;
  }
};

// Update User
export const updateUser = async (userId, updatedData) => {
  try {
    const userDocRef = doc(db, 'users', userId);
    await updateDoc(userDocRef, updatedData);
    return { id: userId, ...updatedData };
  } catch (error) {
    console.error("Error updating user: ", error);
    throw error;
  }
};

// Delete User
export const deleteUser = async (userId) => {
  try {
    const userDocRef = doc(db, 'users', userId);
    await deleteDoc(userDocRef);
    return true;
  } catch (error) {
    console.error("Error deleting user: ", error);
    throw error;
  }
};
