import jwt from "jsonwebtoken";

export const COOKIE_NAME = "auth_token";

export function createToken(id, email, expiresIn){
    let payload = {
        id, email
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET,{
        expiresIn
    });

    return token;
}

export async function verifyToken(req, res, next){
    let authToken = req.signedCookies[`${COOKIE_NAME}`];
    if(authToken){
        await jwt.verify(authToken, process.env.JWT_SECRET,(err, success)=>{
            if(err){
                next(err.message);
            }else{
                res.locals.jwtData = success;
                next();
            }
        })
    }
}