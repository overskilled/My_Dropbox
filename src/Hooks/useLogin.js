import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth, firestore } from '../Firebase/Config';
import useAuthStore from '../Store/authStore';
import { doc, getDoc } from 'firebase/firestore';
import useShowToast from './useShowToast';

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { loginUser } = useAuthStore();
    const showToast = useShowToast();

    const login = async (inputs) => {
        setLoading(true);
        setError("");

        if (!inputs.email || !inputs.password) {
            showToast("Error", "Please fill all the fields", "error");
            setLoading(false);
            return;
        }

        try {
            const userInfo = await signInWithEmailAndPassword(auth, inputs.email, inputs.password);

            if (userInfo && userInfo.user && userInfo.user.uid) {
                const docRef = doc(firestore, "users", userInfo.user.uid);
                const docSnapShot = await getDoc(docRef);

                if (docSnapShot.exists()) {
                    const data = { uid: docSnapShot.id, ...docSnapShot.data() };
                    localStorage.setItem("user-info", JSON.stringify(data));
                    loginUser(data); 
                    showToast("Success", "Login successful", "success");
                } else {
                    throw new Error("No such user found");
                }
            }
        } catch (error) {
            showToast("Error", error.message, "error");
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { login, loading, error };
};

export default useLogin;
