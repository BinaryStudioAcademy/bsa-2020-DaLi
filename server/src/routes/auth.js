import { Router } from "express";
import passport from "passport";
import { login } from "../services/authService";

const router = Router();

router.post(
  "/login",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send(login(req.user));
  }
);

// router.post(
//   "/register",
//   passport.authenticate("register", { session: false }),
//   async (req, res) => {
//     await register(req.user);
//     res.sendStatus(204);
//   }
// );

// router.get(
//   "/profile",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     res.send(req.user);
//   }
// );

export default router;
