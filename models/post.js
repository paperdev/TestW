import { DataTypes } from 'sequelize';
import sequelize from './sequelize';

const Post = sequelize.define(
    'Post', 
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        }
    }
);

export default Post;