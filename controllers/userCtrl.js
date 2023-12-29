const jwt = require('jsonwebtoken')
const userModel = require('../models/userModels')
const bcrpyt = require('bcryptjs')

const registerController = async(req,res) => {
    try{
        const exists = await userModel.findOne({email:req.body.email})
        if(exists)
        {
            return res
                .status(200)
                .send({message:`User Already Exists`, sucess:false})   
        }
        const password = req.body.password
        const salt = await bcrpyt.genSalt()
        const hashedPassword = await bcrpyt.hash(password,salt)
        req.body.password = hashedPassword
        const newUser = new userModel(req.body)
        await newUser.save()
        res.status(201).send({message:`Registration,`,sucess:true})
    }
    catch(err){
        console.log(err);
        res.status(500).send({sucess:false, message: `Register ${err.message}`})
    }

}
const loginController = async(req,res) => {
    try {
        const user = await userModel.findOne({email:req.body.email})
        if(!user)
        {
            return res
                .status(200)
                .send({message:`User Does Not Exist`, sucess:false})   
        }
        const match = await bcrpyt.compare(req.body.password,user.password)
        if(!match)
        {
            return res
                .status(200)
                .send({message:`Invalid Email or Password`, sucess:false})   
        }
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET, {expiresIn:'1d'})
        res.status(200).send({message:`Login Successful`,sucess:true, token})
    } catch(err)
    {
        console.log(err);
        res.status(500).send({sucess:false, message: `Login ${err.message}`})
    
    }
}

const authCtrl = async(req,res) => {
    try{
        const user = await userModel.findOne({_id:req.body.userId})
        if(!user)
        {
            return res.status(200).send({
                message: 'user not found',
                sucess: false
            })
        }else{
            res.status(200).send({
                data:{
                    name: user.name,
                    email: user.email,
                },
            })
        }
    }catch(err) {
        console.log(err);
        res.status(500).send({
            message: 'auth error',
            sucess: false,
            err
        })
    }

}

module.exports = {loginController, registerController, authCtrl };