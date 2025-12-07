import { Router } from "express";
import {
  getIndexPage,
  getSignUpForm,
  createUser,
  getLogInForm,
} from "../controllers/controllers.js";
import { userCreatePost } from "../validator/userValidator.js";

const router = Router();

router.get("/", getIndexPage);
router.get("/signup", getSignUpForm);
router.post("/signup", userCreatePost, createUser);
router.get("/login", getLogInForm);

export default router;
