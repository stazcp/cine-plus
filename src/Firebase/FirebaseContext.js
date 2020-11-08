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

  const transformType = (type) => {
    switch (type) {
      case 'movie':
        return 'favoriteMovies'
      case 'tv':
        return 'favoriteShows'
      case 'person':
        return 'favoriteActors'
      default:
        return null
    }
  }

  // item can be person, movie, or show
  const favorite = async (eleId, type) => {
    if (user) {
      try {
        const docRef = db.collection('users').doc(user.email)
        const doc = await docRef.get()
        if (!doc.exists) {
          return false
        }
        type = transformType(type)
        let data = await doc.data()[type]
        await docRef.set(
          {
            [type]: [...data, eleId],
          },
          { merge: true }
        )
        return true
      } catch (error) {
        console.log(error)
        return false
      }
    } else {
      console.log('no user')
      return false
    }
    return false
  }

  //if successful will return false to remove the liked state
  const removeFavorite = async (eleId, type) => {
    if (user) {
      try {
        const docRef = db.collection('users').doc(user.email)
        const doc = await docRef.get()
        if (!doc.exists) {
          return true
        }
        type = transformType(type)
        let data = await doc.data()[type]
        let index = data.findIndex((movie) => movie === eleId)
        if (index === -1) {
          return true
        }
        data.splice(index, 1)
        await docRef.set(
          {
            [type]: data,
          },
          { merge: true }
        )
        return false
      } catch (error) {
        console.log(error)
        return true
      }
    }
    console.log('no user')
    return true
  }

  const checkLiked = async (eleId, type) => {
    if (user) {
      try {
        const docRef = db.collection('users').doc(user.email)
        const doc = await docRef.get()
        if (!doc.exists) {
          return false
        }
        type = transformType(type)
        let data = await doc.data()[type]
        let found = data.filter((movie) => movie === eleId)
        if (!found.length) {
          return false
        }
        return true
      } catch (error) {
        console.log(error)
        return false
      }
    } else {
      return null
    }
    return null
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

  const getFavorites = async (type) => {
    if (user) {
      const docRef = db.collection('users').doc(user.email)
      const doc = await docRef.get()
      type = transformType(type)
      return doc.data()[type]
    }
  }

  return (
    <FirebaseContext.Provider
      value={{
        db,
        provider,
        user,
        favorite,
        removeFavorite,
        newUser,
        getFavorites,
        checkLiked,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  )
}
