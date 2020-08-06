const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const validator = require("validator");
const bcrypt = require("bcrypt");
const { secretKey, jwtExpiresIn } = require("../config/security.config");
const userRepo = require("../repos/userRepo");
const { unauthorized, badRequest } = require("../helpers/types/HttpError");

passport.use(
  "register",
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        if (!validator.isEmail(email)) {
          return done(badRequest("Email is not valid"), null);
        }
        const userByEmail = await userRepo.getByEmail(email);
        if (userByEmail) {
          return done(badRequest("User with such email already exists"), null);
        }
        return done(null, {
          email,
          password: await bcrypt.hash(password, 10),
        });
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      try {
        if (!validator.isEmail(email)) {
          return done(unauthorized("Email is not valid"), null);
        }
        const userByEmail = await userRepo.getByEmail(email);
        if (!userByEmail) {
          return done(unauthorized("Email is wrong"), null);
        }
        const isMatched = await bcrypt.compare(password, userByEmail.password);
        return isMatched
          ? done(null, userByEmail)
          : done(unauthorized("Password is wrong"), null);
      } catch (err) {
        return done(err);
      }
    }
  )
);

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretKey,
  expiresIn: jwtExpiresIn,
};

passport.use(
  "jwt",
  new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
    try {
      const { id } = jwtPayload;
      const userById = await findById(id);
      done(null, userById);
    } catch (err) {
      done(err);
    }
  })
);
