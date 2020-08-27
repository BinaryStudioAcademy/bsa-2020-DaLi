import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import userRepository from '../repositories/userRepository';
import { compare } from '../helpers/cryptoHelper';
import { secretKey } from './jwt.config';

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretKey,
};

passport.use(
  'login',
  new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      const user = await userRepository.getByEmail(email);
      if (!user) {
        return done({ status: 401, message: 'Incorrect email.' }, false);
      }
      return (await compare(password, user.password))
        ? done(null, user)
        : done({ status: 401, message: 'Passwords do not match.' }, null, false);
    } catch (err) {
      return done(err);
    }
  })
);

passport.use(
  'jwt',
  new JwtStrategy(options, async ({ id }, done) => {
    try {
      const user = await userRepository.getUserById(id);
      return user ? done(null, user) : done({ status: 401, message: 'Token is invalid.' }, null);
    } catch (err) {
      return done(err);
    }
  })
);

passport.use(
  'register',
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password', passReqToCallback: true },
    async ({ body: { firstName, lastName } }, email, password, done) => {
      try {
        return (await userRepository.getByEmail(email))
          ? done({ status: 401, message: 'Email is already taken.' }, null)
          : done(null, { firstName, lastName, email, password });
      } catch (err) {
        return done(err);
      }
    }
  )
);
