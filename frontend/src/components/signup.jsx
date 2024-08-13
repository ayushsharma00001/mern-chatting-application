import React from "react"
import TextField from '@mui/material/TextField';
import { Link , useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
const Signup = ()=>{

    let [formData , setFormData] = useState({
        fullName:"",
        userName:"",
        password:"",
        confirmPassword:"",
        gender:""
    });

    const navigate = useNavigate();

    const handleChange = (e)=>{
        let fieldName = e.target.name;
        let fieldValue = e.target.value;

        setFormData((prevObj)=>{
            return {...prevObj , [fieldName]:fieldValue};
        })
    }

    const onSubmitHandler = async(e)=>{
        e.preventDefault();
        try {
            const res = await axios.post("https://mern-chat-tmpe.onrender.com/api/v1/user/register",formData,{
                headers:{
                    "Content-Type":"application/json"
                },
                withCredentials:true
            });
            if(res.data.success){
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Registration failed");
            }
        }
    }

    return(
        <div>
            <div className="reg-inner-div">
                <h1 className="reg-h1">Sign up</h1>
                <form action="" onSubmit={onSubmitHandler}>
                    <TextField id="outlined-basic" label="FullName" variant="outlined" size="small" name="fullName" className="input" margin="dense" value={formData.fullName} onChange={handleChange}/>
                    <TextField id="outlined-basic" label="Username" variant="outlined" size="small" name="userName" className="input" margin="dense" value={formData.userName} onChange={handleChange}/>
                    <TextField id="outlined-basic" label="Password" variant="outlined" size="small" name="password" className="input" margin="dense" type="password" value={formData.password} onChange={handleChange}/>
                    <TextField id="outlined-basic" label="Confirm Password" variant="outlined" size="small" name="confirmPassword" className="input" margin="dense" value={formData.confirmPassword} onChange={handleChange}/>
                    <TextField id="outlined-basic" label="Gender" variant="outlined" size="small" name="gender" className="input" margin="dense" value={formData.gender} onChange={handleChange}/>
                    <Link to="/login">
                        Already have an account?Sign in
                    </Link>
                    <Button type="submit" variant="contained" className="reg-btn">Register</Button>
                </form>
            </div>
        </div>
    )
}

export default Signup