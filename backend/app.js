const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Static frontend (adjust this path if needed)
app.use(express.static(path.join(__dirname, '../frontend')));

// Routes
const otherRoutes = require('./routes/otherRoutes');
const cookieExtractorRoute = require('./routes/cookieextractorroute');
const botHandler = require('./botHandler');

// Apply Routes
app.use('/api', otherRoutes);
app.use('/cookie-extractor', cookieExtractorRoute);
app.use('/bot', botHandler);

// Fallback for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Port setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Backend server running on port ${PORT}`);
});
