const path = require('path');
const express = require('express');
const hbs = require('express-handlebars');
const router = require('./router');

const app = express();

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`listening on port ${port}...`);
});

// middleware
app.use(express.static(path.join(__dirname, 'public')));
app.engine(
	'hbs',
	hbs({
		extname: 'hbs',
		layoutsDir: path.join(__dirname, 'views', 'layouts'),
		defaultLayout: 'layout',
		partialsDir: path.join(__dirname, 'views', 'partials'),
	})
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// routes
app.use('/', router);
