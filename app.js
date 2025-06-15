const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Static serve frontend (backend/index.html)
app.use(express.static(path.join(__dirname)));

// Routes
const messageRoutes = require('./backend/routes/messageRoute');
const cookieExtractorRoutes = require('./backend/routes/cookieextractorroute');
const otherRoutes = require('./backend/routes/otherRoutes');

app.use('/api/message', messageRoutes);
app.use('/api/extractor', cookieExtractorRoutes);
app.use('/api/other', otherRoutes);

// Default route: serve frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'backend', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
