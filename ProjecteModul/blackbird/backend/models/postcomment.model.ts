import { Model } from "objection";
import Post from "./post.model";
import User from "./user.model";

export default class PostComment extends Model {
    static get tableName(): string {
        return 'comments'
    }
    static get idColumn(): string {
        return 'commentId'
    }

    commentId!: number
    postId!: number
    userId!: number
    createdAt!: string
    body!: string
    post!: Post
    user!: User

    static get relationMappings() {
        return {
            post: {
                relation: Model.BelongsToOneRelation,
                modelClass: Post,
                join: {
                    from: 'comments.postId',  
                    to: 'posts.postId',       
                }
            },
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'comments.userId',  
                    to: 'users.userId',       
                }
            },
        };
    }

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