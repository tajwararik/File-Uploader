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

    const folders = await prisma.folder.findMany({
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
      userFolders: folders,
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
  res.render("upload-file", { folder: null });
}

export async function getFileUploadFromFolder(req, res) {
  const folderId = req.params.id;

  const folder = await prisma.folder.findFirst({
    where: {
      id: Number(folderId),
      userId: req.user.id,
    },
  });
  res.render("upload-file", { folder });
}

export async function uploadFile(req, res) {
  const { filename, size, path, mimetype } = req.file;
  const userId = req.user.id;
  const folderId = req.params.id ?? null;

  const data = {
    fileName: filename,
    size,
    path,
    mimetype,
    user: {
      connect: {
        id: userId,
      },
    },
  };

  if (folderId)
    data.folder = {
      connect: {
        id: Number(folderId),
      },
    };

  await prisma.file.create({ data });
  res.redirect(folderId ? `/folders/${folderId}` : "/home");
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

export async function expandFolder(req, res) {
  const folderId = req.params.id;

  try {
    const folder = await prisma.folder.findFirst({
      where: {
        id: Number(folderId),
        userId: req.user.id,
      },
      include: {
        files: true,
      },
    });

    const files = folder.files.map((file) => ({
      ...file,
      formattedDate: file.createdAt.toLocaleString("en-GB", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
    }));

    res.render("filesInFolder", { folder, files });
  } catch (error) {
    console.log(error);
  }
}

export async function deleteFile(req, res) {
  const { id } = req.params;

  try {
    await prisma.file.deleteMany({
      where: {
        id: Number(id),
        userId: req.user.id,
      },
    });

    res.redirect("/home");
  } catch (error) {
    console.log(error);
  }
}

export async function deleteFolder(req, res) {
  const { id } = req.params;
  try {
    await prisma.folder.deleteMany({
      where: {
        id: Number(id),
        userId: req.user.id,
      },
    });

    res.redirect("/home");
  } catch (error) {
    console.log(error);
  }
}
