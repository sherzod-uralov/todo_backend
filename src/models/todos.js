import {DataTypes, Model} from "sequelize";
import {newSequelize} from "../config/newSequelize.js";
import Users from "./users.js";

class Todo extends Model {}

Todo.init({
        todo_id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
            unique:true
        },
        todo:{
            type:DataTypes.TEXT
        },
        completed:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        }
    },
    {
        sequelize:newSequelize,
        tableName:'todo',
        paranoid:true
    }
)

Users.hasMany(Todo,{foreignKey:'user_id'})

export default Todo;