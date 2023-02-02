

const jwt = require('jsonwebtoken');
const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
require("../db/conn");
const User = require("../model/userSchema");
router.get("/", (req, res) => {
    res.send("hello router")
})
// REGISTERED PAGE
//using promises
// router.post("/register",(req, res) => {
//     const { name, email, phone, work, password, cpassword } = req.body;
//    if(!name||!email||!phone||!work||!password||!cpassword ){
//     return res.status(422).json({Error:"plz fill properly"})
//    }
//    User.findOne({email:email})
//    .then((userExist)=>{
//     if(userExist){
//         return res.status(422).json({Error:" email aleady registred bro"})
//     }
//     const user=new User({name, email, phone, work, password, cpassword});
//     user.save().then(()=>{
//         res.status(201).json({message:"registered succesfuly"});
//     }).catch((err)=>res.status(500).json({error:"failed to registered"}))
//    }).catch(err => {console.log(err);});
// });

//using async
router.post("/register", async (req, res) => {
    const { name,dob, email, phone } = req.body;
    if (!name ||dob|| !email || !phone ) {
        return res.status(422).json({ Error: "plz fill properly" })
    }
    try {
        const userExist = await User.findOne({ email: email });


        if (userExist) {
            return res.status(422).json({ Error: " email aleady registred bro" })

        } else if (password == !cpassword) {
            return res.status(422).json({ Error: " password not match brother" })

        } else {
            const user = new User({ name, email, phone, work, password, cpassword });
            //hash kerna hoga jo ke userschema mai hai last mai

            //    const userRegister =  
            await user.save();
            //    console.log(`${user} user Register successfully`);
            //    console.log(userRegister)

            res.status(201).json({ message: "registered succesfuly" });
        }



    } catch (err) {
        console.log(err);
    }

});


//login /signin page

router.post("/signin", async (req, res) => {
    // console.log(req.body);
    // res.json({ message: "signin page" });
    try {
        let token;
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "plz filled the data" })
        }

        const userLogin = await User.findOne({ email: email });
        // console.log(userLogin)
        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);

            token = await userLogin.generateAuthToken();
            // console.log(token)
            res.cookie('jwttoken', token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            });

            if (!isMatch) {
                res.status(400).json({ error: "invalid crediential" })
            } else {
                res.json({ message: "user Signin Succesfully" })
            }
        } else {
            res.status(400).json({ error: "invalid crediential" })

        }


    } catch (err) {
        console.log(err);
    }
});
module.exports = router;