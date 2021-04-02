const {Users} = require('../config/database');
const bcrypt = require('bcrypt');

exports.create = async (req,res,next)=>{
    try {
        if(!req.body){
            throw new Error("bad request...!");
        }
        let option = {};
        let password = await bcrypt.hash(req.body.password,12);
        let date = new Date();
        console.log(date.getTime());
        let result =undefined;
        if(req.body.email){
            option.email=req.body.email;
        }
        else if(req.body.id){
            option.id = (req.body.id).toString();
        }
        let userCheck = await Users.findOne({
                where:option
        });
        if(userCheck && req.body.loginType){
            return res.status(200).json({
                message:"user ready...!",
                code:200,
                method:"POST",
                data: userCheck
            });
        }
        else if(userCheck){
            throw new Error("user ready...!")
        }
        let user = await Users.build({
            id:((req.body.id)?req.body.id:date.getTime()).toString(),
            name: req.body.name,
            phone:(req.body.phone)?req.body.phone:null,
            email:(req.body.email)?req.body.email:null,
            password:password
        });
        result = await user.save();
        if(!result){
            throw new Error("create user fail...!")
        }
        res.status(201).json({
            message:"success...!",
            code:201,
            method:"POST",
            data: result
        });
    } catch (e) {
        res.status(500).json({
            message:(e.message)?e.message:"Error connect database",
            code:500,
            method:"POST"
        })
    }
}
exports.login =  async (req,res,next)=>{
    try {
       let where ={};
       if(req.body.email){
           where.email = req.body.email;
       }
       else if(req.body.phone){
           where.phone = req.body.phone
       }
       else{ throw new Error("")}
       let userCheck =await Users.findOne({
           where:where
       });
       if(!userCheck){
            return res.status(404).json({
                message:"Not found user...!",
                code:404,
                method:"POST"
            })
       }
       let isPassword = await bcrypt.compare(req.body.password,userCheck.password);
       if(!isPassword){throw new Error("sai password...!"); }
       res.status(200).json({
            message:"login success...!",
            code:200,
            method:"POST",
            data:userCheck
        });
    } catch (e) {
        res.status(500).json({
            message:(e.message)?e.message:"Error connect database",
            code:500,
            method:"POST"
        })
    }
}
exports.getUser = async(req,res,next)=>{
    try {
        let _id = req.params.id;
        let user = await Users.findOne({
            where:{
                id:_id
            }
        });
        if(!user){
            return res.status(404).json({
                message:"Not found user...!",
                code:404,
                method:"GET"
            })
        }
        res.status(200).json({
            message:"success...!",
            code:200,
            method:"GET",
            data:user
        });
    } catch (e) {
        res.status(500).json({
            message:(e.message)?e.message:"Error connect database",
            code:500,
            method:"GET"
        })
    }
}
exports.getAllUser = async (req,res,next)=>{
    try {
        let users = await Users.findAll({
            attributes:['name','phone','email']
        });
        if(!users){
            return res.status(404).json({
                message:"Not found user...!",
                code:404,
                method:"GET"
            })
        }
        res.status(200).json({
            message:"success...!",
            code:200,
            method:"GET",
            data:users
        });
    } catch (e) {
        res.status(500).json({
            message:(e.message)?e.message:"Error connect database",
            code:500,
            method:"GET"
        })
    }
}
exports.updateUser= async(req,res,next)=>{
    try {
        let _id = req.params.id;
        let userUpdate = await Users.findOne({
            where:{
                id:_id
            }
        });
        if(!userUpdate){
            return res.status(404).json({
                message:"Not found user...!",
                code:404,
                method:"PUT"
            })
        }
        userUpdate.phone = (req.body.phone)?req.body.phone:userUpdate.phone;
        userUpdate.name = (req.body.name)?req.body.name:userUpdate.name;
        userUpdate.email = (req.body.email)?req.body.email:userUpdate.email;
        let result = await userUpdate.save();
        if(!result){
            throw new Error("update user fail...!");
        }
        res.status(200).json({
            message:"success...!",
            code:200,
            method:"PUT",
            data:result
        });
    } catch (e) {
        res.status(500).json({
            message:(e.message)?e.message:"Error connect database",
            code:500,
            method:"PUT"
        })
    }
}
exports.deleteUser = async(req,res,next)=>{
    try {
        let _id = req.params.id;
        let userDelete = await Users.findOne({
            where:{
                id:_id
            }
        });
        if(!userDelete){
            return res.status(404).json({
                message:"Not found user...!",
                code:404,
                method:"DELETE"
            })
        }
        let result = await Users.destroy({
            force:true,
            where:{
                id:userDelete.id
            }
        });
        if(!result){
            throw new Error("Delete user fail...!");
        }
        res.status(200).json({
            message:"success...!",
            code:200,
            method:"DELETE"
        });
    } catch (e) {
        res.status(500).json({
            message:(e.message)?e.message:"Error connect database",
            code:500,
            method:"DELETE"
        })
    }
}