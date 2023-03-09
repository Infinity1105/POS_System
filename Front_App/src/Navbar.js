import React from "react";
import { MoonIcon, SunIcon ,ChevronDownIcon} from "@chakra-ui/icons";
// import { ColorModeScript } from '@chakra-ui/react'
import { Flex, Heading, Spacer ,IconButton,useColorMode } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button
  } from '@chakra-ui/react'




function Navbar(){
        const { colorMode, toggleColorMode } = useColorMode();
    return( 
        <Flex bg={colorMode === 'light' ? "#00ABB3" : "#083AA9"} mb={10}>
            <Link to="/"><Heading as='h2' p={3} size='lg' noOfLines={1}>POS system</Heading></Link>
            <Spacer/>
            <Menu>
            <MenuButton 
            bg={colorMode === 'light' ? "#8FD6E1" : "#1597BB"}
            as={Button} rightIcon={<ChevronDownIcon />} m={2}>
                Admin
            </MenuButton>
            <MenuList>
                <Link to="/refill"><MenuItem>Refill</MenuItem></Link>
                <Link to="/stockView"><MenuItem>stock view</MenuItem></Link>
                <Link to="/sells"><MenuItem>sells</MenuItem></Link>
            </MenuList>
            </Menu>
            <IconButton m={2} mr={4} onClick={toggleColorMode}
            _hover="#B2B2B2"
             bg={colorMode === 'light' ? "white" : "black"}
             icon={colorMode === 'light' ? <MoonIcon/> : <SunIcon/>}/>
        </Flex>
    );
};

export default Navbar;