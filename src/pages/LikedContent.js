// maintain/regrab data when page is refreshed

import React, { useEffect, useContext, useState } from 'react'
import { get } from '../utils/movieDB'
import { FirebaseContext } from '../Firebase/FirebaseContext'
import MediaHandler from '../components/MediaHandler'
import { useParams } from 'react-router-dom'

export default function LikedContent() {
  const [elements, setElements] = useState([])
  const { type } = useParams()
  const { getFavorites } = useContext(FirebaseContext)

  useEffect(() => {
    fetchElements().then((data) => setElements(data))
  }, [])

  const fetchElements = async () => {
    let data = await getFavorites(type)
    if (data) {
      if (data.length) {
        return Promise.all(
          data.map((id) => {
            return get(type, id)
          })
        )
      }
    }
  }

  const setTitle = (type) => {
    switch (type) {
      case 'movie':
        return 'Your Favorite Movies'
      case 'tv':
        return 'Your Favorite TV Shows'
      case 'person':
        return 'Your Favorite People'
    }
  }

  return <MediaHandler media={elements} type={type} pageTitle={setTitle(type)} />
}
