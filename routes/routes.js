import { Router } from "express";
import {
  getIndexPage,
  getSignUpForm,
  getLogInForm,
} from "../controllers/controllers.js";

const router = Router();

router.get("/", getIndexPage);
router.get("/signup", getSignUpForm);
router.get("/login", getLogInForm);

export default router;
