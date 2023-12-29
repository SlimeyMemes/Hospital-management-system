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
const loginController = () => {}

module.exports = {loginController, registerController };