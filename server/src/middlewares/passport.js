import passportJWT from 'passport-jwt';
import jwtConfig from '../config/jwt.config';
import * as UserService from '../services/userService';

const Strategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtConfig.secretKey,
};

export const passportMiddleware = (passport) => {
  passport.use(
    new Strategy(options, async (payload, done) => {
      try {
        const user = await UserService.getUser(payload.id);

        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (e) {
        console.log(e);
      }
    })
  );
};
