// app.js (in root)

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Static frontend
app.use(express.static(path.join(__dirname, 'frontend')));

// Routes
const messageRoute = require('./backend/routes/messageRoute');
const sendRoute = require('./backend/routes/sendRoute');
const cookieExtractorRoute = require('./backend/routes/cookieExtractorRoute');
const otherRoutes = require('./backend/routes/otherRoutes');
const botHandler = require('./backend/botHandler');

// Route Bindings
app.use('/api/message', messageRoute);
app.use('/api/send', sendRoute);
app.use('/api/cookie-extractor', cookieExtractorRoute);
app.use('/api/other', otherRoutes);
app.use('/api/bot', botHandler);

// Serve index.html for frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
