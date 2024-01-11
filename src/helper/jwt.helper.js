import jwt from 'jsonwebtoken'
const deCode =   (data) => {
    const token =  jwt.sign(data,process.env.SEC_KEY.toString());
    return token
}

const unCode = (token) => {
    return jwt.verify(token,process.env.SEC_KEY.toString());
}

export {
    deCode,
    unCode
}