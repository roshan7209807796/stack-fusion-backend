const mongoose = require("mongoose");

const DB = process.env.DATABASE;

mongoose.connect(DB, {
    
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true,
    useFindAndModify:false

}).then(() => {
    console.log("Connection Successsful");
}).catch((err) => console.log("no connection"))


// mongoose.connect(DB,{ useNewUrlParser: true, useUnifiedTopology: true }, () => {
//     console.log('connected to DB')
// })

// app.listen(3000, () => console.log('Server running......'));
