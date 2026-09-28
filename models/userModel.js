const mongoose = require("mongoose")
const validator = require("validator")
const bcryptjs = require("bcryptjs")

const userSchema = new mongoose.Schema({
  userName:{
    type:String,
    required:true,
    trim:true
  },
    city:{
    type:String,
    required:true,
    trim:true
  },
  password:{
      type:String,
    required:true,
    trim:true,
    minLength:8

  },
  email:{
    type:String,
    required:true,
    trim:true,
    lowercase:true,
    unique:true,
    validate:[validator.isEmail,"emil wrong"]
    // validate(val){
    //   if(!validator.isEmail(val)){
    //     res.status(400).send("email not provided")
    //   }
    // }
  },
  age:{
  type:Number,
  default:20,
  
  validate(val){
    if(val<=0){
      res.status(400).send("wrong age")
    }
  }

  },


})

//اعمل هاش للباس قبل save
userSchema.pre("save",async function(){
  console.log("pre save")
  const user = this  //current document or current user
  if(user.isModified("password"))//true if password create or update
  user.password = await bcryptjs.hash(user.password , 8)
// const compared = await bcryptjs.compare()
})

// compare وقت الـ Login
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword,this.password)  //return true/false in 
  //const isMatch = await user.comparePassword(password); in login
};

const User= mongoose.model("user",userSchema)

module.exports = User