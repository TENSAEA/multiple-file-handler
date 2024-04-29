const express = require("express");
const FileController = require("../controllers/FileController");
const uploadMiddleware = require("../middleware/uploadMiddleware");

const router = express.Router();
router.get("/files", FileController.getFiles);
router.post("/files", uploadMiddleware, FileController.uploadFile);
router.delete("/files/:id", FileController.deleteFile);
router.put("/files/:id", FileController.updateFile);

module.exports = router;
