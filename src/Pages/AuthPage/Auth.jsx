import { Box, Button, Container, Flex, FormControl, FormLabel, Image, Input, Text, VStack } from '@chakra-ui/react'
import React from 'react'

const Auth = () => {
    return (
        <>
            <Container minW={"container.lg"} minH={"100vh"}>
                <Flex
                    justifyContent={"center"}
                    alignItems={"center"}
                    minH={"100vh"}
                    gap={10}
                >
                    <Box display={{ base: "none", md: "block" }}>
                        <Image src='/auth-image.png' h={400} alt='phone image' />
                    </Box>
                    <VStack
                        gap={5}
                        padding={"50px"}
                        border={"2px solid gray"}
                        minW={"500px"}
                    >
                        <Text fontSize={25} fontWeight={"bold"}>
                            Login
                        </Text>
                        <FormControl>
                            <FormLabel>Email</FormLabel>
                            <Input type='email' placeholder='Enter your email...' />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Password</FormLabel>
                            <Input type='password' placeholder='Enter your password...' />
                        </FormControl>
                        <Button w={"full"}>Login</Button>

                        <Flex alignItems={'center'} justifyContent={'center'} my={4} gap={1} w={'full'}>
                            <Box flex={2} h={'1px'} bg={"gray.400"} />
                            <Text mx={1} color={"white"}>OR</Text>
                            <Box flex={2} h={'1px'} bg={"gray.400"} />
                        </Flex>

                        <Box border={'1px solid gray'} padding={5} borderRadius={4}>
                            <Flex alignItems={'center'} justifyContent={'center'}>
                                <Box mx={2} fontSize={14}>
                                    Don't have an account?
                                </Box>
                                <Box color={"blue.500"} fontSize={14} cursor={'pointer'}>
                                    Sign Up
                                </Box>
                            </Flex>
                        </Box>

                    </VStack>
                </Flex>
            </Container>
        </>
    )
}

export default Auth