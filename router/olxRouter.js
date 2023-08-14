import express from "express";
import multer from "multer";
import {
  checkUserLoggedIn,
  login,
  userRegister,
} from "../controller/signup.js";

const router = express.Router();

router.get("/");
router.post("/register", userRegister);
router.post("/login", login);
router.get("/login/check", checkUserLoggedIn);

export default router;
