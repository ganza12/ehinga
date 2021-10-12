import { Member } from './Member';
import { Entity,PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm';

@Entity('farmer')
export class Farmer{

    @PrimaryColumn({type:'uuid'})
    farmer_id : string;

    @Column()
    isTrained : boolean;
   
    @Column()
    is : boolean;

   @OneToOne(
       ()=>Member,
       (member) => member.member,
       {
        onDelete: 'CASCADE',
        onUpdate: "CASCADE"
       })
   @JoinColumn({name : "member_id"})
   member : Member

}