import { signOut } from 'firebase/auth'
import React, { useState } from 'react'
import { auth } from '../Firebase/Config'
import useAuthStore from '../Store/authStore'
import useShowToast from './useShowToast'

const useLogOut = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const { setUser, logoutUser } = useAuthStore()
    const showToast = useShowToast()

    const logout = async () => {
        setLoading(true)
        setError("")
        try {
            await signOut(auth)
            localStorage.removeItem("user-info")
            logoutUser()
            setUser("")
            showToast("Success", "logged out successful", "success")
        } catch (error) {
            showToast("Error", error.message, "error")
        } finally {
            setLoading(false)
        }
    }

    return { logout, loading, error }
}

export default useLogOut