import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react'
import React, { useState } from 'react'

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <>
            <Text fontSize={25} fontWeight={"bold"}>
                Register
            </Text>
            <FormControl >
                <FormLabel>Email</FormLabel>
                <Input type='email' placeholder='Enter your email...' size={"sm"} />
            </FormControl>
            <FormControl>
                <FormLabel>Username</FormLabel>
                <Input type='text' placeholder='Enter your username...' size={"sm"} />
            </FormControl>
            <FormControl>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input type={showPassword ? "text" : "password"} placeholder='Enter your password...' size={"sm"} />
                    <InputRightElement h={"full"}>
                        <Button variant={"ghost"} size={'sm'} onClick={(e) => setShowPassword(!showPassword)}>
                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <Button w={"full"}>Sign Up</Button>
        </>
    )
}

export default SignUp