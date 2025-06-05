import express from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { createTransactionRoutes } from "./routes/transactionRoutes";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan("combined"));
app.use(express.json());

// Database connection
createConnection()
  .then(() => {
    console.log("Database connected");

    // Routes
    app.use("/api", createTransactionRoutes());

    // Error handling
    app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
      console.error(err.stack);
      res.status(500).json({ error: "Something went wrong!" });
    });

    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => console.log("TypeORM connection error: ", error));

export default app;