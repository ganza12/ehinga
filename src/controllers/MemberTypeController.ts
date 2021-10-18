import { selectAll, selectById, insert, deleteById, update,setStatus,selectMemberType  } from './../repositories/MemberTypeRepository';
const {v4 : uuidv4} = require('uuid')
import {validationResult}  from 'express-validator';


class MemberTypeController {


    getAll = async (req,res) =>{

        const result= await selectAll()
                
        console.log(result);
        
        return res.status(200).json({
            message : 'List of all available member types',
            data: result
        })
        
    };


    getOne = async(req,res) =>{

        const member_id = req.params.memberId;
       
        const results = await selectById(member_id)
        if(!results){

            return res.status(304).json({
                    message : 'member not found on the system',
                    data : []

            });
            
        }else{

            return res.status(200).json({

                message : 'Member details',
                data : results
            });

        }
        
    };   

}

export default MemberTypeController;



