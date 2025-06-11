const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Static files from frontend/public
app.use(express.static(path.join(__dirname, '..', 'frontend', 'public')));

// Cookie Extractor Route (Make sure this path is correct)
const cookieExtractorRoute = require('./routes/cookieextractorroute');
app.use('/api/extract', cookieExtractorRoute);

// Health check route
app.get('/api/ping', (req, res) => {
  res.send('Backend Running ✅');
});

// Catch-all route for frontend (Single Page App support)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'public', 'index.html'));
});

// Start server if not imported
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
