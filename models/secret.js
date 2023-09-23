const mongoose=require("mongoose");
const secretSchema=new mongoose.Schema({
    name:
    {
        type:String,
        requried:true
    },
    secret:
    {
        type:String,
        required:true
    }
});

const Secret=mongoose.model("Secret",secretSchema);

module.exports=Secret;