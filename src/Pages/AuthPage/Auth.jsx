import { Box, Button, Container, Flex, Image, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import AuthForm from '../../Components/AuthForm/AuthForm'

const Auth = () => {
    return (
        <>
            <Flex minH="100vh" justifyContent="center" alignItems="center" px={4} overflow="hidden">
                <Container minW="container.lg" maxH="100vh" >
                    <Flex
                        justifyContent="center"
                        alignItems="center"
                        minH="100vh"
                        gap={10}
                    >
                        <Box
                            display={{ base: "none", md: "block" }}
                            bgColor="#2d2d2d"
                            width={"600px"}
                            p={12}
                            py={12}
                            borderRadius="15px"
                        >
                            <VStack gap={4}>
                                <Text fontWeight="bold" fontSize={25}>Tired of loosing your files?</Text>
                                <Text fontWeight="bold" fontSize={20}>Discover the perfect space to store all your files</Text>
                                <Image src='/Auth-image.svg' alt='login image' maxH={300} />
                                <Text fontWeight="bold" fontSize={15}>Access your file from anywhere</Text>
                            </VStack>
                        </Box>
                        <VStack align="stretch" maxH="100vh">
                            <AuthForm />
                        </VStack>
                    </Flex>
                </Container>
            </Flex>

        </>
    )
}

export default Auth

{/* <Container minW={"container.md"} minH={"100vh"}>
                <Flex
                    justifyContent={"center"}
                    alignItems={"center"}
                    minH={"100vh"}
                    gap={10}
                >
                    <Box  display={{ base: "none", md: "block" }} bgColor={"#2d2d2d"} p={12} py={12} borderRadius={"15px"}>
                        <VStack gap={4}>
                            <Text fontWeight={"bold"} fontSize={25}>Feeling Lost? Need a Guide?</Text>
                            <Text fontWeight={"bold"} fontSize={20}>Discover the perfect space to store all your files</Text>
                            <Image src='/vite.svg' alt='login image' minH={300} />
                            <Text fontWeight={"bold"} fontSize={15}>Access your file from anywhere</Text>
                        </VStack>
                    </Box>
                    <VStack align={"stretch"}>
                        <AuthForm />
                    </VStack>

                </Flex> 
            </Container>*/}