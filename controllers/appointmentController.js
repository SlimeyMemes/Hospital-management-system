const doctorAppointmentModel = require('../models/doctorAppointmentModel')
const userAppointmentModel = require('../models/userAppointmentModel')
const addAppointment = async(req,res) => {
    try {
        await doctorAppointmentModel.findOneAndUpdate({name:req.body.name},{$push :{ upcomingAppointments :req.body}})
    }
    catch(err)
    {
        console.log(err);
    }
}

const getAppointment = async(req,res) => {
    try{
        console.log(req.body)
        const app = await doctorAppointmentModel.findOne({name:req.body.name})
        if(app)
        {
            if(app.upcomingAppointments != null){
                return res.status(200).send({success: true, message: 'appointment found',data: app.upcomingAppointments})
            }

        }
        else {
            return res.status(500).send({success: false, message: 'appointment not found'})
        }
    }
    catch(err)
    {
        console.log(err);
    }
}

const removeAppointment = async(req,res) => {
    try {
        console.log(req.body)
        const docapp =  await doctorAppointmentModel.findOne({doctorName:req.body.doctorName})
        const index = docapp.upcomingAppointments.findIndex((element) => {
            return element.date == req.body.date && element.timeSlot == req.body.timeSlot
        })
        docapp.upcomingAppointments.splice(index,1)
        await doctorAppointmentModel.findOneAndUpdate({doctorName:req.body.doctorName},{upcomingAppointments:docapp.upcomingAppointments})
        return res.status(200).send({success:true,message: "deleted"})
    }
    catch(err)
    {
        console.log(err)
    }
}
const completeAppointment = async(req,res) =>
{
    try{
        await doctorAppointmentModel.findOneAndUpdate({name:req.body.doctorName}, {$push: {completedAppointments:req.body}})
        const docapp =  await doctorAppointmentModel.findOne({name:req.body.doctorName})
        const index = docapp.upcomingAppointments.findIndex((element) => {
            return element.date == req.body.date && element.timeSlot == req.body.timeSlot
        })
        docapp.upcomingAppointments.splice(index,1)
        await doctorAppointmentModel.findOneAndUpdate({name:req.body.doctorName},{upcomingAppointments:docapp.upcomingAppointments});

        const userapp = await userAppointmentModel.findOne({name:req.body.userName})
        console.log(userapp)
        const userindex = userapp.upcommingAppointments.findIndex((element) => {
            return element.date == req.body.date && element.timeSlot == req.body.timeSlot })
            console.log(userindex)
        const removed = userapp.upcommingAppointments.splice(userindex,1)
        removed[0].remarks = req.body.remarks
        await userAppointmentModel.findOneAndUpdate({name:req.body.userName},{upcommingAppointments:userapp.upcommingAppointments})
        await userAppointmentModel.findOneAndUpdate({name:req.body.userName} ,{$push:{completedAppointments:removed[0]}})
        return res.status(200).send({success:true,message:"completed appointment"})
    }
    catch(err)
    {
        console.log(err)
    }
}

const getCompletedAppointments = async(req,res) => 
{
    try {
        const app = await doctorAppointmentModel.findOne({name:req.body.name})
        if(app)
        {
            return res.status(200).send({success:true,message:'success fetch completed',data:app.completedAppointments})
        }
        else{
            return res.status(404).send({success:false,message:'user not found'})
        }
    }
    catch(err)
    {
        console.log(err)
    }
}

module.exports = {addAppointment,getAppointment,removeAppointment,completeAppointment,getCompletedAppointments}