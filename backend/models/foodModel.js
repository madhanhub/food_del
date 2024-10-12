import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: {type:String,required:true},
    description: {type:String,required:true},
    price:{type:Number,required:true},
    image:{type:String,required:true},
    category:{type:String,required:true},
    outofstock:{type:String,require:true},
    offerpercentage:{type:Number,require:true}
})

const foodModel = mongoose.models.food || mongoose.model("food",foodSchema)

export default foodModel;