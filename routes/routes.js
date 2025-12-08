import { Router } from "express";
import {
  getIndexPage,
  getSignUpForm,
  createUser,
  getLogInForm,
  getHomePage,
  userLogOut,
} from "../controllers/controllers.js";
import { userCreatePost } from "../validator/userValidator.js";
import passport from "../validator/passport.js";

const router = Router();

router.get("/", getIndexPage);
router.get("/signup", getSignUpForm);
router.post("/signup", userCreatePost, createUser);
router.get("/login", getLogInForm);
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/login",
  })
);
router.get("/home", getHomePage);
router.get("/logout", userLogOut);

export default router;
