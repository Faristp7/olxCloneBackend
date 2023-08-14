import express from "express";
import multer from "multer";
import { userRegister } from "../controller/signup.js";

const router = express.Router();

router.get('/')
router.post('/register', userRegister)

export default router