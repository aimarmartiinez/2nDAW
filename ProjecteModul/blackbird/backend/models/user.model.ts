import { Model } from "objection";
import Post from "./post.model";
import Like from "./like.model";

export default class User extends Model {
    static get tableName () : string{
        return 'users'
    }
    static get idColumn() : string{
        return 'userId'
    }

    userId!: number
    fullName!:string
    userName!:string
    hashPass!:string
    avatar!:string
    likes!: Like[]




    static get relationMappings() {
        return {
            posts: {
                relation: Model.HasManyRelation,
                modelClass: Post,
                join: {
                    from: 'users.userId',
                    to: 'posts.userId',
                }
            },
            likes: { 
                relation: Model.HasManyRelation, 
                modelClass: Like, 
                join: { 
                    from: 'users.userId', 
                    to: 'likes.userId', 
                } 
            }
        };
    }
}