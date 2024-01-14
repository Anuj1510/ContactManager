const express = require("express")
const errorHandler = require("./middleware/errorHandler")
const connectDb = require("./config/dbConnection")
const dotenv = require("dotenv").config()

connectDb()

const app = express()
const port = process.env.port || 4000

app.use(express.json()) // body pareser to parse the json object
app.use("/api/contacts",require("./routes/contactRoutes")); // middle ware
app.use("/api/users",require("./routes/userRoutes")); // middle ware
app.use(errorHandler) // middleware...ye res ko json mai convert karega

app.listen(port,() =>{
    console.log(`Server running on port ${port}`)
})

