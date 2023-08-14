import express from "express";
import multer from "multer";
import {
  checkUserLoggedIn,
  login,
  logout,
  userRegister,
} from "../controller/signup.js";

const router = express.Router();

router.get("/");
router.get("/login/check", checkUserLoggedIn);
router.get('/logout' ,logout)

router.post("/register", userRegister);
router.post("/login", login);

export default router;
