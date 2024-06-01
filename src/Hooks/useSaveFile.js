import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import useShowToast from './useShowToast';
import { firestore, storage } from '../Firebase/Config';
import useAuthStore from '../Store/authStore';
import { arrayUnion, collection, doc, runTransaction, setDoc, updateDoc } from 'firebase/firestore';
import useFileStore from '../Store/fileStore';
import { storageFolder } from '../Components/utils/storageFolder';

const useSaveFile = () => {
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const showToast = useShowToast();
    const maxFileSizeinBytes = 20 * 1024 * 1024; // 20MB
    const { user } = useAuthStore()
    const { createFile } = useFileStore()

    const handleUploadFile = async (e) => {
        const file = e.target.files[0]; // Corrected to 'files' instead of 'file'


        if (file) {
            if (file.size > maxFileSizeinBytes) {
                showToast("Error", "File size must be less than 20MB", "error");
                setSelectedFile(null);
                return;
            }

            setLoading(true);

            const fileType = file.type
            let folder = storageFolder(fileType)

            const storageRef = ref(storage, `${folder}${file.name}`);

            try {
                await uploadBytes(storageRef, file);
                const downloadURL = await getDownloadURL(storageRef);

                const fileData = {
                    ownerID: user.uid,
                    fileURL: downloadURL,
                    size: file.size,
                    type: fileType,
                    lastModification: file.lastModified,
                    name: file.name
                }

                // Create a unique ID for the new file document
                const newFileRef = doc(collection(firestore, "files"));

                // Save the file data in Firestore
                await setDoc(newFileRef, fileData);

                // Update the user's document to include the new file in the files array
                const userDocRef = doc(firestore, "users", user.uid);
                await updateDoc(userDocRef, {
                    files: arrayUnion(newFileRef.id)
                });
                createFile(fileData)
                console.log("File Data:", fileData);



                console.log(downloadURL)
                setSelectedFile(downloadURL);
                showToast("Success", "File uploaded successfully", "success");
            } catch (error) {
                showToast("Error", error.message, "error");
            } finally {
                setLoading(false);
            }
        } else {
            showToast("Error", "Please select a file", "error");
            setSelectedFile(null);
        }
    };

    return { handleUploadFile, selectedFile, setSelectedFile, loading };
};

export default useSaveFile;
