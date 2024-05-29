import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import useLogin from '../../Hooks/useLogin'

const Login = () => {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    })
    const [showPassword, setShowPassword] = useState(false)
    const { login, loading} = useLogin()

    return (
        <>
            <Text fontSize={25} fontWeight={"bold"}>
                Login
            </Text>
            <FormControl>
                <FormLabel>Email</FormLabel>
                <Input type='email' placeholder='Enter your email...'
                    size={"sm"}
                    value={inputs.email}
                    onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
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
                        <Button variant={"ghost"} size={'sm'} onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <Button w={"full"}
                colorScheme='blue'
                isLoading={loading}
                onClick={() => login(inputs)}
            >
                Login
            </Button>
        </>
    )
}

export default Login