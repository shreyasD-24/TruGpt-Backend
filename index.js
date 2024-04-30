import app from "./app.js";
import { connectToDb } from "./utils/dbconfig.js";
const port = process.env.PORT || 5000;



connectToDb()
.then(()=>{
    app.listen(port, ()=>{
        console.log("Connected to Database and Server is Running");
    })
})


