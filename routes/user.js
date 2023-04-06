import express from "express";
import {
  getMyDetails,
  getProfile,
  login,
  logout,
  register,
} from "../controllers/user.js";
import { isAuth } from "../middlewares/auth.js";

const router = express.Router();

router.get("/all", isAuth, getProfile);
router.post("/register", register);
router.post("/login", login);
router.get("/me", isAuth, getMyDetails);
router.get("/logout", logout);

export default router;
