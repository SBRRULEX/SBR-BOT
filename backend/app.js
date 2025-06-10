const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const bodyParser = require("body-parser");

// Routes
const cookieExtractorRoute = require("./routes/cookieExtractorRoute");

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "..", "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// File upload setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "uploads");
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage: storage });

// Sample route (homepage)
app.get("/", (req, res) => {
  res.send("🚀 SBR-BOT backend is running!");
});

// Mount extractor route
app.use("/extractor", cookieExtractorRoute);

// Upload endpoint (optional)
app.post("/upload", upload.single("file"), (req, res) => {
  res.json({ filename: req.file.filename, status: "Uploaded" });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server started on port ${PORT}`);
});
