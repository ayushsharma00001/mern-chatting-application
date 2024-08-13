import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";
const OtherUser = ({user}) => {
  const dispatch = useDispatch();
  const {selectedUser,onlineUsers} = useSelector(store=>store.user)
  const isOnline = onlineUsers?.includes(user._id);
  const selectedUserHandler = (user)=>{
    dispatch(setSelectedUser(user));
  }
  return (
    <div className={`${selectedUser?._id !== user?._id?'whole-user':'whole-user-selected'}`} onClick={()=>selectedUserHandler(user)}>
      <img
        className={`${isOnline?"profile-photo online":"profile-photo"}`}
        src={user?.profilePhoto}
        alt="user-profile"
      />
      <div className="names">
        <h4>{user?.fullName}</h4>
        <h6>{user?.userName}</h6>
      </div>
    </div>
  );
};

export default OtherUser;
