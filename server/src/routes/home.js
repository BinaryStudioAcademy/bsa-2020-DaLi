import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  return res.send('Express server');
});

export default router;
