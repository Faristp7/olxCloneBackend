import bcrypt from "bcrypt";
import userModel from "../model/userModel.js";
import jwt from "jsonwebtoken";

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
      res.send(true);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function login(req, res) {
  try {
    const { loginEmail, loginPassword } = req.body;
    if (loginEmail && loginPassword) {
      const user = await userModel.find({ email: loginEmail });
      const userValid = bcrypt.compareSync(loginPassword, user[0].password);
      if (user && userValid) {
        const token = jwt.sign({ id: user[0]._id }, "myKey");
        res.cookie("jwtToken", token, {
          httpOnly: true,
          secure: true,
          maxAge: 3600000, //1hour
          sameSite: "none",
        });
        res.json({ message: true });
      } else {
        res.send(false);
      }
    }
  } catch (error) {
    console.log(error);
  }
}
export const checkUserLoggedIn = async (req, res) => {
  try {
    const token = req.cookies.jwtToken;
    if (!token)
      return res.json({ loggedIn: false, error: true, message: "no token" });

    const verifiedJWT = jwt.verify(token, "myKey");
    const user = await userModel.findById(verifiedJWT.id, { password: 0 });
    if (!user) {
      return res.json({ loggedIn: false });
    }
    return res.json({ user, loggedIn: true });
  } catch (err) {
    console.log(err);
    res.json({ loggedIn: false, error: err });
  }
};
