import express from "express";
import {getDB} from "../db.js";

const router = express.Router();


//POST/auth/register -register user
router.post("/register", (req, res)=>{});
//POST/auth/login - login user
router.post("/login", (req,res)=>{});
export default router;