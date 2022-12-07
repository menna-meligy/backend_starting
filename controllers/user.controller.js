const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");

// Registering a new user
exports.createUser = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(500).json({
        message: config.ALREADY_EXIST,
      });
    }
    const password = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      email: req.body.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password,
      role: req.body.role,
    });
    newUser
      .save()
      .then((doc) => {
        res.status(200).send({
          message: config.REGISTER_SUCCESSFULLY,
          data: doc,
        });
      })
      .catch((error) => {
        res.status(500).json({
          message: config.REGISTRATION_FAILED,
        });
      });
  } catch (error) {
    res.status(500).json({
      message: config.REGISTRATION_FAILED,
    });
  }
};

// Login a new user
exports.loginUser = async (req, res) => {
  try {
    console.log(req.body.email);
    const user = await User.findOne({ email: req.body.email });
    // throw error when email is wrong
    if (!user)
      return res.status(400).json({
        message: config.NOT_EXIST,
      });

    // check for password correctness
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    //password match condition
    if (!validPassword)
      return res.status(400).json({
        message: config.WRONG_PASSWORD,
      });
    const payload = { email: user.email, userId: user._id, role: user.role };
    const options = { expiresIn: "1h", issuer: "http://localhost:8080" };

    const token = jwt.sign(payload, (secret = process.env.SECRET_KEY), options);

    res.status(200).json({
      expiresIn: 3600,
      message: config.LOGIN_SUCCESSFULL,
      token: token,
      role: user.role,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
