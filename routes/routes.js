import { Router } from "express";
import {
  getIndexPage,
  getSignUpForm,
  createUser,
  getLogInForm,
  getHomePage,
  userLogOut,
  getFileUploadPage,
  uploadFile,
} from "../controllers/controllers.js";
import userCreatePost from "../middleware/userValidator.js";
import passport from "../middleware/passport.js";
import { isAuthenticated, isNotAuthenticated } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";

const router = Router();

router.get("/", isNotAuthenticated, getIndexPage);
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
router.get("/home", isAuthenticated, getHomePage);
router.get("/logout", userLogOut);
router.get("/upload-file", isAuthenticated, getFileUploadPage);
router.post("/upload-file", upload.single("file-input"), uploadFile);

export default router;
