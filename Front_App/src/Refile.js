import React, { useState } from "react";
import axios from './axios';
import {
  NumberInput,NumberInputField,NumberInputStepper,NumberIncrementStepper,NumberDecrementStepper,
  Box,Button,
  useColorMode,Flex
} from "@chakra-ui/react";
import {SearchIcon} from "@chakra-ui/icons"
import Header from "./Header";
import UpdateProduct from './UpdateProduct'

let isEntered=false;

function Refill() {

    const { colorMode} = useColorMode();
    const [Product,setProduct]=useState();
    const [ProdName,setProdName]=useState("");
    const [Quantity,setQuantity]=useState(0);

    const postAPIData2=()=>{
          axios.post("/Prods",Product).then((res)=>{
          console.log(res.data);
          const {Pname,CurrQuantity} =res.data;
          setProdName(Pname);
          setQuantity(CurrQuantity);
      })
    }

    const postAPIData3=()=>{
      axios.post("/Prods",Product).then((res)=>{
      console.log(res.data);
      const {Pname,CurrQuantity} =res.data;
      setProdName(Pname);
      setQuantity(CurrQuantity);
  })
}

    const AfterSubmit=(event)=>{  
      postAPIData2();
      isEntered=true;
      event.preventDefault();
    }


    const handleChange=(event)=>{
      const {name,value} =(event.target);
       setProduct((PrevProd)=>{
         return{
           ...PrevProd,
           [name]:(value)
         }
       });
    };
  return (
    <Box m='auto' w={1000} h={750}
    border='5px' 
      borderColor={colorMode==='light' ? '#00000' : 'white'}
      rounded='md' borderStyle="double">
      <Header first={"Update stocks...!!!"} second={"Update stocks...!!!"}></Header>
      <form onSubmit={AfterSubmit}>
      <Flex  m={10}>
      <NumberInput width="auto">
      <NumberInputField 
          name="Prod_id"
          placeholder="Enter Product id"
          precision={2} step={0.2}
          />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Button    
        type='submit'
        ml={5} 
        bg={colorMode==='light' ? '#59CE8F' : '#3CCF4E'}><SearchIcon/></Button>
      </Flex>
      </form>
      <UpdateProduct name={ProdName} Quantity={Quantity}/>
    </Box>
  );
}

export default Refill;
