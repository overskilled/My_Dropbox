import { SearchIcon } from '@chakra-ui/icons'
import { Button, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import React from 'react'

const SearchBar = () => {

    return (
        <>
            <InputGroup >
                <InputLeftElement h={"full"}>
                    <Button variant={"ghost"} size={'sm'}>
                        <SearchIcon />
                    </Button>
                </InputLeftElement>
                <Input type='text' placeholder='Search for a file' borderRadius={"20px"} w={"100%"} />
            </InputGroup>
        </>
    )
}

export default SearchBar