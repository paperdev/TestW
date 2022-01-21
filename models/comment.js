import { DataTypes } from 'sequelize';
import sequelize from './sequelize';

const Comment = sequelize.define(
    'Comment', 
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        }
    }
);

export default Comment;