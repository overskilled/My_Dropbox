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
    Button,
    Text,
    Spinner,
    Flex,
} from '@chakra-ui/react';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import useGetFiles from '../../Hooks/useGetFiles';
import useDeleteFile from '../../Hooks/useDeleteFile';
import EditModal from '../Modals/EditModal';
import useFileStore from '../../Store/fileStore';

const DataTable = () => {
    const { loading } = useGetFiles(); // Fetch files and loading state
    const [openedModals, setOpenedModals] = useState([]); // Track which modals are open
    const { deleteFile, loading: deleteLoading } = useDeleteFile(); // Deletion hook with loading state
    const { files } = useFileStore()

    // Toggle edit modal open/close state
    const openEditModal = (fileId) => {
        if (!openedModals.includes(fileId)) {
            setOpenedModals([...openedModals, fileId]);
        }
    };

    const closeEditModal = (fileId) => {
        setOpenedModals(openedModals.filter((modalId) => modalId !== fileId));
    };

    return (
        <TableContainer>
            <Table variant="simple" size="sm">
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
                        <Th textAlign="center">Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {loading ? ( // Loading state
                        <Tr>
                            <Td colSpan={5} textAlign="center">
                                <Spinner size="lg" color="blue.500" />
                                <Text mt={2}>Loading files...</Text>
                            </Td>
                        </Tr>
                    ) : files && files.length > 0 ? ( // Display files
                        files.map((file) => (
                            <Tr key={file.id}>
                                <Td>
                                    <Link href={file.fileURL} isExternal>{file.name}</Link>
                                </Td>
                                <Td>{(file.size / (1024 * 1024)).toFixed(2)} MB</Td>
                                <Td>{file.type}</Td>
                                <Td>
                                    {new Date(file.lastModification).toLocaleString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: 'numeric',
                                        minute: 'numeric',
                                        second: 'numeric',
                                        hour12: true,
                                    })}
                                </Td>
                                <Td>
                                    <Flex justifyContent="center">
                                        <Button
                                            colorScheme="green"
                                            mr={2}
                                            onClick={() => openEditModal(file.id)}
                                        >
                                            Edit
                                        </Button>
                                        <EditModal
                                            isOpen={openedModals.includes(file.id)}
                                            onClose={() => closeEditModal(file.id)}
                                            file={file}
                                        />
                                        <Button
                                            colorScheme="red"
                                            onClick={() => deleteFile(file.id)}
                                            isLoading={deleteLoading}
                                        >
                                            Delete
                                        </Button>
                                    </Flex>
                                </Td>
                            </Tr>
                        ))
                    ) : ( // Empty state
                        <Tr>
                            <Td colSpan={5} textAlign="center">
                                <Text mt={4} casing="uppercase" fontWeight="bold">
                                    No files available
                                </Text>
                            </Td>
                        </Tr>
                    )}
                </Tbody>
            </Table>
        </TableContainer>
    );
};

export default DataTable;
