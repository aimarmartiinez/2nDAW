import { Model } from "objection";
import PostComment from "./postcomment.model";
import User from "./user.model";
import Like from "./like.model";

export default class Post extends Model {
    static get tableName () : string{
        return 'posts'
    }
    static get idColumn() : string{
        return 'postId'
    }

    /*define las propiedades o columnas del modelo Post (campos)*/
    postId!: number
    userId!:number
    title!:string
    createdAt!:string
    body!: string
    comments!: PostComment[]
    user!: User
    likes!: Like[]
    likeCount!: number

    static get relationMappings() {
        return {
            /*cada post pertenece a un solo usuario*/
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'posts.userId',
                    to: 'users.userId',
                }
            },
            /*un post puede tener muchos comentarios*/
            comments: {
                relation: Model.HasManyRelation,
                modelClass: PostComment,
                join: {
                    from: 'posts.postId',
                    to: 'comments.postId',
                },
            },
            likes: { 
                relation: Model.HasManyRelation, 
                modelClass: Like, 
                join: { 
                    from: 'posts.postId', 
                    to: 'likes.postId', 
                }, 
            },
        };
    }
    /*asegura que los datos que se insertan o actualizan cumplan con ciertas reglas*/
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['userId', 'title', 'createdAt', 'body'],
            properties: {
            postId: { type: 'integer' },
            userId: { type: 'integer' },
            title: { type: 'string', minLength: 1, maxLength: 255 },
            createdAt: { type: 'string', format: 'date-time' },
            body: { type: 'string' },
            },
        };
    }
}