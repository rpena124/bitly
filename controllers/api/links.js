const Link = require("../../models/link");
const User = require("../../models/user");
const crypto = require("crypto");

const dataController = {
  // Index
  index(req, res, next) {
    Link.find({}, (err, foundLinks) => {
      if (err) {
        console.error(err);
        res.status(400).send(err);
      } else {
        res.locals.data.links = foundLinks;
        next();
      }
    });
  },
  // Destroy
  destroy(req, res, next) {
    Link.findByIdAndDelete(req.params.id, (err, deletedLink) => {
      if (err) {
        console.error(err);
        res.status(400).send(err);
      } else {
        res.locals.data.link = deletedLink;
        next();
      }
    });
  },
  // Create
  create(req, res, next) {
    req.body.shortUrl = shortLink(req.body.url);
    Link.create(req.body, (err, createdLink) => {
      if (err) {
        res.status(400).send({
          msg: err.message,
        });
      } else {
        res.locals.data.link = createdLink;
        next();
      }
    });
  },
  // Update
  update(req, res, next) {
    Link.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
      (err, updatedLink) => {
        if (err) {
          res.status(400).send({
            msg: err.message,
          });
        } else {
          res.locals.data.link = updatedLink;
          next();
        }
      }
    );
  },
  // Show
  show(req, res, next) {
    Link.findById(req.params.id, (err, foundLink) => {
      if (err) {
        console.error(err);
        res.status(400).send(err);
      } else {
        res.locals.data.link = foundLink;
        next();
      }
    });
  },
  async createLinkForLoggedInUser(req, res, next) {
    try {
      const user = await User.findById(req.params.userId);

      req.body.shortUrl = shortLink(req.body.url);
      req.body.userId = req.params.userId;
      Link.create(req.body, (err, createdLink) => {
        if (err) {
          res.status(400).send({
            msg: err.message,
          });
        } else {
          user.links.addToSet(createdLink._id);
          user.save();
          res.locals.data.link = createdLink;
          res.locals.data.user = user;
          next();
        }
      });
    } catch {
      res.status(400).json("stupid error");
    }
  },
};

const apiController = {
  index(req, res, next) {
    res.json(res.locals.data.links);
  },
  show(req, res, next) {
    res.json(res.locals.data.link);
  },
};

module.exports = {
  apiController,
  dataController,
};

const shortLink = (longUrl) => {
  const characters =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const hashUrl = crypto
    .createHmac("sha256", "reclaimer")
    .update(longUrl)
    .update(Date.now().toString())
    .digest("hex");
  let input = parseInt((hashUrl.match(/[0-9]/g) || []).join(""));

  let result = "";

  while (input > 0) {
    result += characters[input % 62];
    input = Math.floor(input / 62);
  }

  return result.substring(0, 7);
};
