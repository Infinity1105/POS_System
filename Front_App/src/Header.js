import React from "react";
import Typewriter from "typewriter-effect";
import { Center, Heading } from "@chakra-ui/react"

function Header(props){

    return(
        <Center m={5}>
            <Heading as='h1' size='3xl'>
            <Typewriter 
                onInit={(typewriter)=>{
                    typewriter.loop=true;
                    typewriter.typeString(props.first).pauseFor(2000).deleteAll().typeString(props.second).start();
                }}
            />
            </Heading>
        </Center>
    )
};


export default Header;