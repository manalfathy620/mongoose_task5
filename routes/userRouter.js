const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

router.post("/users", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    // await user.save();
    user.password = undefined
    res.status(201).send({msg:"user created successfully",user});
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/users", (req, res, next) => {
  User.find()
    .then((users) => {
      users.forEach((user)=> user.password = undefined )
      res.status(200).send(users);
    })
    .catch((e) => {
      res.status(500).send(e);
    });
});

router.get("/users/:id", (req, res, next) => {
  console.log(req.params.id);
  User.findById(req.params.id).select("-password")
    .then((user) => {
      if (!user) {
        return res.status(404).send("user not found");
      }
      res.status(200).send(user);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

router.patch("/users/:id", async (req, res, next) => {
  try {
    // const user = await User.findByIdAndUpdate(req.params.id,req.body,{
    //   new:true,
    //   runValidators:true
    // })

    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).send("user not found");
    }
    console.log(user);

    const keys = Object.keys(req.body)
    // console.log(keys)
  
    const allowFields = ["userName","age","city"]
    
    const invalidKey = keys.find((key)=> !allowFields.includes(key))
    if(invalidKey){
      return res.status(400).send(`Not allowed to update ${invalidKey}`);
    }
      keys.forEach((key)=>user[key]=req.body[key])
    // user.password = req.body.password
    // user.age = req.body.age
    // Object.assign(user, req.body);
    //اليوزر هنا قبل التشفير
    await user.save(); //هنا نادى فانكشن التشفير وبعدين سيف
    console.log(user); //هنا اليوزر بعد التشفير

    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
    return  res.status(404).send("user not found");
    }
    res.status(200).send({msg:"deleted successfully"});
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
