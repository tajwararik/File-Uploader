import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import "dotenv/config";

const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, (error) => {
  if (error) throw error;

  console.log(`Connected on post: ${PORT}`);
});
