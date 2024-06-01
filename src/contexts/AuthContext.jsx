import React, { useContext, useEffect, useState } from 'react'
import useAuthStore from '../Store/authStore'
import { auth } from '../Firebase/Config'
import { onAuthStateChanged } from 'firebase/auth'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const { user, setUser } = useAuthStore()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])

    const value = {
        user
    }


    return (
        <div>
            <AuthContext.Provider value={value}>
                {!loading && children}
            </AuthContext.Provider>
        </div>
    )
}