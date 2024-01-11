import Users from "../models/users.js";
import bcrypt from 'bcrypt'
import {deCode} from "../helper/jwt.helper.js";
const register = async (req,res) => {
    try {
        const {username,email,password} = req.body;

        const checkUser = await Users.findOne({where:{email}});

        if(checkUser){
            return res.status(409).json({
                status:409,
                msg:'user already exist',
                error:'conflict'
            })
        }

        const hash = await bcrypt.hash(password,5);
        const token = deCode({username,email});

        const newUser = await Users.create({
            username,
            email,
            password: hash
        })

        res.status(201).json({
            status:201,
            msg:'user created',
            token:token
        })

    }catch (e) {

        res.status(500).send('internal server error')

    }
}

export {register}