import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'

import { auth } from '../services/firebase'

function ProtectedRoute({ children }) {

  const [user, setUser] = useState(undefined)

  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(
        auth,
        (usuario) => {
          setUser(usuario)
        }
      )

    return unsubscribe

  }, [])

  if (user === undefined) {
    return <p>Carregando...</p>
  }

  return user
    ? children
    : <Navigate to="/login" replace />

}

export default ProtectedRoute