import React, { useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
} from '@chakra-ui/react'
import useEditFile from '../../Hooks/useEditFile'

const EditModal = ({ onClose, isOpen, file }) => {
    const [name, setName] = useState(file.name)
    const { loading, editFile } = useEditFile()

    const handleUpdateFile = () => {
        editFile(name, file);
        window.location.reload();
    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />
                <ModalContent bgColor={"#2d2d2d"}>
                    <ModalHeader>Edit your file</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody >
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input type="text" value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter mt={10}>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button
                            variant='ghost'
                            onClick={handleUpdateFile} // Call handleUpdateFile instead of directly calling editFile
                        >
                            Update</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default EditModal
