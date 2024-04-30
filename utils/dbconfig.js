import mongoose from "mongoose";

export async function connectToDb(){
    await mongoose.connect(process.env.MONGODB_URL)
    .catch((err) => {
        console.log(err);
        throw new Error("Can't connect to Database")
    });
}

export async function disconnectFromDb(){
    await mongoose.disconnect()
    .catch((err)=> {
        console.log(err);
        throw new Error("Can't disconnect from Database")
    });
}