import React, { useState } from 'react'
import useShowToast from './useShowToast'
import { deleteObject, ref } from 'firebase/storage'
import { firestore, storage } from '../Firebase/Config'
import { storageFolder } from '../Components/utils/storageFolder'
import { deleteDoc, doc, getDoc } from 'firebase/firestore'

const useDeleteFile = () => {
    const [loading, setLoading] = useState(false)
    const [file, setFile] = useState()
    const showToast = useShowToast()

    const deleteFile = async (fileID) => {
        setLoading(true);

        try {
            // Fetch the file data based on fileID
            const fileDocRef = doc(firestore, "files", fileID)
            const docSnap = await getDoc(fileDocRef);

            if (docSnap.exists()) {
                const fileData = docSnap.data();
                setFile(fileData); // Set the file data
                const fileType = fileData.type;
                const folder = storageFolder(fileType);
                const storageRef = ref(storage, `${folder}/${fileData.name}`);
                
                // Delete the file
                await deleteObject(storageRef);
                await deleteDoc(doc(firestore, "files", fileID));
                
                showToast("Success", "File deleted successfully. Refresh!", "success");
            } else {
                showToast("Error", "No such document!", "error");
            }
        } catch (error) {
            showToast("Error", error.message, "error");
        } finally {
            setLoading(false);
        }
    }

    return { loading, deleteFile }
}

export default useDeleteFile;
