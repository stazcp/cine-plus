//@Flow
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

export function FirebaseProvider({ children }) {
  firebase.auth().onAuthStateChanged((user) => setUser(user))
  const [user, setUser] = useState()

  const transformType = (type: string): string | null => {
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
  const favorite = async (eleId: number, type: string): boolean => {
    if (!user) {
      console.log('no user')
      return false
    }
    try {
      const docRef = db.collection('users').doc(user.email)
      const doc = await docRef.get()
      if (!doc.exists) return false
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
    return false
  }

  //if successful will return false to remove the liked state
  const removeFavorite = async (eleId: number, type: string): boolean => {
    if (!user) {
      console.log('no user')
      return true
    }
    try {
      const docRef = db.collection('users').doc(user.email)
      const doc = await docRef.get()
      if (!doc.exists) return true
      type = transformType(type)
      let data = await doc.data()[type]
      let index = data.findIndex((movie) => movie === eleId)
      if (index === -1) return true
      data.splice(index, 1)
      await docRef.set(
        {
          [type]: data,
        },
        { merge: true }
      )
      //success
      return false
    } catch (error) {
      console.log(error)
      return true
    }
    return true
  }

  const checkLiked = async (eleId: number, type: string): boolean | null => {
    if (!user) {
      console.log('no user found')
      return null
    }
    try {
      const docRef = db.collection('users').doc(user.email)
      const doc = await docRef.get()
      if (!doc.exists) {
        return false
      }
      type = transformType(type)
      let data = await doc.data()[type]
      let found = data.filter((ele) => ele === eleId)
      if (!found.length) return false
      return true
    } catch (error) {
      // console.log(eleId, type)
      console.log(error)
      return false
    }
    return null
  }

  //add new user to database and set schema
  const newUser = async (email: string) => {
    try {
      const docRef = db.collection('users').doc(email)
      await docRef.set({
        favoriteMovies: [],
        favoriteShows: [],
        favoriteActors: [],
      })
    } catch (error) {
      console.log(error)
    }
  }

  const getFavorites = async (type: string): array => {
    if (!user) return null
    const docRef = db.collection('users').doc(user.email)
    const doc = await docRef.get()
    type = transformType(type)
    return doc.data()[type]
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
