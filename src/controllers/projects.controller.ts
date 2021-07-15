import { Request, Response } from "express";

import Project from "../models/Project";
import { IUser } from "../models/User";

export const getProjects = async (req: Request, res: Response) => {
  const projects = await Project.find();
  res.status(200).json(projects);
};

export const getProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Project.findById(id);
  res.status(200).json(product);
};

export const createProject = async (req: Request, res: Response) => {
  try {
    const user = req.user as IUser;
    const project = await Project.create({ ...req.body, createdBy: user._id });
    return res.status(201).json(project);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const user = req.user as IUser;
    const { id } = req.params;
    const project = await Project.findById(id);

    // TODO: Fix authorization
    // const isCreator = project?.createdBy === user.id;
    // if (!isCreator) return res.status(401).json({ error: "Unauthorized" });

    // TODO: Fix update
    const updatedProject = await project?.update(req.body, { new: true });
    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Project.findByIdAndDelete(id);
  res.status(200).json(product);
};
