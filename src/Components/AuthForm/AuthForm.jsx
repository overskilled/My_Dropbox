import { Box, Button, Flex, FormControl, FormLabel, Input, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import Login from './Login';
import SignUp from './SignUp';

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState();

    return (
        <>
            <Box padding={5} maxH="100vh" overflowY="auto">
                <VStack spacing={5}>
                    {isLogin ? <Login /> : <SignUp />}

                    <Box padding={2} width={"300px"}>
                        <Flex alignItems={'center'} justifyContent={'center'}>
                            <Box mx={2} fontSize={14}>
                                {isLogin ? "Don't have an account?" : "Already have an account?"}
                            </Box>
                            <Box color={"blue.500"} onClick={() => setIsLogin(!isLogin)} fontSize={14} cursor={'pointer'}>
                                {isLogin ? "Sign Up" : "Login"}
                            </Box>
                        </Flex>
                    </Box>
                    {/* <Text fontSize={15} textAlign={"center"}>Or {isLogin ? "login" : "signup"} with</Text>
                    <Flex gap={10} justify={"center"}>
                        <Button bgColor={"#000"} borderRadius={"10px"}>Google</Button>
                        <Button bgColor={"#000"} borderRadius={"10px"}>Apple</Button>
                    </Flex> */}
                </VStack>
            </Box>
        </>
    );
};


export default AuthForm