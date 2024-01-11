import {Router} from "express";
import {register} from "../controller/register.controller.js";
import {login} from "../controller/login.controller.js";
import {checkAuth} from "../middleware/auth.middleware.js";
import {addTodo, deleteTodo, getUser, updateTodo} from "../controller/todo.controoller.js";

export const router = Router();

//register

router.post('/register',register);

//login

router.post('/login',login);

//add_todo
router.post('/todo',checkAuth,addTodo)

//getTodo
router.get('/todo',checkAuth,getUser)

//deleteTodo
router.delete('/todo/:id',checkAuth,deleteTodo);

//updateTodo

router.put('/todo/:id',checkAuth,updateTodo);