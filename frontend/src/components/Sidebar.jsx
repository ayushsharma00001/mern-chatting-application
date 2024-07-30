import React, { useState, useEffect } from "react";
import "./HomePage.css";
import Button from "@mui/material/Button";
import OtherUsers from "./OtherUsers";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAuthUser, setOtherUsers, setSelectedUser } from "../redux/userSlice";

const Sidebar = () => {
  const [search, setSearch] = useState("");
  const [fullUserList, setFullUserList] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { otherUsers } = useSelector((store) => store.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/user/");
        setFullUserList(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to fetch users");
      }
    };

    fetchUsers();
  }, []);

  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/v1/user/logout");
      navigate("/login");
      toast.success(res.data.message);
      dispatch(setSelectedUser(null));
      dispatch(setAuthUser(null));
    } catch (error) {
      console.log(error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Logout failed");
      }
    }
  };

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    const conversationUser = fullUserList.filter((user) => 
      user.fullName.toLowerCase().includes(search.toLowerCase())
    );
    if (conversationUser) {
      dispatch(setOtherUsers(conversationUser));
    } else {
      toast.error("User not found...");
    }
  };

  return (
    <div className="search-outer-div">
      <div>
        <form action="" className="searchForm" onSubmit={searchSubmitHandler}>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="search-input"
          />
          <Button variant="contained" className="search-btn" type="submit">
            Search
          </Button>
        </form>
      </div>
      <div className="otherUsers">
        <OtherUsers />
      </div>
      <div className="logout-btn">
        <Button variant="outlined" color="error" onClick={logoutHandler}>
          Log out
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
