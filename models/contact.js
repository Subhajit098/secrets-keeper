const mongoose=require("mongoose");
const contactSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        requried:true
    },
    message:{
        type:String
    }
});

const User=mongoose.model("User",contactSchema);

module.exports=User;