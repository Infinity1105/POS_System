import React from "react";
import {  Tbody,Tr,Td} from "@chakra-ui/react";


function StockTable(props){
        return(
            <Tbody>
                <Tr boxSize='10'>
                    <Td>{props.PId}</Td>
                    <Td>{props.name}</Td>
                    <Td isNumeric>{props.quantity}</Td>
                </Tr>
            </Tbody>
    );
};


export default StockTable;