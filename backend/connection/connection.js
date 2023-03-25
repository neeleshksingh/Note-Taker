const mongoose = require('mongoose')
const {uri} = require('../key')
mongoose.set(`strictQuery`, true)
async function getConnection(){
    await mongoose.connect(uri).then(()=>{
        console.log("database connected successfullly");
    })
}

module.exports = getConnection