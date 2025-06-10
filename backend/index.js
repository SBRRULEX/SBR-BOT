const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Static files if needed (e.g. from /public)
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const cookieExtractorRoute = require('./routes/cookieextractorroute');
const otherRoutes = require('./routes/otherRoutes'); // if you have other route files

app.use('/api/extract', cookieExtractorRoute);
app.use('/api', otherRoutes); // adjust prefix as per your other route handlers

// Health check route
app.get('/', (req, res) => {
  res.send('🔥 SBR-BOT Backend Running Successfully');
});

// Dynamic port for Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
