import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb://localhost:27017/mydb',{ useNewUrlParser: true, useUnifiedTopology: true }).
    then(()=>console.log("DataBase Connected")).catch((error)=>{
        console.log('db not connected');
    });
}