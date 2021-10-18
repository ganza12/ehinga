import { Member } from './Member';
import { Entity,PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm';

@Entity('agronome')
export class Agronome{

    @PrimaryColumn({nullable:false, type:'uuid'})
    agronome_id : string;

    @Column()
    isTrained : boolean;
   
    @Column({nullable: false, default : 'A0'})
    education_level : string;

    @Column({nullable: false})
    experience : number

    @Column({nullable:false})
    isActive : boolean

   @OneToOne(
       ()=>Member,
       (member) => member.member_id,
       {
        onDelete: 'RESTRICT',
        onUpdate: "RESTRICT"
       })
   @JoinColumn({name : "member_id"})
   member_id : Member

}

