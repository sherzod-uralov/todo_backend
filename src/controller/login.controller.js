import Users from "../models/users.js";
import {deCode, unCode} from "../helper/jwt.helper.js";
import bcrypt from "bcrypt";

const login = async (req,res) => {
    try {
        const {password,email} = req.body;

        const findUser = await Users.findOne({where:{email}});

        if(!findUser){
            return res.status(400).json({
                status:400,
                msg:'wrong email'
            })
        }

        const matchPassword = await bcrypt.compare(password,findUser.password);

        if(!matchPassword){
            return res.status(400).json({
                status:400,
                msg:'wrong password'
            })
        }

        const token = deCode({email,username:findUser.username,user_id:findUser.user_id});

         res.status(200).json({
            status:200,
            msg:'login success',
             token:token
        })

    }catch (e) {
        res.status(500).send('internal server error')

    }
}

export {login}