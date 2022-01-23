import { DataTypes } from 'sequelize';
import { sequelize } from '../sequelize.js';

// 댓글
const Comment = sequelize.define(
    'Comment', 
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        content: {
            type: DataTypes.STRING(255),
            defaultValue: ''
        },
        writer: {
            type: DataTypes.STRING(20),
            defaultValue: ''
        },
        create_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        // Table Post id
        post_ref_id: {
            type: DataTypes.INTEGER.UNSIGNED
        },
        // Table Comment id
        comment_ref_id: {
            type: DataTypes.INTEGER.UNSIGNED
        }
    },
    {
        indexes: [
            {
                unique: false,
                fields: ['post_ref_id']
            },
            {
                unique: false,
                fields: ['comment_ref_id']
            },
        ]
    }
);

Comment.sync(
    {
        force: true
    }
);

export default Comment;