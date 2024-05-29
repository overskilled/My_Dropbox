import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import useShowToast from './useShowToast';
import { firestore, storage } from '../Firebase/Config';
import useAuthStore from '../Store/authStore';
import { arrayUnion, collection, doc, runTransaction, setDoc, updateDoc } from 'firebase/firestore';

const useSaveFile = () => {
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const showToast = useShowToast();
    const maxFileSizeinBytes = 20 * 1024 * 1024; // 20MB
    const { user } = useAuthStore()

    const handleUploadFile = async (e) => {
        const file = e.target.files[0]; // Corrected to 'files' instead of 'file'


        if (file) {
            if (file.size > maxFileSizeinBytes) {
                showToast("Error", "File size must be less than 20MB", "error");
                setSelectedFile(null);
                return;
            }

            setLoading(true);

            let folder;
            const fileType = file.type;

            // Categorize file types into folders
            if (fileType.startsWith('image/')) {
                folder = 'Images/';
            } else if (fileType === 'application/pdf') {
                folder = 'PDF/';
            } else if (fileType.startsWith('video/')) {
                folder = 'Videos/';
            } else if (fileType.startsWith('audio/')) {
                folder = 'Audio/';
            } else if (fileType.startsWith('text/')) {
                folder = 'Text/';
            } else if (fileType === 'application/msword' || fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                folder = 'Documents/Word/';
            } else if (fileType === 'application/vnd.ms-excel' || fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
                folder = 'Documents/Excel/';
            } else if (fileType === 'application/vnd.ms-powerpoint' || fileType === 'application/vnd.openxmlformats-officedocument.presentationml.presentation') {
                folder = 'Documents/PowerPoint/';
            } else if (fileType === 'application/zip' || fileType === 'application/x-rar-compressed') {
                folder = 'Archives/';
            } else {
                folder = 'Others/';
            }

            const storageRef = ref(storage, `${folder}${file.name}`);

            try {
                await uploadBytes(storageRef, file);
                const downloadURL = await getDownloadURL(storageRef);

                const fileData = {
                    ownerID: user.uid,
                    fileURL: downloadURL,
                    size: file.size,
                    type: fileType,
                    lastModification: file.lastModified
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
