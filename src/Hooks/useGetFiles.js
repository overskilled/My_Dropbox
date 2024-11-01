import React, { useEffect, useState } from 'react';
import useShowToast from './useShowToast';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../Firebase/Config';
import useAuthStore from '../Store/authStore';
import useFileStore from '../Store/fileStore';

const useGetFiles = () => {
    const [loading, setLoading] = useState(true);
    const showToast = useShowToast();
    const setFiles = useFileStore((state) => state.setFiles);
    const files = useFileStore((state) => state.files);
    const { user } = useAuthStore();

    useEffect(() => {
        const getFiles = async () => {
            setLoading(true);
            setFiles([]); // Initialize Zustand's files state to avoid stale data

            try {
                const q = query(collection(firestore, "files"), where("ownerID", "==", user.uid));
                const querySnapshot = await getDocs(q);

                const userFiles = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                
                // Sort files by lastModification in descending order
                userFiles.sort((a, b) => b.lastModification - a.lastModification);

                setFiles(userFiles); // Update Zustand's files state
            } catch (error) {
                showToast("Error", error.message, "error");
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            getFiles();
        }
    }, [user, showToast, setFiles]);

    return { files, loading };
};

export default useGetFiles;
