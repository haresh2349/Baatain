import express from "express";
import { connectDatabase } from "./config/database";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

connectDatabase().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
