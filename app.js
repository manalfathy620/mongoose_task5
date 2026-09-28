
const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/mongoose")
        .then(()=>{console.log("DB connected")})
        .catch((e)=>{console.log(e)})

                
const express = require("express")
const app = express()

const  morgan = require("morgan")
app.use(morgan("dev"))        

const port = process.env.PORT || 3000
const userRouter = require("./routes/userRouter")

app.use(express.json())

app.use(userRouter)




app.listen(port,()=>{
  console.log("server running on port 3000")
})