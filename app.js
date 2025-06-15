// app.js (root)
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

const cookieExtractorRoute = require('./backend/routes/cookieextractorroute');
const messageRoute = require('./backend/routes/messageRoute');
const sendRoute = require('./backend/routes/sendRoute');
const otherRoutes = require('./backend/routes/otherRoutes');
const botHandler = require('./botHandler');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static frontend from backend/public
app.use(express.static(path.join(__dirname, 'backend/public')));

// Routes
app.use('/cookie-extractor', cookieExtractorRoute);
app.use('/message', messageRoute);
app.use('/send', sendRoute);
app.use('/other', otherRoutes);
app.use('/bot', botHandler);

// Fallback: index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'backend/public/index.html'));
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
