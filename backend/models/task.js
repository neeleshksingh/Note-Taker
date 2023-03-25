const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {ObjectId} = mongoose.Schema.Types

const task = new Schema({
    title : {type : String, required:true},
    desciption : {type : String, required:true},
    user : {type : ObjectId, ref:'User'}
})

const Task = mongoose.model("Task", task)
module.exports = Task