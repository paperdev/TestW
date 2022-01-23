import { DataTypes } from 'sequelize';
import { sequelize } from '../sequelize.js';

// 게시판 
const Post = sequelize.define(
    'Post', 
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING(20),
            defaultValue: ''
        },
        content: {
            type: DataTypes.STRING(255),
            defaultValue: ''
        },
        writer: {
            type: DataTypes.STRING(20),
            defaultValue: ''
        },
        password: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        create_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        update_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    },
    {
        indexes: [
            {
                unique: false,
                fields: ['title']
            },
            {
                unique: false,
                fields: ['writer']
            },
        ]
    }
);

Post.sync(
    {
        force: true
    }
);

export default Post;