import jwt from "jsonwebtoken";

const isAuthenticated = async (req,res,next)=>{
    try{
        const token = req.cookies.token;
        if(!token){
            res.status(401).json({message:"user not authenticated"})
        };
        const decode = await jwt.verify(token,process.env.JWT_SECRET_KEY);
        if(!decode){
            res.status(401).json({message:"Invalid token"})
        };
        req.id = decode.userId;
        next();
    }catch(err){
        console.log(err);
        // next(err);
    };
};

export default isAuthenticated;