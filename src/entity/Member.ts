import { Agronome } from './Agronome';
import { Client } from './Client';
import { Farmer } from './Farmer';
import {MemberType} from'./MemberType';
import {  OneToOne,BaseEntity, Entity,PrimaryColumn, Column,ManyToMany,JoinTable, } from "typeorm";

@Entity('member')
export class Member extends BaseEntity {

    @PrimaryColumn({type: 'uuid',nullable:false})
    // @PrimaryGeneratedColumn()
    member_id : number;

    @Column()
    firstName: string;

    @Column()
    lastName :string;

    @Column({nullable:false, unique : true})
    telephone: string;

    @Column({nullable :false})
    password : string;

    @Column({nullable:false, default :true})
    isActive : boolean;

    @OneToOne(
        ()=>Farmer,
        (farmer) => farmer.farmer_id,{
            onDelete: 'CASCADE',
            onUpdate: "CASCADE",
           
        })    
        farmer_id : Member

    @OneToOne(
        ()=>Client,
        (client) => client.client_id,{
            onDelete: 'CASCADE',
            onUpdate: "CASCADE"
        })    
        client_id : Member


    @OneToOne(
        ()=>Agronome,
        (agronome) => agronome.agronome_id,{
            onDelete: 'CASCADE',
            onUpdate: "CASCADE"
        })    
        agronome_id : Member
    
    @ManyToMany(() => MemberType)
    @JoinTable()
    memnber_type: MemberType[];
        
}