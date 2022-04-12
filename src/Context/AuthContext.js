import { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../Firebase'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'

const AuthContext = createContext()

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined)
    throw new Error("useAuth doit s'utiliser avec AuthContext.Provider")
  return context
}

export default function AuthContextProvider({ children }) {
  const [authUser, setAuthUser] = useState()
  const [loading, setLoading] = useState(true)

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function logout() {
    return signOut(auth)
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email)
  }

  function updateEmail(email) {
    return updateEmail(auth, email)
  }

  function updatePassword(password) {
    return authUser.updatePassword(password)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setAuthUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    authUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
