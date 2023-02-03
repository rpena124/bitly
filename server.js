// /server.js
require("dotenv").config();
require("./config/database");
const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const Link = require("./models/link");
const User = require("./models/user");
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json()); // req.body
app.use((req, res, next) => {
  res.locals.data = {};
  next();
});
app.use(logger("dev"));
app.use(favicon(path.join(__dirname, "build", "favicon.ico")));
app.use(express.static(path.join(__dirname, "build")));

app.use("/api/links", require("./routes/api/links"));

app.use(require("./config/checkToken"));
/*
app.use('/api', routes) <====== Finish code once you got it
*/
app.use("/api/users", require("./routes/api/users"));

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'))
// })

app.get("/:shortUrl", async (req, res) => {
  const shortUrl = await Link.findOne({ shortUrl: req.params.shortUrl });
  console.log(shortUrl);
  if (shortUrl == null) return res.sendStatus(404);

  shortUrl.clicks++
  shortUrl.save()

  res.redirect(shortUrl.url);
});

app.get("/linkTree/:userId", async (req, res) => {
  const user = await User.findOne({ userId: req.params.userId });
  console.log(user)
  if (req.params.userId == null) return res.sendStatus(404);
  
  res.send(user.linkTree)
});

app.listen(PORT, () => {
  console.log(`I am listening on ${PORT}`);
});
