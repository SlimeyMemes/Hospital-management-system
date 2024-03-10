const doctorModel = require('../models/doctorModel');
const userModel = require('../models/userModels');

const doctorController = async(req,res) => {
try{
    const exists = await userModel.findOne({email:req.body.email}) && doctorModel.findOne({email:req.body.email})
    if(exists)
    {
        return res
            .status(200)
            .send({message:`User Already Exists`, success:false})
    }
    const password = req.body.password
    const salt = await bcrpyt.gensalt()
    const hashedPassword = await bcrypt.hash(password,salt)
    req.body.password = hashedPassword
    const newUser = new docotorModel(req.body)
    await newUser.save()
    res.status(201).send({message: 'doctor added successfully',success:true});
}

catch(err){

}
}

module.exports = doctorController;