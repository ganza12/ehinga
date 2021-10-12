import { Farmer } from './Farmer';
import {  OneToOne,BaseEntity, Entity,PrimaryColumn, Column  } from "typeorm";

@Entity('member')
export class Member extends BaseEntity {

    @PrimaryColumn({type: 'uuid'})
    member_id : string;

    @Column()
    firstName: string;

    @Column()
    lastName :string;

    @Column({nullable:false, unique : true})
    telephone: string;

    @Column({nullable :false})
    password : string;

    @Column({nullable:false})
    isActive : boolean;

    @OneToOne(
        ()=>Farmer,
        (farmer) => farmer.member,{
            onDelete: 'CASCADE',
            onUpdate: "CASCADE"
        })
    
    member : Member
        
}