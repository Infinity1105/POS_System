import React, { useState } from "react";
import axios from './axios';
import {
Thead,useColorMode,Table,Box,NumberInput,Tr,Th,TableContainer,Tbody,Td,
NumberInputField,Button,Flex
} from "@chakra-ui/react";
import {AddIcon,MinusIcon} from "@chakra-ui/icons" ;
import Mytable from './tabel2';


function UpdateButton(){


    const [Quantity,setQuantity]=useState(0);
    const {colorMode}= useColorMode();
    const onAdd=()=>{

    }
    const onSub=()=>{

    }
    const AfterSubmit=()=>{
        
    }
    return(
        <form>
        <Flex m='auto'>
        <Button ml={290} bg={colorMode === 'light' ? "#5F9DF7" : "#1597BB"}><MinusIcon/></Button>
        <NumberInput ml={5} width={250}>
            <NumberInputField
            name="Uqunatity"
            value={Quantity} 
            placeholder="Updating quantity">
            </NumberInputField>
        </NumberInput>
        <Button  ml={5} bg={colorMode === 'light' ? "#5F9DF7" : "#1597BB"}><AddIcon/></Button>
        </Flex>
        </form>
    );
};


export default UpdateButton;