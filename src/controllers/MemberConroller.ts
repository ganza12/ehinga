import { encryptPassword, codeResponse, comparePassword } from './../utils/functions';
import { memberObject } from './../utils/type';
import { selectAll, selectById, insert, selectByPhone, deleteById, update, setStatus } from './../repositories/MemberRepository';
const {v4 : uuidv4} = require('uuid')
import {validationResult}  from 'express-validator';


class MemberController {

    memberLogin = async(req,res)=>{

        const errors = validationResult(req);
        // Check if there is errors and return them
        if (!errors.isEmpty()) {
            return res.send({
                status:400,
                errors: errors.array()
            })
        }

        // getting user credentials from posted data
        const telephone = req.body.telephone;
        const password =  req.body.password;

        // console.log(telephone,password);
        
      try {
          
        const memberData =  await selectByPhone(telephone);
             
        const checkMemberPassword = await comparePassword(password,memberData.password );       
        
        if(!checkMemberPassword){
            return res.status(403).json({
                msg : 'username or password do not match'
            })
        }else{
            return res.status(200).json({
                message : 'you are logged in',
                data : memberData
            })
        }

      } catch (error) {
          console.log(error);
          
      }
       
        
    }


    getAll = async (req,res) =>{

        const result= await selectAll()
                
        console.log(result);
        
        return res.status(200).json({
            message : 'List of all registered members',
            data: result
        })
        
    };


    getOne = async(req,res) =>{

        const member_id = req.params.memberId;

        const results = await selectById(member_id);

        const sendResult  = results != undefined ? results : [] ;
        const message = results === undefined ? 'member not found on system' : 'Member details';
        const status = results != undefined ? 200 : 404;

        return res.status(status).json({
            status : status,
            message : message,
            data : sendResult
        })
    };

    create =  async(req:any,res:any) =>{

        const errors = validationResult(req);
        // Check if there is errors and return them
        if (!errors.isEmpty()) {

            return res.send({
                status:400,
                errors: errors.array()
            })
        }

        let  data = req.body;
        let memberId = uuidv4();
        let hashedPasswords = encryptPassword(req.body.password);
        
        // assigning new data to the object
         const memberData =  Object.assign(data, data.member_id = memberId, data.password = hashedPasswords);

        // checking if member is not arlready registered on database

        const memberInfo = await selectByPhone(req.body.telephone);

        if(memberInfo != null){

            res.status(403).json({message : 'can not register member twice, he/she is already registered'}); 

        }else{

            const result = insert(memberData);

            if(!result){

                res.status(500).json({  message : 'failed to register new member'});  

            }else{

                res.status(201).json({ message : 'member registered successfully'});
                
            }     
            
        }
        
    }
    
    //delete member 
    deleteById = async(req,res)=>{
        const member_id = req.params.memberId;
        // display user 
        const memberData = await selectById(member_id);

        if(memberData != null){

            const result = await deleteById(member_id);
            res.status(200).json({message: `successfully deleted member with id`});

        }else{

            // res.send({status : 404, message: `user with id ${member_id} not found `});
            res.status(404).json({message: `user with id ${member_id} not found `})
        } 
    }

    // update member information

    updateMemberInfo = async(req,res) =>{
        
        const errors = validationResult(req);
        // Check if there is errors and return them
        if (!errors.isEmpty()) {
            return res.send({
                status:400,
                errors: errors.array()
            })
        }

        const member_id = req.params.memberId;
        // display user 
        const memberData = await selectById(member_id)
        const data = req.body;

        // adding member id from parameter to the object to be passed to the update funftion from repository
        const memberUpdatedInfo = Object.assign(data, data.member_id = member_id)
        console.log(memberUpdatedInfo);       
        

        if(memberData != null && memberData.telephone != data.telephone){

            const result = await update(memberUpdatedInfo);
            res.status(200).json({status : 200, message: `successfully updated  ${memberData.firstName} telephone  number`});
        }else{

            res.status(404).json({status : 404, message: `user with id ${member_id} not found in system or check your telephone number if it is not the oldone`}); 

        }


    }

    // activate or disactivate member status 

    updateStatus = async(req,res) =>{

        const errors = validationResult(req);
        // Check if there is errors and return them
        if (!errors.isEmpty()) {
            return res.send({
                status:400,
                errors: errors.array()
            })
        }

        const member_Id =  req.params.memberId;
        const data =  req.body;
        
        const memberData =  Object.assign(data, data.member_id = member_Id);
        
        try {

            const UpdateStatus = await setStatus(memberData);

            if(!UpdateStatus){
                res.status(403).json({
                    message :'failed to update member status'
                })
            }else{
                res.status(200).json({
                    message : 'successfully updated member status'
                })
            }

        } catch (error) {
            const data = {

                errorMessage : error.driverError.sqlMessage,
                errorno : error.driverError.errno,
                code : error.driverError.code

            }
            res.status(403).json({
                message : 'error occured in updating member status',
                data : data
            })
            
        }   
    }


}

export default MemberController;



