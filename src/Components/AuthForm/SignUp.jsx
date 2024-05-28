import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import useShowToast from '../../Hooks/useShowToast'
import useSignUp from '../../Hooks/useSignUp'

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [inputs, setInputs] = useState({
        email: '',
        username: '',
        password: ''
    })
    const showToast = useShowToast()
    const { signup, isLoading, error } = useSignUp()

    return (
        <>
            <Text fontSize={25} fontWeight={"bold"}>
                Register
            </Text>
            <FormControl >
                <FormLabel>Email</FormLabel>
                <Input
                    type='email'
                    placeholder='Enter your email...'
                    size={"sm"}
                    value={inputs.email}
                    onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                />
            </FormControl>
            <FormControl>
                <FormLabel>Username</FormLabel>
                <Input
                    type='text'
                    placeholder='Enter your username...'
                    size={"sm"}
                    value={inputs.username}
                    onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                />
            </FormControl>
            <FormControl>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input
                        type={showPassword ? "text" : "password"}
                        placeholder='Enter your password...'
                        size={"sm"}
                        value={inputs.password}
                        onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                    />
                    <InputRightElement h={"full"}>
                        <Button variant={"ghost"} size={'sm'} onClick={(e) => setShowPassword(!showPassword)}>
                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <Button 
                w={"full"}
                colorScheme='blue'
                isLoading={isLoading}
                onClick={() => signup(inputs)}>Sign Up</Button>
        </>
    )
}

export default SignUp