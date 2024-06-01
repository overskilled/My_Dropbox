import React, { useState } from 'react'
import useShowToast from './useShowToast'
import { doc, updateDoc } from 'firebase/firestore'
import { firestore, storage } from '../Firebase/Config'
import { deleteObject, getDownloadURL, getMetadata, ref, updateMetadata, uploadBytes } from 'firebase/storage'
import { storageFolder } from '../Components/utils/storageFolder'
import useFileStore from '../Store/fileStore'

const useEditFile = () => {
    const [loading, setLoading] = useState(false)
    const showToast = useShowToast()



    const editFile = async (name, file) => {
        setLoading(true)

        const fileType = file.type
        let folder = storageFolder(fileType)

        const storageRef = ref(storage, `${folder}${file.name}`);

        try {
            // Download the old file
            const oldDownloadURL = await getDownloadURL(storageRef);

            // Delete the original file
            await deleteObject(storageRef);

            // Upload the file with a new name
            const newStorageRef = ref(storage, `${folder}/${name}`);
            await uploadBytes(newStorageRef, file);

            console.log('File uploaded successfully.');

            const downloadURL = await getDownloadURL(newStorageRef);

            const updatedFile = {
                ...file,
                fileURL: downloadURL,
                lastModification: Date.now(),
                name: name
            }

            const fileDocRef = doc(firestore, "files", file.id);
            await updateDoc(fileDocRef, updatedFile);


            // await updateDoc(doc(firestore, "files", file.id), updatedFile)
            showToast("Success", "File updated successully, please refresh for imidiate effect!", "success")
        } catch (error) {
            showToast("Error", error.message, "error")
        } finally {
            setLoading(false)
        }
    }

    return { loading, editFile }
}

export default useEditFile