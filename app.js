import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import botHandler from "./backend/botHandler.js";
import otherRoutes from "./backend/routes/otherRoutes.js";
import cookieExtractor from "./backend/routes/cookieExtractorRoute.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

// Routes
app.post("/bot", botHandler);
app.use("/extract", cookieExtractor);
app.use("/api", otherRoutes);

// Serve frontend
app.use(express.static(path.join(__dirname, "frontend")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
