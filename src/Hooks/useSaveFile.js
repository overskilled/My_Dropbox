import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import useShowToast from './useShowToast';
import { firestore, storage } from '../Firebase/Config';
import useAuthStore from '../Store/authStore';
import { arrayUnion, collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import useFileStore from '../Store/fileStore';
import { storageFolder } from '../Components/utils/storageFolder';

const useSaveFile = () => {
    const [loading, setLoading] = useState(false);
    const showToast = useShowToast();
    const maxFileSizeinBytes = 20 * 1024 * 1024; // 20MB limit
    const { user } = useAuthStore();
    const createFile = useFileStore((state) => state.createFile); // Zustand action to add file to store

    const handleUploadFile = async (e) => {
        const file = e.target.files[0];

        if (!file) {
            showToast("Error", "Please select a file", "error");
            return;
        }

        if (file.size > maxFileSizeinBytes) {
            showToast("Error", "File size must be less than 20MB", "error");
            return;
        }

        setLoading(true);

        const fileType = file.type;
        const folder = storageFolder(fileType);
        const storageRef = ref(storage, `${folder}/${file.name}`);

        try {
            // Upload the file to Firebase Storage
            await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(storageRef);

            // Prepare file data to store in Firestore and Zustand
            const fileData = {
                id: doc(collection(firestore, "files")).id, // Generate a unique ID
                ownerID: user.uid,
                fileURL: downloadURL,
                size: file.size,
                type: fileType,
                lastModification: file.lastModified,
                name: file.name
            };

            // Save file data in Firestore
            const newFileRef = doc(firestore, "files", fileData.id);
            await setDoc(newFileRef, fileData);

            // Update the user's document in Firestore to include the new file ID
            const userDocRef = doc(firestore, "users", user.uid);
            await updateDoc(userDocRef, {
                files: arrayUnion(fileData.id)
            });

            // Update Zustand store with the new file
            createFile(fileData);

            showToast("Success", "File uploaded successfully", "success");
        } catch (error) {
            showToast("Error", `Upload failed: ${error.message}`, "error");
        } finally {
            setLoading(false);
        }
    };

    return { handleUploadFile, loading };
};

export default useSaveFile;
