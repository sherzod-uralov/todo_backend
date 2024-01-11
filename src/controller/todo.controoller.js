import Users from "../models/users.js";
import Todo from "../models/todos.js";
import {unCode} from "../helper/jwt.helper.js";

const addTodo = async (req,res) => {
    try {
        const {todo,completed} = req.body;
        const userInfo = req.token;
        const findUser = await Users.findOne({where:{email:userInfo.email}})

        const addTodo = await Todo.create({todo,completed,user_id:findUser.user_id});

        res.status(200).json({
            status:200,
            msg:`added todo`,
            todo:addTodo
        })
    }catch (e) {
        console.log(e)
        res.status(500).send('internal server error')
    }
}

const deleteTodo = async (req,res) => {
    try {
        const {id} = req.params;

        const findTodo = await Todo.findByPk(id);

        if(!findTodo){
            return res.status(400).json({
                status:400,
                msg:`todo not found`,
                todo:findTodo
            })
        }
        const token = unCode(req.token)
        const findUser = await Users.findOne({where:{email:token.email}});
        console.log(findUser)
        if(findTodo.user_id !== findUser.user_id){
            return res.status(400).json({
                status:400,
                msg:`this todo does not belong to you`,
                todo:findTodo
            })
        }

        const deleteTodo = await Todo.destroy({where:{todo_id:id}});

        res.status(200).json({
            status:200,
            msg:`todo deleted id:${id}`,
            todo:deleteTodo
        })
    }catch (error){
        console.log(error)
    }
}

const updateTodo = async (req,res) => {
    try {
        const id = req.params.id;
        const {todo,completed} = req.body;

        const findTodo = await Todo.findByPk(id);
        const token = unCode(req.token)
        const findUser = await Users.findOne({where:{email:token.email}});
        if(!findTodo){
            return res.status(400).json({
                status:400,
                msg:`todo not found`,
                todo:findTodo
            })
        }

        if(findTodo.user_id !== findUser.user_id){
            return res.status(400).json({
                status:400,
                msg:`this todo does not belong to you`,
                todo:findTodo
            })
        }

        const deleteTodo = await Todo.update({todo,completed},{where:{todo_id:id}});

        res.status(200).json({
            status:200,
            msg:`todo updated id:${id}`,
            todo:deleteTodo
        })
    }catch (error){

    }
}

const getUser = async (req,res) => {
    try {
        const userinfo = req.token;
        const findUser = await Users.findOne({where:{email:userinfo.email}});

        const users = await Users.findAll({
            where:{user_id:findUser.user_id},
            include:Todo
        });

        res.status(200).json({
            users
        })
    }catch (e) {
        console.log(e)
        res.status(500).send('internal server error')
    }
}

export {addTodo,getUser,deleteTodo,updateTodo}