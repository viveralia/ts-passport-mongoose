import express from "express";
import morgan from "morgan";
import cors from "cors";
import passport from "passport";

import { PORT } from "./config/env";
import passportJwtMiddleware from "./middlewares/passportJwt";
import authRoutes from "./routes/auth.routes";
import projectRoutes from "./routes/projects.routes";
import { connectDatabase } from "./utils/database";
import { createDefaultRoles, createDefaultCategories } from "./utils/seed";

connectDatabase();
createDefaultRoles();
createDefaultCategories();

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(passport.initialize());
passport.use(passportJwtMiddleware);

app.use("/auth", authRoutes);
app.use("/projects", projectRoutes);

app.set("PORT", PORT);
app.listen(app.get("PORT"));
console.log(`Server on: http://localhost:${app.get("PORT")}`);
