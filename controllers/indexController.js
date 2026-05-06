const db = require ('../db/queries');
// const CustomNotFoundError = require("../errors/CustomNotFoundError");
const { body, validationResult, matchedData, query } = require("express-validator");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require("bcryptjs");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const rows = await db.getUserByUsername(username);
      const user = rows[0];

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
        return done(null, false, { message: "Incorrect password" })
        }
      return done(null, user);
    } catch(err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const rows = await db.getUserByID(id);
    const user = rows[0];

    done(null, user);
  } catch(err) {
    done(err);
  }
});

exports.indexGet = (req, res) => {
    const messages = req.session.messages || [];
    req.session.messages = [];
    res.render("index", { user: req.user, errors: messages });
};

exports.signUpGet = (req, res) => {
    res.render("sign-up-form");
};

exports.signUpPost = async (req, res, next) => {
 try {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  await db.newUser(req.body.username, hashedPassword);
  res.redirect("/");
 } catch (error) {
    console.error(error);
    next(error);
   }
};

exports.logInPost = (req, res, next) => {
    passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
    failureMessage: true
  })(req, res, next);
}

exports.logOutPost = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};