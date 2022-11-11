const mongoose = require("mongoose") 
const User = require('../schema/users.schema.js') 
const dotenv = require('dotenv') 
const bcrypt = require('bcrypt') 
const jwt = require("jsonwebtoken")

dotenv.config();

const connectToDatabase = () => {
    try {
        mongoose.connect(process.env.DB_URI)
        console.log(`Connected succesfully to MongoServer!!`)
    } catch (err) {
        throw err
    }
}

const registerUser = async(req, res) => {

    const {name, lastname, role, email, password} = req.body

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({name, lastname, role, email, password: hashedPassword})
    const user = await User.findOne({email})
    if(user){
        return res.status(409).json({message: "User email already exists"})
    }
    if(role !== 1 && role !== 2){
        return res.status(409).json({message: "Invalid role number"})
    }
    await newUser.save()
    res.status(201).json({message: "User created succesfully", user: newUser})
}

const loginUser = async(req, res) => {
    
    const {email, password} = req.body

    const userFound = await User.findOne({email})
    if(!userFound){
        return res.status(401).json({message: "User not found"})
    }   
    const matchPassword = bcrypt.compare(password, userFound.password)
    if(!matchPassword){
        return res.status(401).json({message: "Invalid password"})
    }
    const token = jwt.sign({id: userFound._id}, process.env.SECRET_KEY, {expiresIn: 86400})
    res.status(200).json({token})
}

module.exports = {
    connectToDatabase,
    registerUser,
    loginUser
}