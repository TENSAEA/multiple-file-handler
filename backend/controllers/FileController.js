const { Request, Response } = require("express");
const File = require("../models/file");
const multer = require("multer");
const multerupload = require("../middleware/uploadMiddleware");

const upload = multer({ dest: "uploads/" });

exports.getFiles = async (req, res) => {
  const files = await File.findAll();
  res.json(files);
};

exports.uploadFile = [
  upload.single("file"),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }
    try {
      const file = await File.create({
        description: req.body.description,
        filePath: req.file.path,
      });
      res.status(201).json(file);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
];

exports.deleteFile = async (req, res) => {
  const { id } = req.params;
  await File.destroy({ where: { id } });
  res.status(204).send();
};

exports.updateFile = async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  await File.update({ description }, { where: { id } });
  res.send({ id, description });
};
