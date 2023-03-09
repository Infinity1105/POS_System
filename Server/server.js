const express =require("express");
const mongoose =require('mongoose');
const cors =require('cors');

const app=express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/DBMS",()=>{
    console.log("connected to DB");
});
let ProductSchema =new mongoose.Schema({
    Prod_id:Number,
    name:String,
    quantity:Number,
    CpricePerkg:Number,
    SpricePerkg:Number
});


let CustomerSchema =new mongoose.Schema({
    Phone_no:Number,
    OrderNumber:Array,
});


var currentdate = new Date().toLocaleString(); 


let OrderSchema =new mongoose.Schema({
    OrderNumber:Number,
    Products:Array,
    Phone_no:Number,
    total:Number,
    dateAndTime:String
    
});

let InventorySchema=new mongoose.Schema({
    Prod_id:Number,
    name:String,
    quantity:Number,
    CpricePerkg:Number,
    SpricePerkg:Number
});

let AdminSchema=new mongoose.Schema({
    Admin_id:Number,
    Admin_name:String,
    Admin_PassWord:Number
});

let EmployeeSchema=new mongoose.Schema({
    Emp_id:Number,
    Emp_name:String,
    post:String,
    Salary:Number,
    dateOfJoin:Number,
});

const Product=mongoose.model("Product",ProductSchema);
const Customer=mongoose.model("Customer",CustomerSchema);
const Order=mongoose.model("Order",OrderSchema);
const Inventory=mongoose.model("Inventory",InventorySchema);
const Admin =mongoose.model("Admin",AdminSchema);
const Employee=mongoose.model("Employee",EmployeeSchema);


class storingClass{
    constructor(Prod_id,Pquantity){
        this.Prod_id=Prod_id;
        this.Pquantity=Pquantity;
    }
}

class sendingClass {
    constructor(Pname,Pquantity,CurrQuantity,PSprice){
        this.Pname=Pname;
        this.Pquantity=Pquantity;
        this.CurrQuantity=CurrQuantity;
        this.PSprice=PSprice;
    }
}
async function getLastId(){
    let Old_OrderArray=await (Order.find().sort({"_id":-1}).limit(1));
    let Old_OrderID=(Old_OrderArray[Old_OrderArray.length-1]).OrderNumber;
    return Old_OrderID;
}

let All_prods=[];

const CreateOrder=(Old_OrderID,Phone_no,All_prods,total)=>{
    const O={
        OrderNumber:++Old_OrderID,
        Products:All_prods,
        Phone_no:Phone_no,
        total:total,
        dateAndTime:currentdate
    }
    Order.create(O,function(err){
        if(err){
            console.log(err+"At order function");
        }
        else{
            console.log("Successfully added to orderSchema");
        }
    });
    
}

const CreateCustm=(Phone_no,Old_OrderID)=>{
    console.log(Old_OrderID);
    const newOrder=[++Old_OrderID];
    const newCustm={
        Phone_no:Phone_no,
        OrderNumber:newOrder
    }
    Customer.create(newCustm,function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log("Successfully added to custmer schema");
        }
    });
}


const constUpdate=(All_prods)=>{
    All_prods.forEach(prodt => {
        const {Prod_id,Pquantity}=prodt;
        console.log()
        console.log("All_prodcts elements "+ prodt.Prod_id);
        Product.findOne({Prod_id:Prod_id},(err,foundProdt)=>{
            if(foundProdt){
                console.log(foundProdt);
                const {quantity}=foundProdt;
                console.log("Pquantity is "+Pquantity);
                console.log("Old quantity is "+quantity);
                let Net=quantity-Pquantity;
                if(Net>0){
                    Product.updateOne({Prod_id:foundProdt.Prod_id},
                    {quantity:Net},(err,data)=>{
                        if(data){
                            console.log("Products schema updated");
                        }else{
                            console.log(err);
                        }
                    });
                }
                
            }
        });
    });
};

const findCustomer=(Phone_no,Old_OrderID)=>{
Customer.findOne({Phone_no:Phone_no},(err,custm)=>{
        if(custm){
            Customer.updateOne(
                { "Phone_no":Phone_no},
                { "$push": { "OrderNumber": ++Old_OrderID } },
                function (err, raw) {
                    if (err) CreateCustm(Phone_no,Old_OrderID);
                    console.log("Updated customer schema");
                }
             );
        }
        else{
            CreateCustm(Phone_no,Old_OrderID);
        }
});
}


let Old_OrderNumber=0;

app.get("/",function(req,res){
        res.send("connected successfully");
});



app.post("/",function(req,res){
    
    res.send("Post requent successfull");
});

app.post("/Print",function(req,res){
    const {Phone_no,total}=req.body;
    let a=getLastId();
    let ArrayPros=[];
    if(total>0){
        a.then(Old_OrderID=>{
            // console.log(Old_OrderID);
            CreateOrder(Old_OrderID,Phone_no,All_prods,total);
            findCustomer(Phone_no,Old_OrderID);
            constUpdate(All_prods);
            All_prods.splice(0);
            // console.log("All_prods made 0"+All_prods);
        });
    }
    console.log(req.body);
});


app.get("/stockView",function(req,res){
    Product.find({},(err,prodts)=>{
        ArrayPros=prodts
        console.log(prodts);
        res.send(prodts);
    });
});

app.post("/refil",function(req,res){
    res.send("Post reqeust from refile route");
});


app.post("/Prods",function(req,res){
    // console.log(req.body);
    const  {Prod_id,Phone_no,quantity}=req.body;
    console.log(req.body);
    Product.findOne({Prod_id:Prod_id},(err,prod)=>{
        if(prod){
            const sendingObj=new sendingClass(prod.name,quantity,prod.quantity,prod.SpricePerkg);
            const storingObj=new storingClass(prod.Prod_id,quantity);
            All_prods.push(storingObj);
            console.log(All_prods);
            res.send(sendingObj);
        }else{
            res.send(err);
        }
    })
    
});




app.listen(3001,function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log("connected successfully");
    }
})