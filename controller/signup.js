import bcrypt from "bcrypt";
import userModel from "../model/userModel.js";

var salt = bcrypt.genSaltSync(10);

export async function userRegister(req, res) {
  try {
    const { email, password, name } = req.body;
    const hashedPassword = bcrypt.hashSync(password, salt);
    const user = await userModel.findOne({ email });
    if (user) {
      res.send("Already Exist");
    } else {
      const newUser = new userModel({ name, email, password: hashedPassword });
      await newUser.save();
    }
  } catch (error) {
    console.log(error);
  }
}
