// /controllers/api/users.js

const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Link = require('../../models/link')
const checkToken = (req, res) => {
  console.log("req.user", req.user);
  res.json(req.exp);
};

const dataController = {
  async create(req, res, next) {
    try {
      const user = await User.create(req.body);
      const createdUser = await User.findById(user._id).populate('links').exec()
      createdUser.links[0].userId = createdUser._id
      createdUser.links[0].save()

      // token will be a string
      const token = createJWT(user);
      // send back the token as a string
      // which we need to account for
      // in the client
      res.locals.data.user = user;
      res.locals.data.token = token;
      next();
    } catch (e) {
      res.status(400).json(e);
    }
  },
  async login(req, res, next) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) throw new Error();
      const match = await bcrypt.compare(req.body.password, user.password);
      if (!match) throw new Error();
      res.locals.data.user = user;
      res.locals.data.token = createJWT(user);
      next();
    } catch {
      res.status(400).json("Bad Credentials");
    }
  },
  async index(req, res, next) {
    try {
      const users = await User.find({});
      if (!users) throw new Error();
      res.locals.data.users = users;
      next();
    } catch {
      res.status(400).json("Bad request");
    }
  },
  async show(req, res, next) {
    try {
      const user = await User.findById(req.params.id).populate("links").exec();
      if (!user) throw new Error();
      res.locals.data.user = user;
      next();
    } catch {
      res.status(400).json("Bad request");
    }
  },
};

const apiController = {
  auth(req, res) {
    res.json(res.locals.data.token);
  },
  index(req, res, next) {
    res.json(res.locals.data.users);
  },
  show(req, res, next) {
    res.json(res.locals.data.user);
  },
};

module.exports = {
  checkToken,
  dataController,
  apiController,
};

/* -- Helper Functions -- */
// Needed to use a regular function, add it at the end, for hoisting
function createJWT(user) {
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: "24h" }
  );
}
