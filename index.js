const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
const path = require('path');

const ERROR_HANDLER = require('./error_handler/error-handler');
const APP_ERROR = require('./error_handler/app-error');

const projectRouters = require('./routes/projects-route');
const blogRouters = require('./routes/blogs-route');
const socialRouters = require('./routes/social-route');
const tagsRouters = require('./routes/tags-route');
const topicRouters = require('./routes/topic-route');
const moduleRouters = require('./routes/modules.route');

// Middlewares
const corsOptions = {
	origin: '*',
	credentials: true, //access-control-allow-credentials:true
	optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'), { index: false }));

// Routes
app.use('/api', projectRouters);
app.use('/api', blogRouters);
app.use('/api', socialRouters);
app.use('/api', tagsRouters);
app.use('/api', topicRouters);
app.use('/api', moduleRouters);

app.all('*', (req, res, next) => {
	next(new APP_ERROR(`Cant find ${req.originalUrl} on this server`, 404));
});

app.use(ERROR_HANDLER);

module.exports = app;
