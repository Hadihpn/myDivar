const { default: mongoose } = require("mongoose");
mongoose.set("strictQuery",true)
mongoose.connect(process.env.DB_URL).then(() => {
    console.log("connected to DB.");
}).catch(err => {
    console.log(err?.message ?? "Failed DB connection");
})
// mongoose.connect(DB_URL,(err)=>{
//     console.log(err?err.message:"connected to mongodb");
// })