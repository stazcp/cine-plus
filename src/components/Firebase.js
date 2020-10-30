import Ract, { useContext } from 'react'
import { FirebaseContext } from '../Firebase/FirebaseContext'

export default function Firebase(params) {
  const { db } = useContext(FirebaseContext)

  const getUsers = async () => {
    const users = await db.collection('users').get()
    users.forEach((doc) => {
      console.log(doc.id)
    })
  }

  // getUsers()

  return null
}
