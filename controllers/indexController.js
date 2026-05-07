const db = require ('../db/queries');
// const CustomNotFoundError = require("../errors/CustomNotFoundError");
const { body, validationResult, matchedData, query } = require("express-validator");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require("bcryptjs");

const validateInput = [
    body("username").trim().escape()
      .isLength({min: 1, max: 20}).withMessage('Username must be between 1 and 20 characters.'),
    body("password").trim().escape()
      .isLength({ min: 4}).withMessage('Password must be at least 4 characters.'),
];

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const rows = await db.getUserByUsername(username);
      const user = rows[0];

      if (!user) {
        return done(null, false, { message: "Username not found" });
      }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
        return done(null, false, { message: "Incorrect username/password combination" })
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

exports.signUpPost = [
  validateInput,
  async (req, res, next) => {
    const { username, password } = matchedData(req);
    const errors = validationResult(req);
    let errorMsgArray = [];
    errors.array().forEach(error => {
      errorMsgArray.push(error.msg);
    });    
    if(!errors.isEmpty()){
        return res.status(400).render("sign-up-form", {
          errors: errorMsgArray,
        });
    } else {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      await db.newUser(username, hashedPassword);
      res.redirect("/");
    } catch (error) {
        console.error(error);
        next(error);
      }
    }
  }
] 

exports.logInPost = [
  validateInput, 
  (req, res, next) => {
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/",
      failureMessage: true
    })(req, res, next);
  }
]

exports.logOutPost = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};