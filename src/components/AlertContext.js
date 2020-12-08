import React, { useState, createContext, useEffect } from 'react'

export const AlertContext = createContext()

export default function AlertProvider(props) {
  const [alert, setAlert] = useState()

  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        setAlert(null)
      }, 3000)
    }
  }, [alert])

  return <AlertContext.Provider value={{ alert, setAlert }}>{props.children}</AlertContext.Provider>
}
