import { useState } from 'react';
import {
    Link,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    Box,
    VStack,
    Button,
    Text,
    useDisclosure,
    Flex
} from '@chakra-ui/react';
import React from 'react';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import useGetFiles from '../../Hooks/useGetFiles';
import { usePopper } from 'react-popper';
import EditModal from '../Modals/EditModal';
import useDeleteFile from '../../Hooks/useDeleteFile';

const DataTable = () => {
    const { files, loading } = useGetFiles();
    const [popoverOpen, setPopoverOpen] = useState(null);
    const [referenceElement, setReferenceElement] = useState(null);
    const [popperElement, setPopperElement] = useState(null);
    const { styles, attributes } = usePopper(referenceElement, popperElement, { placement: "bottom-start" });
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [openedModals, setOpenedModals] = useState([]);
    const { deleteFile } = useDeleteFile()

    const handlePopoverToggle = (fileId) => {
        setPopoverOpen(popoverOpen === fileId ? null : fileId);
    };

    const openEditModal = (fileId) => {
        if (!openedModals.includes(fileId)) {
            setOpenedModals([...openedModals, fileId]);
        }
    };

    const closeEditModal = (fileId) => {
        setOpenedModals(openedModals.filter((modalId) => modalId !== fileId));
    };

    return (
        <>
            <TableContainer>
                <Table variant={"simple"} size="sm">
                    <TableCaption>
                        copyright © built by{' '}
                        <Link href="https://github.com/overskilled" isExternal>
                            Yvan Ouatedem
                        </Link>
                    </TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Size</Th>
                            <Th>Type</Th>
                            <Th>Last update</Th>
                            <Th textAlign={"center"}>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {files && files.length > 0 ? (
                            files.map((file) => (
                                <Tr key={file.id}>
                                    <Td><Link href={file.fileURL} isExternal>{file.name}</Link></Td>
                                    <Td>{(file.size / (1024 * 1024)).toFixed(2)} MB</Td>
                                    <Td>{file.type}</Td>
                                    <Td>{new Date(file.lastModification).toLocaleString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: 'numeric',
                                        minute: 'numeric',
                                        second: 'numeric',
                                        hour12: true // for 12-hour format
                                    })}</Td>
                                    <Td >
                                        <Button colorScheme='green'
                                            width="50%"
                                            cursor="pointer"
                                            mr={2}
                                            key={file.id}
                                            onClick={() => openEditModal(file.id)}
                                        >
                                            Edit
                                        </Button>
                                        <EditModal isOpen={openedModals.includes(file.id)} onClose={() => closeEditModal(file.id)} file={file} />
                                        <Button colorScheme='red'
                                            width="50%"
                                            cursor="pointer"
                                            onClick={() => deleteFile(file.id)}
                                        >
                                            Delete
                                        </Button>
                                    </Td>
                                </Tr>
                            ))
                        ) : (
                            <Tr>
                                <Td colSpan={5}>
                                    <Text textAlign="center" mt={4} casing={"uppercase"} fontWeight={"bold"}>
                                        No files available
                                    </Text>
                                </Td>
                            </Tr>
                        )}
                    </Tbody>
                </Table>

            </TableContainer>
        </>
    );
}

export default DataTable;
