import React, { useEffect, useState } from 'react'
import useShowToast from './useShowToast';
import { collection, doc, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../Firebase/Config';
import useAuthStore from '../Store/authStore';
import useFileStore from '../Store/fileStore';

const useGetFiles = () => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true)
    const showToast = useShowToast()
    const { files, setFiles } = useFileStore()
    const { user } = useAuthStore()

    useEffect(() => {
        const getFiles = async () => {
            setLoading(true)
            setFiles([])

            try {
                const q = query(collection(firestore, "files"), where("ownerID", "==", user.uid))
                const querySnapshot = await getDocs(q)

                let userFiles = []
                querySnapshot.forEach((doc) => {
                    userFiles.push({ id: doc.id, ...doc.data() })
                });
                files.sort((a, b) => b.lastModification - a.lastModification);
                setFiles(userFiles)
            } catch (error) {
                showToast("Error", error.message, "error")
            } finally {
                setLoading(false)
            }
        }

        getFiles()
    }, [user, showToast])

    return { files, loading}
}

export default useGetFiles