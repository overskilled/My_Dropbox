import { SunIcon } from '@chakra-ui/icons'
import { Avatar, Box, Button, Center, Flex, Image, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Spacer, Stack } from '@chakra-ui/react'
import React from 'react'
import SearchBar from '../SearchBar/SearchBar'
import { BiLogOut, BiSun } from 'react-icons/bi'
import { GiBigGear } from 'react-icons/gi'
import useAuthStore from '../../Store/authStore'
import useLogOut from '../../Hooks/useLogOut'

const Navbar = () => {
    const user = JSON.parse(localStorage.getItem("user-info"))
    const { loading, logout, error } = useLogOut()    

    return (
        <>
            <Box px={4} bgColor={"#2d2d2d"}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>

                    <Box marginLeft={5}>
                        <Image src='/nav-logo.png' alt='Navbar logo' />
                    </Box>

                    <Box marginLeft={10}>
                        <SearchBar />
                    </Box>

                    <Flex alignItems={'center'}>
                        <Stack direction={'row'} spacing={7}>
                            <Button >
                                <BiSun />
                            </Button>

                            <Menu>
                                <MenuButton
                                    as={Button}
                                    rounded={'full'}
                                    variant={'link'}
                                    cursor={'pointer'}
                                    minW={0}>
                                    <Avatar
                                        size={'sm'}
                                        src={''}
                                    />
                                </MenuButton>
                                <MenuList alignItems={'center'}>
                                    <br />
                                    <Center>
                                        <Avatar
                                            size={'2xl'}
                                            src={""}
                                        />
                                    </Center>
                                    <br />
                                    <Center>
                                        <p>{user?.username}</p>
                                    </Center>
                                    <br />
                                    <MenuDivider />
                                    <MenuItem onClick={logout}><BiLogOut style={{ marginRight: "5px" }} /> Logout</MenuItem>
                                </MenuList>
                            </Menu>
                        </Stack>
                    </Flex>
                </Flex>
            </Box>
        </>
    )
}

export default Navbar