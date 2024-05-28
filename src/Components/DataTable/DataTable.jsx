import { useState } from 'react';
import { Link, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, ModalCloseButton } from '@chakra-ui/react';
import React from 'react';
import { BiDotsVerticalRounded } from 'react-icons/bi';

const DataTable = () => {
    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => setIsOpen(false);
    const openModal = () => setIsOpen(true);

    return (
        <>
            <TableContainer>
                <Table variant={"simple"} size='sm'>
                    <TableCaption>copyright © built by <Link href='https://github.com/overskilled' isExternal>Yvan ouatedem</Link></TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Size</Th>
                            <Th>Type</Th>
                            <Th>Last update</Th>
                            <Th>more</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>Netflix-invoice</Td>
                            <Td>4.52MB</Td>
                            <Td>PDF</Td>
                            <Td>7 mars 2024</Td>
                            <Td>
                                <BiDotsVerticalRounded onClick={openModal} />
                                <Modal isOpen={isOpen} onClose={closeModal}>
                                    <ModalOverlay />
                                    <ModalContent>
                                        <ModalHeader>Actions</ModalHeader>
                                        <ModalCloseButton />
                                        <ModalBody justifyContent={"center"} alignItems={"center"}>
                                            <Button ml={120} mr={5} colorScheme="blue" onClick={closeModal}>
                                                Edit
                                            </Button>
                                            <Button colorScheme="red" onClick={closeModal}>
                                                Delete
                                            </Button>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button variant="ghost" onClick={closeModal}>
                                                Close
                                            </Button>
                                        </ModalFooter>
                                    </ModalContent>
                                </Modal>
                            </Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    )
}

export default DataTable;
