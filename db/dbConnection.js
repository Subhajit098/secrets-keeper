const mongoose=require("mongoose");

const connectionToDB=async()=>{
    try{
        const connect = await mongoose.connect("mongodb://0.0.0.0:27017/secretsDB",{useUnifiedTopology:true})
        console.log("Connected to the database")
    }
    catch(err){
        console.log(err.message);
    }
}


module.exports=connectionToDB