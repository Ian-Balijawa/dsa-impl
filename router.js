const router = require('express').Router();

// index route
router.get('/', function (req, res) {
	return res.render('index', { title: 'Welcome' });
});

// linked lists
router.get('/linkedlists', function (req, res) {
	return res.render('linkedlists', {
		title: 'Linked Lists',
		topics: [{ value: 'Linked Lists' }],
	});
});

// stacks
router.get('/stacks', function (req, res) {
	return res.render('stacks', { title: 'Stacks' });
});

// queues
router.get('/queues', function (req, res) {
	return res.render('queues', { title: 'Queues' });
});

//Fibonacci
router.get('/factorial&fibonacci', function (req, res) {
	return res.render('fibonacci', { title: 'Fibonacci' });
});

//tower of hanoi
router.get('/tower', function (req, res) {
	return res.render('tower', { title: 'Tower OF Hanoi' });
});

module.exports = router;
