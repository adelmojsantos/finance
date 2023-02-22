import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { supabase } from "../supabaseClient"

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function sessionEffect() {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      setUser(session?.user ?? null)
      setLoading(false)

      const { data: listener } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          setUser(session?.user ?? null)
          setLoading(false)
        })
      return () => {
        listener?.unsubscribe();
      }
    }
    sessionEffect()
  }, [])

  async function resetPassword(email, callback) {
    const { data, error } = await supabase
      .auth
      .resetPasswordForEmail(email)
    if (error) {
      return toast.error(error.message)
    } else {
      return toast.success("Verifique e-mail de noreply@mail.app.supabase.io", {
        onClose: callback
      })
    }
  }

  const signIn = async ({ email, password }) => {
    const {
      data: { user },
      error,
    } = await supabase
      .auth
      .signInWithPassword({ email, password })

    return user
  }

  const value = {
    signUp: (data) => supabase.auth.signUp(data),
    signIn,
    signOut: () => supabase.auth.signOut(),
    user,
    resetPassword
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}