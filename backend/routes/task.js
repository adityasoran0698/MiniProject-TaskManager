const express = require("express");
const router = express.Router();
const Task = require("../models/task.js");
const { checkForAuth } = require("../middlewares/auth.js");
router.post("/addtask", checkForAuth("token"), async (req, res) => {
  const body = req.body;
  try {
    const newTask = await Task.create({
      title: body.title,
      content: body.content,
      createdBy: req.user._id,
    });
    return res.status(200).json(newTask);
  } catch (error) {}
});
router.put("/addtask/:id", checkForAuth("token"), async (req, res) => {
  const body = req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, {
      title: body.title,
      content: body.content,
    });
    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    return res.status(200).json(updatedTask);
  } catch (error) {
    console.log(error);
  }
});
router.delete("/deleteTask/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Task Deleted!" });
  } catch (error) {
    res.status(500).json({ message: "Error in deleting Task" });
  }
});
router.put("/mark-complete/:id", async (req, res) => {
  try {
    await Task.findByIdAndUpdate(req.params.id, { status: "Completed ✅" });
    return res.status(200).json({ message: "Mark as Completed!" });
  } catch (error) {
    res.status(500).json({ message: "Error in marking" });
  }
});
router.get("/viewtasks", checkForAuth("token"), async (req, res) => {
  try {
    const alltasks = await Task.find({ createdBy: req.user._id }).populate(
      "createdBy"
    );
    return res.json(alltasks);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
