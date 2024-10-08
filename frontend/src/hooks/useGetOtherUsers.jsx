import React, { useEffect } from "react";
import axios from "axios";
import {useDispatch} from "react-redux"
import { setOtherUsers } from "../redux/userSlice";
const useGetOtherUsers = ()=>{
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchOtherUsers = async ()=>{
            try{
                axios.defaults.withCredentials = true;
                const res = await axios.get("https://mern-chat-tmpe.onrender.com/api/v1/user/");

                dispatch(setOtherUsers(res.data));
            }catch(err){
                console.log(err);
            }
        }
        fetchOtherUsers();
    },[])
}

export default useGetOtherUsers;