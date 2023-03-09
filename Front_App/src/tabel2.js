import React from "react";
import {  Tbody,Tr,Td} from "@chakra-ui/react";


function table2(props){
        return(
            <Tbody>
                <Tr boxSize='10'>
                    <Td>{props.id}</Td>
                    <Td>{props.name}</Td>
                    <Td isNumeric>{props.quantity}</Td>
                </Tr>
            </Tbody>
    );
};


export default table2;