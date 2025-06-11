const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const extractorRoute = require('./routes/cookieextractorroute');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Serve frontend from public folder if needed
app.use(express.static(path.join(__dirname, '../public')));

// API Route for cookie extractor
app.use('/api/extract', extractorRoute);

// Default route
app.get('/', (req, res) => {
  res.send('SBR-BOT Backend Running ✅');
});

// Port setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
