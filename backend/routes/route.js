const express = require('express')
const User = require('../models/register')
const Task  = require('../models/task')
const bcrypt = require('bcrypt')
const {jwt_token} = require('../key')
const jwt = require('jsonwebtoken')

const router = express.Router()
router.use(express.json())
router.use(express.urlencoded({extended:false}))

//Post api for register

router.post('/register', async(req,res)=>{
    try{
        const {email, password} = req.body
        if(!email || !password){
            return res.status(400).json({
                status : "failed",
                message : "enter all the fields"
            })
        }
        const existemail = await User.findOne({email:email})
        if(existemail){
            return res.status(402).json({
                status : "signup failed",
                message : "email already exist"
            })
        }
        bcrypt.hash(password, 10, async(err, hashedPass)=>{
            if(err){
                return res.status(400).json({
                    status : "failed",
                    message : err.message
                })
            }
            const data = await User.create({
                email,
                password : hashedPass
            })
            return res.status(200).json({
                status : "success",
                message : "signup successfully",
                data
            })
        })
    } catch(e){
        return res.status(404).json({
            error : e.message
        })
    }
})

// Post api for login

router.post('/login', async (req,res)=>{
    try{
        const {email,password} = req.body
        if(!email || !password){
            return res.status(400).json({
                status : "failed",
                message : "enter all the fields"
            })
        }
        const userData = await User.findOne({email})
        if(!userData){
            return res.status(404).json({
                status : "failed",
                error : "user not found"
            })
        }
        bcrypt.compare(password, userData.password, function(err,result){
            if(err){
                return res.status(404).json({
                    error : err.message
                })
            }
            if(result){
                const token = jwt.sign({_id:userData.id}, jwt_token)
                const {_id,email,password} = userData
                return res.status(200).json({
                    status : "success",
                    token : token,
                    user : {_id,email,password},
                    message : "user logged in successfully"
                })
            }
            else{
                return res.status(500).json({
                    error : "password not matched"
                })
            }
        })
    } catch(e){
        return res.status(404).json({
            error : e.message
        })
    }
})

//Post api for task

router.post("/task", async(req,res)=>{
    try{
       const {title, description, user} = req.body
       if(title && description){
        const data = await Task.create({
            title,
            description,
            user
        })
        return res.status(200).json({
            status : "success",
            data
        })
       }
       else{
        return res.status(400).json({
            status : "failed",
            message : "details are missing"
        })
       }
    } catch(e){
        return res.status(404).json({
            error : e.message
        })
    }
})

//Get Api for task

router.get("/task", async(req,res)=>{
    try{
        const data = await Task.find()
        if(data){
            return res.status(200).json({
                status : "success",
                data
            })
        }
        else{
            return res.status(400).json({
                error : "not found"
            })
        }
    } catch(e){
        return res.status(404).json({
            error : e.message
        })
    }
})

//Delete api for deleting task

router.delete('/task', async(req,res)=>{
    try{
        const data = await Task.deleteMany()
        if(data){
            return res.status(200).json({
                status: "success",
                data
            })
        }
        else{
            return res.status(400).json({
                status : "failed"
            })
        }
    }catch(e){
        return res.status(404).json({
            error : e.message
        })
    }
})

router.patch("/:id", async(req, res)=>{
    const {title, description} = req.body
    const data = await Task.find({_id:req.params.id})
    if(data.length){
        try{
            const updatePartial = await Task.updateOne({_id:req.params.id}, {$set: {title, description}})
            return res.status(204).json({
                data
            })
        } catch(e){
            return res.status(404).json({
                error : e.message
            })
        }
    }
    else{
        return res.status(404).json({
            error : "There is no task with that id"
        })
    }
})

module.exports = router