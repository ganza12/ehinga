import { Farmer } from './../entity/Farmer';
import { Member } from './../entity/Member';
import {getManager, getRepository,getConnection} from "typeorm";
 

export const selectAll = async () =>{
    const entityManager = getManager();
    const result= await entityManager.find(Member);    
    return result;
}

export const selectById = async(memberId) =>{
    const entityManager = getManager();
    const result  = await entityManager.findOne(Member,memberId)    
    return result;
}


export const selectByPhone = async(telephone) =>{
    const member= getRepository(Member)
    .createQueryBuilder('member')
    .where('member.telephone = :telephone',{telephone:telephone})
    .getOne()    
    return member;
}

export const insert = async(data) =>{
    const entityManager = getManager();
    const result = entityManager.save(Member, data)
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
            .update(Member)
            .set({ telephone: data.telephone})
            .where("member_id = :member_id", { member_id: data.member_id})
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
    .from(Member)
    .where("member_id = :member_id", { member_id: member_id})
    .execute();
    if(!result){
        return false
    }else{
        return true
    }
}

