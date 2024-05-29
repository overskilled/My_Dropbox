import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import React, { useRef } from 'react';
import { BiPlus } from 'react-icons/bi';
import useSaveFile from '../../Hooks/useSaveFile';

const AddFile = () => {
    const fileRef = useRef(null);
    const { handleUploadFile, selectedFile, setSelectedFile, loading } = useSaveFile();

    console.log(selectedFile);
    return (
        <>
            <Button
                padding={10}
                w={"120px"}
                border={"1px solid"}
                borderColor={"transparent"}
                borderRadius={"10px"}
                bgColor={"white"}
                color={"black"}
                _hover={{ bgColor: "black", color: "white", }}
                onClick={() => fileRef.current.click()}
                isLoading={loading}
            >
                <Flex direction={"column"} gap={3} alignItems={"left"}>
                    <BiPlus size={"30px"} />
                    <Text>Upload File</Text>
                </Flex>
            </Button>
            <Input type='file' hidden ref={fileRef} onChange={handleUploadFile} />
        </>
    );
};

export default AddFile;
