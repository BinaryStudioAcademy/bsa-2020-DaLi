import { Router } from "express";
import passport from "passport";
const { login } = require("../services/auth");

const router = Router();

router.post(
  "/login",
  passport.authenticate("login", { session: false }),
  (req, res) => {
    res.send(login(req.user));
  }
);

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send(req.user);
  }
);

export default router;
