import { Box, Flex, Spacer, Tooltip } from '@chakra-ui/react'
import React from 'react'
import { BiHome, BiHomeCircle, BiLogOut } from 'react-icons/bi'

const Sidebar = () => {
    return (
        <Box
            height={"100vh"}
            py={8}
            position={"sticky"}
            top={0}
            left={0}
            bgColor={"#2d2d2d"}
        >
            <Flex direction={"column"} gap={10} w={"full"} height={"full"}>
                <Flex direction={"column"} gap={5} cursor={"pointer"} justifyContent={"center"}
                    alignItems={"center"}>
                    <Tooltip
                        hasArrow
                        label={"home"}
                        ml={2}  
                        placement='right'
                        openDelay={300}
                    >
                        <Flex
                            alignItems={"center"}
                            gap={4}
                            _hover={{ bg: "whiteAlpha.400" }}
                            borderRadius={6}
                            p={2}
                            mt={'auto'}
                            w={10}
                        >
                            <BiHomeCircle size={25} />
                        </Flex>
                    </Tooltip>
                </Flex>
                <Flex direction={"column"} cursor={"pointer"} gap={5} justifyContent={"center"}
                    alignItems={"center"}>
                    <Tooltip
                        hasArrow
                        label={"home"}
                        placement='right'
                        ml={2}
                        openDelay={300}
                    >
                        <Flex
                            alignItems={"center"}
                            gap={4}
                            _hover={{ bg: "whiteAlpha.400" }}
                            borderRadius={6}
                            p={2}
                            mt={'auto'}
                            w={10}
                        >
                            <BiLogOut size={25} />
                        </Flex>
                    </Tooltip>
                </Flex>
            </Flex>
        </Box>
    )
}

export default Sidebar