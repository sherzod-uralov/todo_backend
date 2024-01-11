import {DataTypes, Model} from "sequelize";
import {newSequelize} from "../config/newSequelize.js";

class Users extends Model {}

Users.init({
    user_id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        unique:true
    },
    username:{
        type:DataTypes.STRING(50)
    },
    email:{
        type:DataTypes.STRING(50)
    },
    password:{
        type:DataTypes.TEXT,
        min:8,
        max:20
    }
},
    {
        sequelize:newSequelize,
        tableName:'users',
        paranoid:true
    }
)

export default Users;