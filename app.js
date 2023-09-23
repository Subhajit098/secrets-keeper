"use strict"

const express = require("express");
const bp = require("body-parser");
const ejs=require("ejs");
const mongoose=require("mongoose");
const flash=require("connect-flash");
const app= express();
const connectionToDB=require("./db/dbConnection.js")
const User=require("./models/contact.js")
const Secret=require("./models/secret.js")


app.use(bp.urlencoded({extended:true}));

app.use(express.static("public"));

app.set("view engine","ejs");

app.use(flash());

// connecting to mongodb via mongoose
connectionToDB();

// defining a contact schema for the contact form


// defining a secretSchema:


// an SecretModel:
// const Secret=mongoose.model("Secret",secretSchema);

let all_secrets=[{name:"anonymous",
secret:"I am Binod"}
];

// an User model
// const User=mongoose.model("User",contactSchema);

let title="";

// home route
app.get("/",(req,res)=>
{
    res.render("home",{title:"Homepage"});
});

// home route
app.get("/home",(req,res)=>{
    res.redirect("/");
});

// share route
app.get("/share",(req,res)=>
{
    // authenticate first
    // then you can share your secrets
    res.render("share",{title:"Share your Secrets"});
});


app.post("/share",(req,res,next)=>
{
    let name=req.body.name;
    let secret=req.body.secret;
    
    User.findOne({name:name},(err,foundName)=>
    {
        if(err)
        {
            res.status(404).render("404",{title:"404"});
        }

        else if(foundName)
        {
            console.log(`${foundName} Name already exists! Use other name`);
        }
        else
        {
            console.log("Unique name!");
            let secret1=new Secret({
                name:name,
                secret:secret
            });
            secret1.save()
            .then((result)=>
            {
                all_secrets.push(secret1);
                return res.redirect("/secrets");
            })
        }
    })
   
});

// secrets route
app.get("/secrets",(req,res)=>
{
    // authenticate then show the home page
    // res.send("login");
    res.render("secrets",{title:"Secrets",foundSecrets:all_secrets});
});

app.get("/secrets/:id",(req,res)=>
{
    let id=req.params.id;
    
})

// contact route
app.get("/contact",(req,res)=>
{
    res.render("contact",{title:"Contact"});
});

app.post("/contact",(req,res)=>
{
    let name=req.body.name;
    let email=req.body.email;
    let message=req.body.text;
    const user1=new User({
        name:name,
        email:email,
        message:message
    });

    User.find({email:email},(err,foundUser)=>
    {
        if(foundUser)
        {
            console.log("Already Present!");
        }
        else
        {
            console.log("Not Present!");
            user1.save();
        }
    })

    // console.log(name,email);
    res.render("successful_send",{title:"Received"});
});

app.delete("secrets/:id",(req,res)=>
{
    let id=req.params.id;
    Secret.findByIdAndDelete()
    .then((result)=>
    {
        res.json({ redirect :"/secrets"});
    })
    .catch(err=>{
        console.log(err);
    });
})


app.use((req,res)=>
{
    res.status(404).render("404",{title:"404"});
})


const port=process.env.PORT || 3002;

app.listen(port,()=>
{
    console.log("Server is running on the port");
})








