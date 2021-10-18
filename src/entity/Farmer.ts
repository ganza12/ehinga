import { Member } from './Member';
import { Entity,PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm';

@Entity('farmer')
export class Farmer{

    @PrimaryColumn({type:'uuid',nullable: false})
    farmer_id : string;

    @Column()
    isTrained : boolean;
   
    @OneToOne(
    ()=>Member,
    (member) => member.member_id,
    {
    onDelete: 'RESTRICT',
    onUpdate: "RESTRICT"
    })
    
   @JoinColumn({name:"member_id"})
   member_id : Member

}