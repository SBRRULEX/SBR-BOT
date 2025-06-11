const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Static frontend
app.use(express.static(path.join(__dirname, "../frontend")));

// Routes
const otherRoutes = require("./routes/otherRoutes");
const cookieExtractorRoute = require("./routes/cookieextractorroute");
const botHandler = require("./botHandler");

app.use("/api/other", otherRoutes);
app.use("/api/extract", cookieExtractorRoute);
app.post("/api/bot", botHandler);

// Fallback route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Backend running on port ${PORT}`));
