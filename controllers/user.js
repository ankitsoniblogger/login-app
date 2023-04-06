import { isAuth } from "../middlewares/auth.js";
import { User } from "../models/user.js";
import { sendCookie } from "../utils/cookies.js";
import bcrypt from "bcrypt";

export const getProfile = async (req, res, next) => {
  try {
    const users = await User.find();
    res.json({
      success: true,
      users,
    });
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user)
      return res.status(404).json({
        success: false,
        message: "User Already Exist",
      });

    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    sendCookie(user, res, "Registered Successfully", 201);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user)
      return res.status(404).json({
        success: false,
        message: "Invalid Email or Password",
      });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(404).json({
        success: false,
        message: "Invalid Email or Password",
      });
    sendCookie(user, res, `Welcome ${user.name}`, 200);
  } catch (error) {
    next(error);
  }
};

export const getMyDetails = (req, res, next) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logout",
    });
};
