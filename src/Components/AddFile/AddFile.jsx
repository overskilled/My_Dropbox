import { Box, Button, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { BiPlus } from 'react-icons/bi'

const AddFile = () => {
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
                // onClick={() => fileRef.current.click()}
            >
                <Flex direction={"column"} gap={3} alignItems={"left"}>
                    <BiPlus size={"30px"} />
                    <Text>upload file</Text>
                </Flex>
            </Button>
            {/* <Input type='file' hidden ref={fileRef} onChange={handleImageChange} /> */}
        </>
    )
}

export default AddFile