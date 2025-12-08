import { body, validationResult, matchedData } from "express-validator";

const nameValidation = (nameField) =>
  body(nameField)
    .trim()
    .notEmpty()
    .withMessage("First name can't be empty")
    .matches(/^[A-Za-z ]+$/)
    .withMessage(
      "Names Can only contain letters and single spaces between words"
    )
    .isLength({ min: 1, max: 20 })
    .withMessage("Length between 1 and 20 characters");

const signupValidation = [
  nameValidation("firstName"),

  nameValidation("lastName"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email can't be empty")
    .isEmail()
    .withMessage("Email is not valid"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Length should be at least 6"),
];

const userCreatePost = [
  signupValidation,
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("signup", {
        title: "Sign up",
        errors: errors.array(),
      });
    }

    req.validatedUser = matchedData(req);

    next();
  },
];

export default userCreatePost;
