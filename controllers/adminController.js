const doctorModel = require('../models/doctorModel');
const userModel = require('../models/userModels');
const bcrpyt = require('bcryptjs')

const doctorController = async(req,res) => {
try{
    const exists = await userModel.findOne({email:req.body.email})
    if(exists)
    {
        return res
            .status(200)
            .send({message:`User Already Exists`, success:false})
    }
    const password = req.body.password
    const salt = await bcrpyt.genSalt()
    const hashedPassword = await bcrpyt.hash(password,salt)
    req.body.password = hashedPassword
    const newDoctor = new doctorModel(req.body)
    await newDoctor.save()
    const newUser = new userModel(req.body)
    newUser.isDoctor = true;
    await newUser.save()
    res.status(201).send({message: 'Doctor added successfully',success:true});
}

catch(err){
    console.log(err)
    return res.status(500).send({success:false,message: `Doctor ${err.message}`});
}
}

const doctorData = async(req,res) => { 
    try{
    const doctor = await doctorModel.find({})
    if(!doctor)
    {
        return res.status(200).send({
            message: 'doctor not found',
            success:false
        })
    }else{
        doctor.password = undefined
        res.status(200).send({success: true, data : doctor})
    }
}catch(err)
{
    console.log(err)
    res.status(500).send({
        message:'something wrong happend',
        success: false,
        err
    })
}
}
module.exports = {doctorData , doctorController};