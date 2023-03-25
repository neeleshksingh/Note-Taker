const express = require('express')
const connection = require('./connection/connection')
connection()
const task = require('./routes/route')
const app = express()

app.use(task)

app.get("*", (req,res)=>{
    res.status(404).send("API NOT FOUND")
})

app.listen(3000 || process.env.PORT, ()=>{console.log("listening on port 3000")})