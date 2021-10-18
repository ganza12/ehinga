import { MemberType } from '../entity/MemberType';
import {getManager, getRepository,getConnection} from "typeorm";
 

export const selectAll = async () =>{
    const entityManager = getManager();
    const result= await entityManager.find(MemberType);    
    return result;
}

export const selectById = async(memberTypeId) =>{
    const entityManager = getManager();
    const result  = await entityManager.findOne(MemberType,memberTypeId)    
    return result;
}


export const selectMemberType = async(member_type) =>{
    const entityManager = getManager();
    const result  = await entityManager.findOne(MemberType,member_type)    
    return result;
}





export const insert = async(data) =>{
    const entityManager = getManager();
    const result = entityManager.save(MemberType, data)
    if(!result){
        return false
    }else{
        return true
    }    
}


export const update = async(data) =>{
    const result = 
        await getConnection()
            .createQueryBuilder()
            .update(MemberType)
            .set({ member_type: data.member_type})
            .where("member_type_id = :member_type_id", { member_type_id: data.member_type_id})
            .execute();

    if(!result){
        return false
    }else{
        return true
    }           

}

export const deleteById =async (member_id) =>{
    const result = await getConnection()
    .createQueryBuilder()
    .delete()
    .from(MemberType)
    .where("member_type_id = :member_type_id", { member_type_id: member_id})
    .execute();
    if(!result){
        return false
    }else{
        return true
    }
}


export const setStatus = async(data)=>{
    
    const result = 
    await getConnection()
        .createQueryBuilder()
        .update(MemberType)
        .set({ isActive: data.isActive})
        .where("member_type_id = :member_type_id", { member_type_id: data.member_type_id})
        .execute();

    if(!result){
        return false
    }else{
        return true
    }      

}
