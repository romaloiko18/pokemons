require('dotenv').config();
require('./db');
const AuthRoute = require('./routes/auth');
const UserRoute = require('./routes/user');
const ProjectRoute = require('./routes/project');
const TicketRoute = require('./routes/titcket');

const compression = require('compression');
const cors = require('cors');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(compression());
app.use(cors());
app.use(express.json());

app.use('/auth', AuthRoute);
app.use('/user', UserRoute);
app.use('/project', ProjectRoute);
app.use('/ticket', TicketRoute);

app.get('/app', (req, res) => {
  res.json({ success: true, message: 'Success' });
});

app.listen(PORT, () => console.log('Server is running', PORT));
