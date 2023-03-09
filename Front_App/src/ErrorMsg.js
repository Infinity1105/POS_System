import React from "react";
import { useToast,WrapItem,Wrap,Button } from '@chakra-ui/react'

const message=(Pquantity,CurrQuantity)=>{
    if(Pquantity>CurrQuantity){
        return 'Low Balance = '+CurrQuantity;
    }else{
        return 'Completed';
    }
};

const status=(Pquantity,CurrQuantity)=>{
    if(Pquantity>CurrQuantity){
        return 'error';
    }
    else{
        return 'success';
    }
};



function ErrorMsg(prop) {
    const toast = useToast({
        position: 'top'
    })
    return (
      <Wrap>
         <WrapItem>
            <Button
            colorScheme='blue' type="submit"
            onClick={() =>
              toast({
                title: message(prop.Pquantity,prop.CurrQuantity),
                status: status(prop.Pquantity,prop.CurrQuantity),
                isClosable: true,
              })
            }
            >
              Submit
            </Button>
          </WrapItem>
      </Wrap>
    )
  };

  export default ErrorMsg;