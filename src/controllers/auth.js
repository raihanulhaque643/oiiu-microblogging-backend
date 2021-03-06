const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (user) {
      return res.status(400).json({
        message: "User already resgistered!",
      });
    }

    const { firstName, lastName, email, password } = req.body;
    const hash_password = await bcrypt.hash(password, 10);
    const _user = new User({
      firstName,
      lastName,
      email,
      hash_password,
    });

    _user.save((error, data) => {
      if (error) {
        return res.status(400).json({
          message: "Something went wrong!",
        });
      }

      if (data) {
        return res.status(201).json({
          message: "User created successfully!",
        });
      }
    });
  });
};

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (error) {
      return response.status(400).json({ error });
    }

    if (user) {
      const isPassword = await user.authenticate(req.body.password);
      if (isPassword) {
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });
        const { _id, firstName, lastName, email } = user;
        res.status(200).json({
          token,
          user: {
            _id,
            firstName,
            lastName,
            email,
          },
        });
      } else {
        return res.status(400).json({
          message: "Incorrect password!",
        });
      }
    } else {
      return res
        .status(400)
        .json({ message: "No such user found. Check email for typos." });
    }
  });
};
