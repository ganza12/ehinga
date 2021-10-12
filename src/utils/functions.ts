import { responseObject } from './type';
const bcryptjs = require('bcryptjs')

// sending response message either failure or success
export const codeResponse :(res:any,responseInfo:responseObject)=>responseObject= (res:any,responseInfo:responseObject):responseObject =>{
    return res.send({
                status : responseInfo.status,
                data : responseInfo.message
    }) 
}

export const errorConsole = (error:any):responseObject =>{
   return {
       status : error.errno,
       message : error.message
   }
}

export const successConsole = ():string =>{
    return 'connected to database'
 }


// encrypting password 

export const encryptPassword = (orginalPassword) =>{
    let salt = bcryptjs.genSaltSync(10);
    let hashedPassword = bcryptjs.hashSync(orginalPassword, salt);
    return hashedPassword;
  }

//   decrypt and compare passwords 
export const comparePassword = (orginalPassword,encryptedPasssword) =>{
    const result = bcryptjs.compareSync(orginalPassword, encryptedPasssword);
    return result;
  }