import React from "react"
import TextField from '@mui/material/TextField';
import { Link,useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/userSlice";
const Login = ()=>{

    let [formData , setFormData] = useState({
        userName:"",
        password:"",
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleChange = (e)=>{
        let fieldName = e.target.name;
        let fieldValue = e.target.value;

        setFormData((prevObj)=>{
            return {...prevObj , [fieldName]:fieldValue};
        })
    }


    const onSubmitHandler =async (e)=>{
        e.preventDefault();
        try {
            const res = await axios.post("https://mern-chat-tmpe.onrender.com/api/v1/user/login",formData,{
                headers:{
                    "Content-Type":"application/json"
                },
                withCredentials:true
            });
            if(res.data.success){
                navigate("/");
                toast.success(res.data.message);
            }
            dispatch(setAuthUser(res.data));
        } catch (error) {
            console.log(error);
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Login failed");
            }
        }


    };

    return(
        <div>
            <div className="reg-inner-div">
                <h1 className="reg-h1">Log in</h1>
                <form action="" onSubmit={onSubmitHandler}>
                    <TextField id="outlined-basic" label="Username" variant="outlined" size="small" name="userName" className="input" margin="dense" value={formData.userName} onChange={handleChange}/>
                    <TextField id="outlined-basic" label="Password" variant="outlined" size="small" name="password" className="input" margin="dense" type="password" value={formData.password} onChange={handleChange}/>
                    <Link to="/register">
                        Don't have an account?Sign up
                    </Link>
                    <Button type="submit" variant="contained" className="reg-btn">Login</Button>
                </form>
            </div>
        </div>
    )
}

export default Login