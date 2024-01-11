import {unCode} from "../helper/jwt.helper.js";

const checkAuth = (req,res,next) => {

    const token = req.headers.authorization;
    if(!token){
        return res.status(400).json({
            status:400,
            msg:'token is not available'
        })
    }
    const openToken2 = unCode(token);
    req.token = openToken2;
    try {
        const openToken = unCode(token);
        next();
        req.token = token;
    } catch (error) {
        return res.status(401).json({
            status: 401,
            msg: 'Invalid token'
        });
    }
}

export {checkAuth}