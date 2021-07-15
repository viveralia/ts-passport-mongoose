import { Router } from "express";
import passport from "passport";

import * as projectsController from "../controllers/projects.controller";

const router = Router();

router.get("/", projectsController.getProjects);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  projectsController.createProject
);

router.get("/:id", projectsController.getProject);

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  projectsController.updateProject
);

router.delete("/:id", projectsController.deleteProject);

export default router;
