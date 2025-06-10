const express = require('express');
const app = express();
const cors = require('cors');
const fileUpload = require('express-fileupload');
const path = require('path');

// Middlewares
app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));

// Serve frontend (optional, if you have index.html)
app.use(express.static(path.join(__dirname, '../frontend')));

// Routes
const cookieExtractorRoute = require('./routes/cookieextractorroute');
const messageRoute = require('./routes/messageRoute');
const mediaRoute = require('./routes/mediaCommand');
const helpRoute = require('./routes/helpCommand');

// Mount routes
app.use('/api/extractor', cookieExtractorRoute);
app.use('/api/send', messageRoute);
app.use('/api/media', mediaRoute);
app.use('/api/help', helpRoute);

// Root redirect to frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// ✅ Listen on dynamic port (Render requires this)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 SBR-BOT backend running on port ${PORT}`);
});
