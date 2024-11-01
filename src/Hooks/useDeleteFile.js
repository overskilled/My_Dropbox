import React, { useState } from 'react';
import useShowToast from './useShowToast';
import { deleteObject, ref } from 'firebase/storage';
import { firestore, storage } from '../Firebase/Config';
import { storageFolder } from '../Components/utils/storageFolder';
import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import useFileStore from '../Store/fileStore';

const useDeleteFile = () => {
    const [loading, setLoading] = useState(false);
    const showToast = useShowToast();
    const deleteFileFromStore = useFileStore((state) => state.deleteFile); // Correct function reference

    const deleteFile = async (fileID) => {
        setLoading(true);

        try {
            // Fetch the file document from Firestore
            const fileDocRef = doc(firestore, "files", fileID);
            const docSnap = await getDoc(fileDocRef);

            // Check if document exists
            if (!docSnap.exists()) {
                showToast("Error", "File document not found!", "error");
                return;
            }

            const fileData = docSnap.data();

            // Get the folder based on file type
            const fileType = fileData.type;
            const folder = storageFolder(fileType);
            const storageRef = ref(storage, `${folder}/${fileData.name}`);

            // Attempt to delete file from storage
            await deleteObject(storageRef);

            // Delete file document from Firestore
            await deleteDoc(fileDocRef);

            // Update Zustand state to remove file from the list
            deleteFileFromStore(fileID); // Use correct function from Zustand
            
            showToast("Success", "File deleted successfully. Please reload.", "success");
        } catch (error) {
            showToast("Error", `Deletion failed: ${error.message}`, "error");
        } finally {
            setLoading(false);
        }
    };

    return { loading, deleteFile };
};

export default useDeleteFile;
