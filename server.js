import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'

//config env
dotenv.config();


const app = express();

//rest api
app.get("/",(req,res)=>{
    res.send({
        messaage:"welcome to ecommerce app",
    });
});
const PORT =process.env.PORT||8080;

app.listen(PORT,()=>{
    console.log(`server running on ${process.env.DEV_MODE} mode on port ${PORT}`);
});