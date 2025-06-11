const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve frontend
app.use(express.static(path.join(__dirname, "../frontend")));

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

const cookieExtractorRoute = require("./routes/cookieextractorroute");
app.use("/api/extractor", cookieExtractorRoute);

const otherRoutes = require("./routes/otherRoutes");
app.use("/api", otherRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`✅ SBR-BOT Backend Running on PORT ${PORT}`);
});
