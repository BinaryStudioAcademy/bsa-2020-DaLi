const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const validator = require("validator");
const bcrypt = require("bcrypt");
const { secretKey, jwtExpiresIn } = require("../config/security.config");

// Mock
const findById = (id) => ({
  id,
  email: "test@mail.com",
  password: "hashed_bcrypt_pass",
});

// Mock
const findByEmail = (email) => ({
  id: 42,
  email,
  password: "hashed_bcrypt_pass",
});

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
          return done("Email is not valid", null);
        }
        const userByEmail = await findByEmail(email);
        if (userByEmail) {
          return done("User with such email already exists", null);
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
          return done("Email is not valid", null);
        }
        const userByEmail = await findByEmail(email);
        if (!userByEmail) {
          return done("Email is wrong", null);
        }
        // const isMatched = await bcrypt.compare(password, userByEmail.password);
        const isMatched = password === userByEmail.password;
        return isMatched
          ? done(null, userByEmail)
          : done("Password is wrong", null);
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
