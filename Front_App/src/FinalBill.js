
import React, { useState } from "react";
import { Button, Center, NumberInput,NumberInputField,useColorMode } from "@chakra-ui/react";
import axios from "axios";





function FinalBill(){



    const [Phone_no,SetPhone_no]=useState(0);

    const handlechange=(evevt)=>{
        const {value}=evevt.target;
        SetPhone_no(value);
    }


    const postAPIData=()=>{
       const res= axios.post('/Phone.no',Phone_no).then((res)=>{
        console.log(res);
        })
    };
    
    const { colorMode} = useColorMode();
    return(
        <Center pos='absolute' bottom={63}>
            <form >
        </form>
        </Center>
    );
};


export default FinalBill;