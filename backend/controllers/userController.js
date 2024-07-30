import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const register = async (req,res,next)=>{
    try{
        const {fullName,userName,password,confirmPassword,gender} = req.body;
        if(!fullName || !userName || !password || !confirmPassword || !gender){
            return res.status(400).json({message:"All fields are required..."});
        };
        if(password !== confirmPassword){
            return res.status(400).json({message:"password not matched..."});
        };
        const user = await User.findOne({userName:userName});
        if(user){
            return res.status(400).json({message:"This username has already registered..."});
        };
        const hashedPassword = await bcrypt.hash(password,10);

        const boyProfile = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
        const girlProfile = `https://avatar.iran.liara.run/public/girl?username=${userName}`;
        let newUser = new User({
            userName,
            fullName,
            password:hashedPassword,
            profilePhoto:gender==="male"?boyProfile:girlProfile,
            gender
        });
        await newUser.save();
        return res.status(201).json({ success: true, message: 'User registered successfully' });
    }catch(err){
        console.log(err);
        // next(err);
    };
};


export const login = async(req,res,next)=>{
    try{
        const {userName,password} = req.body;
        if(!userName || !password){
            return res.status(400).json({message:"All fields are required..."});
        };
        const user = await User.findOne({userName});
        if(!user){
            return res.status(400).json({message:"Incorrect username or password"});
        };
        const isPasswordMathched = await bcrypt.compare(password,user.password);
        if(!isPasswordMathched){
            return res.status(400).json({message:"Incorrect username or password"});
        };

        const tokenData = {
            userId:user._id
        };
        const token = await jwt.sign(tokenData,process.env.JWT_SECRET_KEY,{expiresIn:'1d'});

        return res.status(201).cookie("token",token,{maxAge:1*24*60*60*1000,httpOnly:true,sameSite:'strict'}).json({success: true, message: 'User Logged in',
            _id:user._id,
            userName:user.userName,
            fullName:user.fullName,
            profilePhoto:user.profilePhoto
        });

    }catch(err){
        console.log(err);
        // next(err);
    };
};


export const logout = (req,res,next)=>{
    try{
        return res.status(200).cookie("token","",{maxAge:0}).json({
            message:"logged out successfully..."
        });
    }catch(err){
        console.log(err);
        // next(err);
    };
};


export const getOtherUsers = async (req,res,next)=>{
    try{
        const loggedInUserId = req.id;
        const otherUsers = await User.find({_id:{$ne:loggedInUserId}}).select("-password");
        return res.status(200).json(otherUsers);
    }catch(err){
        console.log(err);
    }
}

