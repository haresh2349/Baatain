import express, { Application } from "express";
import { connectDatabase } from "./config/database";
import * as dotenv from "dotenv";
import UserRouter from "./routes/users.routes";
import AuthRouter from "./routes/auth.routes";
import MessageRouter from "./routes/messages.routes";
import { errorHandler } from "./middleware/error-handler";
import { isUserLoggedIn } from "./middleware/auth-middleware";
dotenv.config();

const app: Application = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/users", isUserLoggedIn, UserRouter);
app.use("/api/v1/chat", isUserLoggedIn, MessageRouter);
app.use(errorHandler);

app.listen(PORT, () => {
  connectDatabase().then(() => {
    console.log(`Server running on port ${PORT}`);
  });
});
