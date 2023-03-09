import React, { useState } from "react";
import axios from './axios';
import {
Thead,useColorMode,Table,Box,NumberInput,Tr,Th,TableContainer,Tbody,Td,
NumberInputField,Button,Flex
} from "@chakra-ui/react";
import UpdateButton from './UpdateButton'


function UpdateProduct(props){

    const {colorMode}= useColorMode();



//     const postAPIData3=()=>{
//         axios.post("/Prods",).then((res)=>{
//         console.log(res.data);
//         const {Pname,CurrQuantity} =res.data;

//     })
//   }

    return(
    <Box>
        <TableContainer ml={50} mb={50}>
        <Table size='lg' width={700}>
            <Thead >
                <Tr>
                    <Th>Product Name</Th>
                    <Th>Quantity</Th>
                </Tr>
                </Thead>
                <Tbody>
                    <Tr boxSize='10'>
                        <Td>{props.name}</Td>
                        <Td>{props.quantity}</Td>
                    </Tr>
                </Tbody>
            </Table>
        </TableContainer>
        <UpdateButton/>
    </Box>
    );
};


export default UpdateProduct;