import {  Container, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import AddFile from '../../Components/AddFile/AddFile'
import DataTable from '../../Components/DataTable/DataTable'

const Home = () => {
    return (
        <>
            <Flex minH={"100vh"} mt={5}>
                <Container maxW={"container.lg"}>
                    <Flex>
                        <AddFile />
                    </Flex>
                    <Flex mt={10} direction={"column"} gap={5}>
                        <Text fontSize={"30px"} fontWeight={"bold"}>Tous les fichiers</Text>
                        <DataTable />
                    </Flex>
                </Container>
            </Flex>
        </>
    )
}

export default Home