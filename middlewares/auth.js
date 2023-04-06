import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const isAuth = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token)
    return res.status(400).json({
      success: false,
      message: "Login First",
    });
  const decode = jwt.verify(token, process.env.JWT);
  req.user = await User.findById(decode._id);
  next();
};
