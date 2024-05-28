import { SunIcon } from '@chakra-ui/icons'
import { Avatar, Box, Button, Center, Flex, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Spacer, Stack } from '@chakra-ui/react'
import React from 'react'
import SearchBar from '../SearchBar/SearchBar'
import { BiLogOut } from 'react-icons/bi'
import { GiBigGear } from 'react-icons/gi'

const Navbar = () => {
    return (
        <>
            <Box px={4} bgColor={"#2d2d2d"}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>

                    <Box marginLeft={5}>Logo</Box>

                    <Box marginLeft={10}>
                        <SearchBar />
                    </Box>

                    <Flex alignItems={'center'}>
                        <Stack direction={'row'} spacing={7}>
                            <Button >
                                <GiBigGear />
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
                                        <p>Username</p>
                                    </Center>
                                    <br />
                                    <MenuDivider />
                                    <MenuItem><GiBigGear style={{ marginRight: "5px" }} />  Account Settings</MenuItem>
                                    <MenuItem><BiLogOut style={{ marginRight: "5px" }} /> Logout</MenuItem>
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