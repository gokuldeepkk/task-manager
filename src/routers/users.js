import express from "express";
import { User } from "../models/user.js";

export const userRouter = new express.Router();

userRouter.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

userRouter.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

userRouter.get("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (user) res.send(user);
    else res.status(404).send({ message: "User not found" });
  } catch (error) {
    res.status(500).send(error);
  }
});

userRouter.patch("/users/:id", async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "email", "password", "age"];
    const isValid = updates.every((update) => allowedUpdates.includes(update));
    if (!isValid) {
      return res.status(400).send({ message: "Invalid Request" });
    }

    const id = req.params.id;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    updates.forEach((update) => {
      user[update] = req.body[update];
    });

    await user.save();
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

userRouter.delete("/users/:id", async (req, res) => {
  try {
    const _id = req.params.id;

    const user = await User.findByIdAndDelete(_id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});
