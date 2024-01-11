import express from "express";
import 'dotenv/config'
import {newSequelize} from "./config/newSequelize.js";
import {router} from "./router/index.routers.js";
import Todo from "./models/todos.js";
import cors from 'cors';
const bootStrap = async () => {
    try {
        const app = express();
        app.use(cors())
        app.use(express.json());
        app.use('/api',router)

        await newSequelize.authenticate();
        await newSequelize.sync({alter:true});
        console.log('running database')

        const {HOST, PORT} = process.env;
        app.listen(PORT,() => {
            console.log(`server running on port ${PORT}`)
        })
    }
    catch (error) {
        console.log(error.message)
    }
}

bootStrap()