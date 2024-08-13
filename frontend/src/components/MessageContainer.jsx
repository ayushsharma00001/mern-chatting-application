import React, { useEffect } from "react";
import SendInput from "./sendInput.jsx";
import Messages from "./Messages.jsx";
import { useSelector , useDispatch } from "react-redux";
import {setSelectedUser} from "../redux/userSlice.js";
const MessageContainer = () => {
  const {selectedUser,authUser} = useSelector(store=>store.user);
  const dispatch = useDispatch();

  if(selectedUser){
    return (
      <div className="message-container-parent-div">
        <div className="whole-user-message-container">
          <img
            className="profile-photo"
            src={selectedUser?.profilePhoto}
            alt="profile-photo"
          />
          <div className="names">
            <h4>{selectedUser?.fullName}</h4>
            <h6>{selectedUser?.userName}</h6>
          </div>
        </div>
        <Messages/>
        <SendInput/>
      </div>
    );
  }
  else{
    if(authUser){
      return <h2 class="welcome-note">Hi {authUser?.fullName}, <br /> Start Conversation for free...</h2>
    }
    else{
      return <h2 class="welcome-note-login">Hi Anonymous, To start conversation <a href="/login">Login first</a></h2>
    }
  }
};
export default MessageContainer;
