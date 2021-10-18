import {  BaseEntity, Entity,PrimaryColumn, Column} from "typeorm";

@Entity('member_type')
export class MemberType extends BaseEntity {

    @PrimaryColumn({type: 'uuid',nullable:false})
    member_type_id : string;

    @Column({nullable :false})
    member_type : string;   
    
        
    @Column({nullable :false, default : true})
    isActive : boolean;
       
}
