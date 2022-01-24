import { DataTypes } from 'sequelize';
import { sequelize } from '../sequelize.js';
import crypto from 'crypto';

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
            type: DataTypes.STRING(64),
            allowNull: false,
            get() {
                return () => this.getDataValue('password')
            }
        },
        salt: {
            type: DataTypes.STRING(64),
            get() {
                return() => this.getDataValue('salt')
            }
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

Post.generateSalt = () => {
    return crypto.randomBytes(16).toString('base64');
}

Post.encryptPassword = (plainText, salt) => {
    return crypto
        .createHash('RSA-SHA256')
        .update(plainText)
        .update(salt)
        .digest('hex');
}

const setSaltAndPassword = (post) => {
    if (post.changed('password')) {
        post.salt = Post.generateSalt();
        post.password = Post.encryptPassword(post.password(), post.salt());
    }
}

Post.beforeCreate(setSaltAndPassword);
Post.beforeUpdate(setSaltAndPassword);

Post.sync();

export default Post;