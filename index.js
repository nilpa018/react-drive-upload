const express = require("express");
const multer = require("multer");
const fs = require("fs").promises;
require("dotenv").config();

const fileUpload = require("./service/FileDriveUpload.js");
const ExecuteFileUpload = fileUpload.ExecuteFileUpload;

const upload = multer({ dest: "uploads/" });
const app = express();

app.use("/uploads", express.static("uploads"));

app.use((_req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.post("/upload", upload.single("asset"), async (req, res) => {
  const newFileName = `uploads/${req.file.originalname}`;

  await fs.rename(req.file.path, newFileName);
  ExecuteFileUpload(newFileName, req.file.originalname);

  res.json({
    asset: newFileName,
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Connected on port: ${process.env.PORT}`);
});
