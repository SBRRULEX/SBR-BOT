const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const multer = require("multer");

const handleBotCommands = require("./botHandler");
const extractorRoute = require("./routes/cookieextractorroute");
const otherRoutes = require("./routes/otherRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, "../frontend")));

// Routes
app.use("/extract", extractorRoute);
app.use("/api", otherRoutes);

// Multer setup for file uploads
const upload = multer({ dest: path.join(__dirname, "uploads/") });

app.post("/upload", upload.fields([{ name: "token" }, { name: "uid" }, { name: "message" }]), (req, res) => {
  res.status(200).json({ success: true, message: "Files uploaded successfully." });
});

// Health check
app.get("/health", (req, res) => {
  res.send("✅ Backend Running - Rocky SBR");
});

// Fallback to frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 SBR Backend Running on PORT ${PORT}`);
});
