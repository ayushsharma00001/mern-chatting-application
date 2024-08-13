import React, { useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice"; 

const SendInput = () => {
    const [msg, setMsg] = useState("");
    const dispatch = useDispatch();
    const { selectedUser } = useSelector(store => store.user);
    const { messages } = useSelector(store => store.message);

    const handleChange = (e) => {
        setMsg(e.target.value);
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setMsg("");
        try {
            const res = await axios.post(
                `https://mern-chat-tmpe.onrender.com/api/v1/message/send/${selectedUser?._id}`,
                { message: msg },
                {
                    withCredentials: true
                }
            );
            console.log(res);
            dispatch(setMessages([...messages, res?.data?.newMessage]));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={onSubmitHandler}>
            <div className="msg-input-outer-div">
                <input
                    type="text"
                    name="search"
                    placeholder="Send a message..."
                    className="send-input"
                    value={msg}
                    onChange={handleChange}
                />
                <button className="send-icon-btn" type="submit">
                    <SendIcon className="send-icon" />
                </button>
            </div>
        </form>
    );
};

export default SendInput;
