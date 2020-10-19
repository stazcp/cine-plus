import React, { createContext, useState } from 'react'
import firebase from 'firebase'
import 'firebase/firestore'

firebase.initializeApp({
  apiKey: 'AIzaSyDdS5fvH8ExrjqF8DCmIbNuKgTdRWg_4zs',
  authDomain: 'cine-plus-6090b.firebaseapp.com',
  databaseURL: 'https://cine-plus-6090b.firebaseio.com',
  projectId: 'cine-plus-6090b',
  storageBucket: 'cine-plus-6090b.appspot.com',
  messagingSenderId: '72873491968',
  appId: '1:72873491968:web:c15487bc930230b0bee2e5',
})

// export const user = firebase.auth().currentUser

const db = firebase.firestore()
export const FirebaseContext = createContext(db)
const provider = new firebase.auth.GoogleAuthProvider()
// composition
export function FirebaseProvider({ children }) {
  firebase.auth().onAuthStateChanged((user) => setUser(user))
  const [user, setUser] = useState()
  return (
    <FirebaseContext.Provider value={{ db, provider, user }}>{children}</FirebaseContext.Provider>
  )
}
