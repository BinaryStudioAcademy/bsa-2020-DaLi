import passport from 'passport';

export default (req, res, next) => {
  passport.authenticate('jwt', (err, user) => {
    if (err) return next(err);
    if (!user) return res.status(401).send('User is not authenticated.');
    req.user = user;
    return next();
  })(req, res, next);
};
