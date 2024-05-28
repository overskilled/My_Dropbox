import React, { useState } from 'react'
import useShowToast from './useShowToast'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, firestore } from '../Firebase/Config'
import useAuthStore from '../Store/authStore'
import { doc, setDoc } from 'firebase/firestore'

const useSignUp = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()
    const showToast = useShowToast()
    const { login } = useAuthStore()

    const signup = async (inputs) => {
        setIsLoading(true)
        setError(null)

        if (!inputs.email || !inputs.username || !inputs.password) {
            showToast("Error", "Please fill all the fields", "error")
            setIsLoading(false)
            return;
        }

        try {
            const newUser = await createUserWithEmailAndPassword(auth, inputs.email, inputs.password)
            console.log(newUser)
            if (!newUser && error) {
                if (error.message == "Firebase: Error (auth/email-already-in-use).") {
                    showToast("Error", "This Email address is already used", "error");
                }

                return;
            }

            if (newUser) {
                const userInfo = {
                    uid: newUser.user.uid,
                    email: inputs.email,
                    username: inputs.username,
                    profilePicURL: "",
                    Address: "",
                    Telephone: "",
                    files : [],
                    createdAt: Date.now()
                }
                await setDoc(doc(firestore, 'users', newUser.user.uid), userInfo)
                localStorage.setItem("user-info", JSON.stringify(userInfo))
                login(userInfo)
            }

        } catch (error) {
            showToast("Error", error.message, "error");
        } finally {
            setIsLoading(false)
        }
    }

    return { signup, isLoading, error }
}

export default useSignUp