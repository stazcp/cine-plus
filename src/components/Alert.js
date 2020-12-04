import React, { useEffect, useState } from 'react'

export default function createAlert({ message, severity }) {
  const [alert, setAlert] = useState(
    <Alert variant="filled" severity={severity}>
      {message}
    </Alert>
  )

  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        setAlert(null)
      }, 3000)
    }
  }, [alert])

  return alert
}
