import { Field, Int, ObjectType } from "type-graphql"
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"

@ObjectType()
@Entity()
export class User extends BaseEntity {

    @Field(()=> String)//for graphql
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Field(()=> String)
    @Column()
    email: string

    @Field(()=> String)
    @Column()
    username: string

    @Column()
    password: string

    @Field(()=> Int)
    @Column("int", {default: 0})
    token_version: number;

}