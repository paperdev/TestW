import { DataTypes } from 'sequelize';
import { sequelize } from '../sequelize.js';

// 키워드
const KeyWord = sequelize.define(
    'KeyWord', 
    {
        writer: {
            type: DataTypes.STRING(20),
            primaryKey: true
        },
        keyword: {
            type: DataTypes.STRING(20),
            primaryKey: true
        }
    }
);

KeyWord.sync();

export default KeyWord;