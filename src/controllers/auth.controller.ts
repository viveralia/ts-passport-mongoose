import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import User from "../models/User";

export const signUp = async (req: Request, res: Response) => {
  let { email, password, roles } = req.body;

  if (!email || !password || !roles) {
    return res.status(400).json({ error: "Send email, password and roles" });
  }

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ error: "User already registered" });

  const user = await User.create({ email, password, roles });
  const payload = { id: user.id, email: user.email, roles: user.roles };
  const options = { expiresIn: 86400 };
  const token = jwt.sign(payload, process.env.JWT_SECRET!, options);
  res.status(200).json({ token });
};

export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Send email and password" });
  }

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: "User is not registered" });

  const match = await user.comparePassword(password);
  if (!match) return res.status(401).json({ error: "Invalid credentials" });

  const payload = { id: user.id, email: user.email, roles: user.roles };
  const options = { expiresIn: 86400 };
  const token = jwt.sign(payload, process.env.JWT_SECRET!, options);
  res.status(200).json({ token });
};
