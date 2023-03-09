import React from "react";
import { Text } from "@chakra-ui/react";


function Total(props){
    // console.log(props.total);
    return(
        <Text pos='absolute' mt={100} right={300}  p={2} bottom={70} 
        border='5px' borderStyle="double"  as='b' fontSize='2xl'>Total : {props.total} RS</Text>
    );

};


export default Total;