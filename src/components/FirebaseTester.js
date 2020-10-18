import React, { useContext } from 'react'
import { FirebaseContext } from '../Firebase/FirebaseContext'

export default function FirebaserTester(params) {
  const { db } = useContext(FirebaseContext)

  //read
  const onRead = async () => {
    const snapshot = await db.collection('movies').get()
    console.log('snapshot', snapshot)
    snapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data())
    })
  }

  const onSetDocument = async () => {
    const docRef = db.collection('movies').doc('Rambo')

    await docRef.set(
      {
        cast: ['banana Joe', 'Marco Polo', 'Bob Dylan'],
      },
      { merge: true }
    )
  }

  const onAddValueToDocument = async () => {
    const docRef = db.collection('movies').doc('Rambo')

    await docRef.set(
      {
        producer: 'Jiimy',
        date: '2001',
      },
      { merge: true }
    )
  }

  const addIndexToArray = async (movieName) => {
    const movie = db.collection('movies').doc(movieName)
    const doc = await movie.get()
    if (!doc.exists) {
      return null
    }
    const { cast } = doc.data()
    console.log('cast', cast)

    const newCast = [...cast]
    newCast.push('Habibi')

    await movie.set(
      {
        cast: newCast,
      },
      { merge: true }
    )
  }

  // onRead()
  // addIndexToArray('Rambo')

  return null
}
