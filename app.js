const dotenv = require("dotenv")
const mongoose = require("mongoose");
const express = require("express");
const app = express();
dotenv.config({ path: "./config.env" });
require("./db/conn")

// const User = require("./model/userSchema")
app.use(express.json());

// we link the router files to make our route easy
app.use(require("./router/auth"));
// const mainRoutes = require("./router/auth")
// app.use(mainRoutes)


const PORT = process.env.PORT


// middelware
const middelware = (req, res, next) => {
    console.log(`middleware`)
    next();
}


// app.get("/", (req, res) => {
//     res.send("hello server")
// })
app.get("/about", middelware, (req, res) => {
    res.send("hello about")

})
app.get("/contact", (req, res) => {
    res.send("hello contact")
})
app.get("/login", (req, res) => {
    res.send("hello login")
})
app.get("/sigin ", (req, res) => {
    res.send("hello sigin")
})
app.get("/signup", (req, res) => {
    res.send("hello signup")
})
app.listen(PORT, () => {
    console.log(`Server running on  ${PORT}`);
})