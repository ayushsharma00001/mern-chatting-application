import React, { useEffect, useRef } from "react";
import {useSelector} from "react-redux";


const Message = ({message})=>{
    const {authUser,selectedUser} = useSelector(store=>store.user);
    const scroll = useRef();
    useEffect(()=>{
        scroll.current?.scrollIntoView({behavior:"smooth"});
    },[message]);
    return(
        <div ref={scroll} className="whole-msg">
            <img className="profile-photo msg-photo" src={message.sender === authUser?._id?authUser.profilePhoto:selectedUser.profilePhoto} alt="user-profile" />
            <div className="msg">{message?.message}</div>
        </div>
    )
};

export default Message;