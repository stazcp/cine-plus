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
  const favorite = async (eleId, type) => {
    if (user) {
      try {
        const docRef = db.collection('users').doc(user.email)
        const doc = await docRef.get()
        if (!doc.exists) {
          return false
        }
        if (type === 'movie') {
          const { favoriteMovies } = doc.data()
          await docRef.set(
            {
              favoriteMovies: [...favoriteMovies, eleId],
            },
            { merge: true }
          )
        } else if (type === 'tv') {
          const { favoriteShows } = doc.data()
          await docRef.set(
            {
              favoriteShows: [...favoriteShows, eleId],
            },
            { merge: true }
          )
        } else if (type === 'person') {
          const { favoriteActors } = doc.data()
          await docRef.set(
            {
              favoriteActors: [...favoriteActors, eleId],
            },
            { merge: true }
          )
        }
      } catch (error) {
        console.log(error)
        return false
      }
    } else {
      console.log('no user')
      return false
    }
    return true
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
        if (type === 'movie') {
          const { favoriteMovies } = doc.data()
          let index = favoriteMovies.findIndex((movie) => movie === eleId)
          if (index != -1) {
            favoriteMovies.splice(index, 1)
            await docRef.set(
              {
                favoriteMovies: favoriteMovies,
              },
              { merge: true }
            )
            return false
          } else {
            return true
          }
        } else if (type === 'tv') {
          const { favoriteShows } = doc.data()
          let index = favoriteShows.findIndex((movie) => movie === eleId)
          if (index != -1) {
            favoriteShows.splice(index, 1)
            await docRef.set(
              {
                favoriteShows: favoriteShows,
              },
              { merge: true }
            )
            return false
          } else {
            return true
          }
        } else if (type === 'person') {
          const { favoriteActors } = doc.data()
          let index = favoriteActors.findIndex((movie) => movie === eleId)
          if (index != -1) {
            favoriteActors.splice(index, 1)
            await docRef.set(
              {
                favoriteActors: favoriteActors,
              },
              { merge: true }
            )
            return false
          } else {
            return true
          }
        }
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
        if (type === 'movie') {
          const { favoriteMovies } = doc.data()
          let found = favoriteMovies.filter((movie) => movie === eleId)
          console.log(found)
          if (found.length) {
            return true
          } else {
            return false
          }
        } else if (type === 'tv') {
          const { favoriteShows } = doc.data()
          let found = favoriteShows.filter((movie) => movie === eleId)
          if (found.length) {
            return true
          } else {
            return false
          }
        } else if (type === 'person') {
          const { favoriteActors } = doc.data()
          let found = favoriteActors.filter((movie) => movie === eleId)
          if (found.length) {
            return true
          } else {
            return false
          }
        }
      } catch (error) {
        console.log(error)
        return false
      }
    } else {
      return false
    }
    return false
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
        removeFavorite,
        newUser,
        getFavoriteMovies,
        getFavoriteShows,
        getFavoriteActors,
        checkLiked,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  )
}
