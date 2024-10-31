import { Hono } from "hono";
import { config } from "dotenv";
import router from "./routes/routes";

config();

const app = new Hono();

app.route("/api", router);

export default app;
