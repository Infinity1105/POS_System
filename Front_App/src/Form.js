import React,{ useEffect, useState } from "react";
import axios from './axios';
import { Button,Flex,Spacer,useColorMode} from '@chakra-ui/react'
import { Box , Center, Table,Thead,Tr,Th,TableContainer} from '@chakra-ui/react'
import {NumberInput,NumberInputField,NumberInputStepper,NumberIncrementStepper,NumberDecrementStepper,
} from '@chakra-ui/react'
import Mytable from "./table";
import Total from './Total'
import ErrorMsg from './ErrorMsg';
import FinalBill from './FinalBill';


let orderNumber=1;
function Form(){

const [Product,setProduct] =useState({
    Prod_id:0,
    Phone_no:0,
    quantity:0,
  });
const [total,setTotal]=useState(0);
const [BillProds,SetBillProds] =useState([{
}]);
const { colorMode} = useColorMode();
const obj={
  Phone_no:Product.Phone_no,
  total:total
}
let index=1;
  const postAPIData=()=>{
    // console.log(Product.Prod_id+" "+ Product.quantity);
        const res=axios.post("/",Product).then((res)=>{
        // console.log(res.data);
    })
  }

  const postAPIData1=()=>{
    // console.log(Product.Prod_id+" "+ Product.quantity);
        const res=axios.post("/Print",obj).then((res)=>{
        console.log(res.data);
    })
  }

  const postAPIData2=()=>{
    // console.log(Product.Prod_id+" "+ Product.quantity);
        const res=axios.post("/Prods",Product).then((res)=>{
        console.log(res.data);
        const {Pname,Pquantity,CurrQuantity,PSprice} =res.data;
        SetBillProds((prev)=>{
          return [...prev,res.data];
        });
        setTotal((prev)=>{
          if(Pquantity<CurrQuantity) return(prev+(Pquantity*PSprice));
          else return(prev);
        });
    })
  }

  // const getAPIData=async()=>{
  //     try
  //     {
  //       const res=await axios.get("/");
  //       console.log(res);
  //     }
  //     catch(error){
  //       console.log(error);
  //     }
      
  // }
  
  // useEffect(()=>{
  //   getAPIData();
  // },[])


  const UpdateOrderNumber=()=>{
    postAPIData1();
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

//   const handleChange1=(event)=>{
//     SetPhone_no(event.target.value)
//     postAPIData1(Phone_no);
// };


  const AfterSubmit=(event)=>{  

    postAPIData2();
    event.preventDefault();
    // console.log(BillProds[BillProds.length-1]);
    // console.log(total);
  }
  
    return (
    <Box m="auto" w={1000} h={750} border='5px' 
      borderColor={colorMode==='light' ? '#00000' : 'white'}
      rounded='md' borderStyle="double">
      <form onSubmit={AfterSubmit} >
           <NumberInput w={300}
           m={25}
            borderColor={colorMode==='light' ? '#00000' : 'white'}
          >
            <NumberInputField 
            name="Phone_no"
            placeholder="Enter mobile number"
            precision={2} step={0.2}
            onChange={handleChange}
            />
        </NumberInput>
        <Flex alignItems='center' gap='10' m="4" mr={50}>
        <NumberInput 
        borderColor={colorMode==='light' ? '#00000' : 'white'}
        ml={50}>
          <NumberInputField 
          name="Prod_id"
          onChange={handleChange}
          placeholder="Enter Product id"
          precision={2} step={0.2}
          />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Spacer />
        <NumberInput 
        borderColor={colorMode==='light' ? '#00000' : 'white'}>
          <NumberInputField 
          name="quantity"
          onChange={handleChange}
          placeholder="Enter quantity"/>
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        
        <ErrorMsg 
        Pquantity={BillProds.length!==0 && BillProds[BillProds.length-1].Pquantity}
        CurrQuantity={BillProds.length!==0 && BillProds[BillProds.length-1].CurrQuantity}
        />
        </Flex>
      </form>
      
        <TableContainer m={20}>
        <Table size='m'>        
            <Thead>
              <Tr>
                <Th>Product Name</Th>
                <Th>Quantity</Th>
                <Th isNumeric>Price</Th>
              </Tr>
            </Thead>

            {BillProds.map((EachProd)=>{
                if(EachProd.Pquantity<EachProd.CurrQuantity){
                  return(
                  <Mytable 
                    key={index++}
                    name={EachProd.Pname}
                    quantity={EachProd.Pquantity}
                    SpricePerkg={EachProd.PSprice}
                  />);
                }

            })}
          </Table>
        </TableContainer>
            <Flex>
        <Center>
        <form>
        <Button  
        ml={450}  
        pos='absolute' bottom={10} 
        type='submit' 
        bg={colorMode==='light' ? '#59CE8F' : '#3CCF4E'}
        onClick={UpdateOrderNumber}
        >Print</Button>
        </form>
        </Center>
        <Total  total={total}/>
            </Flex>
   </Box>
    );
};

export default Form;
