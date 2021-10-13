import { encryptPassword, codeResponse } from './../utils/functions';
// import { memberObject } from './../utils/type';
import { selectAll, selectById, insert,selectByPhone,deleteById } from './../repositories/MemberRepository';

const {v4 : uuidv4} = require('uuid')


class MemberController {

    getAll = async (req,res) =>{

        const result= await selectAll()
        // const success = {status : 200, message: result}
        // codeResponse( res,success);
        res.send({
            status : 200,
            data: result
        })
    };


    getOne = async(req,res) =>{

        const member_id = req.params.memberId;
       
        const results = await selectById(member_id)
        console.log(results);        
        return res.send({
            status : 200,
            data : results
        });
    };

    create =  async(req:any,res:any) =>{

        let  data = req.body;
        let hashedPasswords = encryptPassword(req.body.pasword);
        const member_id = uuidv4(); 
               
        const memberData =  Object.assign(data, data.member_id = member_id,data.password = hashedPasswords)       
           
        // checking if user already exists
        const memberInfo =  await selectByPhone(req.body.telephone);
        if(memberInfo == null){
            const result:boolean =  await insert(data);
        if(!result){
            const error = {status : 500, message: 'failed to save new member'}
            codeResponse( res,error);
            console.log(result);
            
        }
        const success = {status : 200, message: 'seccessfully registered new member'}
        codeResponse( res,success);

        };
        const error = {status : 409, message: 'user already exists'}
        codeResponse( res,error);               
    }
    
    //delete member 
    deleteById = async(req,res)=>{
        const member_id = req.params.memberId;
        const result = await deleteById(member_id);

        // display user 
        // const memberData = await selectById(member_id)
       
        const success = {status : 201, message: `successfully deleted member with id`}
        codeResponse( res,success);       
        
    }


}

export default MemberController;



