import express from "express";
import { Task } from "../models/task.js";

export const taskRouter = new express.Router();

taskRouter.post("/tasks", async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

taskRouter.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});

taskRouter.get("/tasks/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const task = await Task.findById(id);
    if (task) res.send(task);
    else res.status(404).send({ message: "Task not found" });
  } catch (error) {
    res.status(500).send(error);
  }
});

taskRouter.patch("/tasks/:id", async (req, res) => {
  try {
    const updateKeys = Object.keys(req.body);
    const allowedUpdates = ["description", "completed"];
    const isValid = updateKeys.every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValid) {
      return res.status(400).send({ message: "Invalid Request" });
    }

    const id = req.params.id;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).send({ message: "Task Not Found" });
    }

    updateKeys.forEach((key) => (task[key] = req.body[key]));
    await task.save();

    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

taskRouter.delete("/tasks/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const task = await Task.findByIdAndDelete(_id);

    if (!task) {
      return res.status(404).send({ message: "Task not found" });
    }
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});
