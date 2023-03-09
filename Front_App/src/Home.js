
import React  from "react";
import Form from "./Form";
import Header from './Header';


function Home(){
    return(
        <div>
            <Header first={"Welcome...!!!"}
                second={"billing..!!"}
            />
            <Form/>
        </div>
    );
};

export default Home;