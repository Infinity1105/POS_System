import React,{useEffect, useState}from "react";
import axios from "./axios";
import Mytable from './StockTable';
import {
  Table,
  Thead,
  Tr,Th,
  TableCaption,
  TableContainer,
  Box,
  useColorMode
} from "@chakra-ui/react";
import Header from "./Header";




let index=0;
function StockView() {
    const { colorMode} = useColorMode();
    const [Product,setProduct]=useState([]);
    const getAPIData=async()=>{
      try
      {
        const res=await axios.get("/stockView");
        setProduct(res.data);
      }
      catch(error){
        console.log(error);
      }
      
  }
 
  useEffect(()=>{
    getAPIData();
  },[])
  console.log(Product);

  return (
    <Box m='auto' w={1000} h={750}
    border='5px' 
      borderColor={colorMode==='light' ? '#00000' : 'white'}
      rounded='md' borderStyle="double">
      <Header first={"Stocks...."}
      second={"Stocks...."} 
      ></Header>
      <TableContainer size={1500} m={20}>
        <Table size="lg">
          <TableCaption>Current stocks available</TableCaption>
          <Thead>
              <Tr>
                <Th>Product id</Th>
                <Th>Product name</Th>
                <Th isNumeric>Quantity</Th>
              </Tr>
            </Thead>
            {Product.map((EachProd)=>{
              return(
                  <Mytable 
                    key={index++}
                    PId={EachProd.Prod_id}
                    name={EachProd.name}
                    quantity={EachProd.quantity}
                  />);
            })}
        </Table>
      </TableContainer>
    </Box>
  );
}

export default  StockView;
