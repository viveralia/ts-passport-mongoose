import dotenv from "dotenv";

dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET!;
export const MONGO_URI = process.env.MONGO_URI!;
export const PORT = process.env.PORT!;
