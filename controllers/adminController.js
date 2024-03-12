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

const updateDoctor = async(req,res) => {
    const password = req.body.password
    const salt = await bcrpyt.genSalt()
    const hashedPassword = await bcrpyt.hash(password,salt)
    try{
        pass = await userModel.findOneAndUpdate({email:req.body.email},req.body)
        if(!pass)
        {
            return res.status(200).send({
                message: 'doctor not found',
                success:false
            })
        }
        else{
        return res.status(200).send({success: true, message: "Data updated"})
        }
    }
    catch(err)
    {
        return res.status(500).send({success: false, message:"Something went wrong"})
    }
}

const updateDoctorProfile = async(req,res) =>
{
    try{
        doc = await doctorModel.findOneAndUpdate({name:req.body.name},req.body)
        if(!doc)
        {
            return res.status(200).send({
                message: 'doctor not found',
                success:false
            })
        }else{
            return res.status(200).send({success: true, message: "Data updated"})
        }
    }
    catch(err)
    {
        return res.status(500).send({success: false, message:"Something went wrong"})
    }
}

const removeDoctor = async(req,res) =>
{
    try{
        docUser = await userModel.findOneAndDelete({name:req.body.name})
        doc = await doctorModel.findOneAndDelete({name:req.body.name})

        if(!(docUser && doc))
        {
            return res.status(200).send({
                message: 'doctor not found',
                success:false
            })
        }else{
            return res.status(200).send({success: true, message: "Data updated"})
        }
    }
    catch(err){
        console.log(err);
        return res.status(500).send({success: false, message:"Something went wrong"})
    }
}
module.exports = {doctorData , doctorController, updateDoctor, updateDoctorProfile, removeDoctor};