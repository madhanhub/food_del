import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://madhan91101:Mcabca%409@klncollege.ab2hmvj.mongodb.net/mern',{ useNewUrlParser: true, useUnifiedTopology: true }).
    then(()=>{console.log("DataBase Connected")}).catch((error)=>{
        console.log('db not connected');
    });
}