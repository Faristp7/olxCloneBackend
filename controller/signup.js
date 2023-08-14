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
        res.json({ data: true });
      } else {
        res.send(false);
      }
    }
  } catch (error) {
    console.log(error);
  }
}

export async function logout(req, res) {
  try {
    // Clear the 'token' cookie by setting an expired date
    res.cookie('jwtToken', '', {
      httpOnly: true,
      expires: new Date(0),
      secure: true,  // Make sure this is set to true for HTTPS
      sameSite: 'None',  // SameSite setting for secure cross-site cookies
    });

    // Send a JSON response indicating successful logout
    res.json(false);
  } catch (error) {
    console.error('Error during logout:', error);
    // Send an error response if something goes wrong
    res.status(500).json({ success: false, error: 'Logout failed' });
  }
}


export const checkUserLoggedIn = async (req, res) => {
  try {
    console.log('enter');
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
