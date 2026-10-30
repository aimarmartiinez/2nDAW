import { Model } from "objection";
import User from "./user.model";
import Post from "./post.model";

export default class Like extends Model {
    static get tableName(): string {
        return 'likes'
    }
    
    static get idColumn(): string {
        return 'likeId'
    }

    // Propiedades/columnas del modelo Like
    likeId!: number
    userId!: number
    postId!: number
    createdAt!: string
    
    // Relaciones
    user!: User
    post!: Post

    static get relationMappings() {
        return {
            // Cada like pertenece a un usuario
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'likes.userId',
                    to: 'users.userId',
                }
            },
            // Cada like pertenece a un post
            post: {
                relation: Model.BelongsToOneRelation,
                modelClass: Post,
                join: {
                    from: 'likes.postId',
                    to: 'posts.postId',
                }
            }
        };
    }

    // Esquema de validación para inserts/updates
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['userId', 'postId'],
            properties: {
                likeId: { type: 'integer' },
                userId: { type: 'integer' },
                postId: { type: 'integer' },
                createdAt: { type: 'string', format: 'date-time' }
            },
        };
    }
}