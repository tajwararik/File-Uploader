import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";

export function getIndexPage(req, res) {
  res.render("index");
}

export function getSignUpForm(req, res) {
  res.render("signup");
}

export async function createUser(req, res) {
  const { firstName, lastName, email, password } = req.validatedUser;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    });
    res.redirect("/login");
  } catch (error) {
    console.log(error);
    res.render("signup");
  }
}

export function getLogInForm(req, res) {
  res.render("login");
}
