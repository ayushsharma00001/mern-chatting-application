import express from "express";
const router = express.Router();
import { getOtherUsers, login, logout, register } from "../controllers/userController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

router.route("/register")
.post(register)

router.route("/login")
.post(login)


router.route("/logout")
.get(logout)


router.route("/")
.get(isAuthenticated,getOtherUsers)



export default router;