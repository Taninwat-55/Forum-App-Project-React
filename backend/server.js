const express = require('express');
const cors = require('cors');
const path = require('path');
const threadRoutes = require('./routes/threads2');
const replyRoutes = require('./routes/replies2');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/threads', threadRoutes);
app.use('/api/replies', replyRoutes);

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
