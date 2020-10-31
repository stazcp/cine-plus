import React, { createContext, useState } from 'react'
import firebase from 'firebase'
import 'firebase/firestore'
let keys

if (process.env.node_env === 'production') {
  keys = process.env
} else {
  keys = require('../keys.json')
}

const {
  firebase_api_key,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId,
  firebase_api_id,
} = keys

// move these to keys
firebase.initializeApp({
  apiKey: firebase_api_key,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId,
  appId: firebase_api_id,
})

// export const user = firebase.auth().currentUser

const db = firebase.firestore()
export const FirebaseContext = createContext(db)
const provider = new firebase.auth.GoogleAuthProvider()

// composition
export function FirebaseProvider({ children }) {
  firebase.auth().onAuthStateChanged((user) => setUser(user))
  const [user, setUser] = useState()

  // item can be person, movie, or show
  const favorite = async (item, type) => {
    if (user) {
      try {
        const docRef = db.collection('users').doc(user.email)
        const doc = await docRef.get()
        if (!doc.exists) {
          return null
        }
        if (type === 'movie') {
          const { favoriteMovies } = doc.data()
          await docRef.set(
            {
              favoriteMovies: [...favoriteMovies, item.id],
            },
            { merge: true }
          )
        } else if (type === 'tv') {
          const { favoriteShows } = doc.data()
          await docRef.set(
            {
              favoriteShows: [...favoriteShows, item.id],
            },
            { merge: true }
          )
        } else if (type === 'person') {
          const { favoriteActors } = doc.data()
          await docRef.set(
            {
              favoriteActors: [...favoriteActors, item.id],
            },
            { merge: true }
          )
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      console.log('no user')
    }
  }

  //add new user to database and set schema
  const newUser = async (email) => {
    try {
      const docRef = db.collection('users').doc(email)
      await docRef.set({
        favoriteMovies: [],
        favoriteShows: [],
        favoriteActors: [],
      })
    } catch (error) {}
  }

  const getFavoriteMovies = async () => {
    const docRef = db.collection('users').doc(user.email)
    const doc = await docRef.get()
    const { favoriteMovies } = doc.data()
    return favoriteMovies
  }

  const getFavoriteShows = async () => {
    const docRef = db.collection('users').doc(user.email)
    const doc = await docRef.get()
    const { favoriteShows } = doc.data()
    return favoriteShows
  }

  const getFavoriteActors = async () => {
    const docRef = db.collection('users').doc(user.email)
    const doc = await docRef.get()
    const { favoriteActors } = doc.data()
    return favoriteActors
  }

  return (
    <FirebaseContext.Provider
      value={{
        db,
        provider,
        user,
        favorite,
        newUser,
        getFavoriteMovies,
        getFavoriteShows,
        getFavoriteActors,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  )
}
