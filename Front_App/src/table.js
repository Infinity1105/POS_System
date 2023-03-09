import React from "react";
import {  Tbody,Tr,Td} from "@chakra-ui/react";



const findPrice=(SPrice,quatity)=>{
  return (SPrice*quatity);
};


function table(props){
        return(
            <Tbody>
                <Tr boxSize='10'>
                    <Td>{props.name}</Td>
                    <Td>{props.quantity}</Td>
                    <Td isNumeric>{props.SpricePerkg * props.quantity }</Td>
                </Tr>
            </Tbody>
    );
};


export default table;