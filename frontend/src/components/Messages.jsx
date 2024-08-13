import React from 'react'
import Message from './Message'
import useGetMessages from '../hooks/useGetMessages';
import { useSelector } from "react-redux";
import useGetRealTimeMessage from '../hooks/useGetRealTimeMessage';
const Messages = () => {
  useGetMessages();
  useGetRealTimeMessage();
  const { messages } = useSelector((store) => store.message);
  const { selectedUser } = useSelector((store) => store.user);

  return (
    <div className="msgs-div">
      {messages && messages?.map((msg) => {
        return (
          <div key={msg._id} className={`${selectedUser?._id === msg?.reciever?'end-msg':'start-msg'}`}>
            <Message message={msg}/>
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
