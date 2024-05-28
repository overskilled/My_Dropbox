import React from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../Components/Navbar/Navbar'
import { Box, Flex } from '@chakra-ui/react'
import Sidebar from '../Components/Sidebar/Sidebar'

const PageLayout = ({ children }) => {
    const { pathname } = useLocation()

    return (
        <>
            {pathname !== "/auth" && <Navbar />}
            <Flex>
                {/* Side bar */}
                {pathname !== "/auth" ?
                    <Box w={'114px'}>
                        <Sidebar />
                    </Box>
                    : null}

                <Box flex={1} w={"calc(100% - 70px)"}>
                    {children}
                </Box>

            </Flex>
        </>
    )
}

export default PageLayout