import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma.js";

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

export async function getHomePage(req, res) {
  try {
    const files = await prisma.file.findMany({
      where: {
        userId: req.user.id,
      },
    });

    const userFiles = files.map((file) => ({
      ...file,
      formattedDate: file.createdAt.toLocaleString("en-GB", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
    }));

    res.render("home", {
      userObj: req.user,
      userFiles,
    });
  } catch (error) {
    console.log(error);
  }
}

export function userLogOut(req, res, next) {
  req.logout((error) => {
    if (error) return next(error);

    res.redirect("/");
  });
}

export function getFileUploadPage(req, res) {
  res.render("upload-file");
}

export async function uploadFile(req, res) {
  const { filename, size, path, mimetype } = req.file;
  const userId = req.user.id;

  try {
    await prisma.file.create({
      data: {
        fileName: filename,
        size,
        path,
        mimetype,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
    res.redirect("/home");
  } catch (error) {
    console.log(error);
    res.render("upload-file");
  }
}

export function getCreateFolderPage(req, res) {
  res.render("create-folder");
}

export async function createFolder(req, res) {
  const { folderName } = req.body;
  const userId = req.user.id;

  try {
    await prisma.folder.create({
      data: {
        name: folderName,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    res.redirect("/home");
  } catch (error) {
    console.log(error);
    res.render("create-folder");
  }
}
