import { Member } from './Member';
import { Entity,PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm';

@Entity('client')
export class Client{

    @PrimaryColumn({type:'uuid',nullable: false})
    client_id : string;

    @Column()
    isTrained : boolean;
   
    @Column()
    is : boolean;

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

