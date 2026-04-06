import User from "../Model/UserModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Fill the Form",
      });
    }
    const isExist = await User.findOne({ email });
    if (isExist) {
      return res
        .status(409)
        .json({ success: false, message: "Email already Exist" });
    }
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);
    const newUser = await User.create({
      name: name,
      email: email,
      password: hashPassword,
    });
    newUser.save();

    res
      .status(201)
      .json({
        success: true,
        message: "User Has Been Registered Successfully",
        data: { name, email },
      });
  } catch (error) {
    console.log("Something Error Occure", error);
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Require Email and Password!." });
    }
    const isExist = await User.findOne({ email });
    if (!isExist) {
      return res
        .status(400)
        .json({ success: false, message: "Register First" });
    }
    const compare = await bcryptjs.compare(password, isExist.password);
    if (!compare) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect Password!" });
    }
    const token = jwt.sign({ email, id: isExist.id }, process.env.SECRET_KEY, {
      expiresIn: "20min",
    });
    res
      .status(200)
      .json({
        success: true,
        message: "User Has Login Successfully",
        data: token,
      });
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async (req, res) => {};
