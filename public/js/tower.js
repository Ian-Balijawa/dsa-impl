var $columns = $('.col');
var $winningColumns = $('.c3');
var $rings;
var $c1 = $('.c1');
var $c2 = $('.c2');
var $moves = $('.moves');
var $reset = $('#reset');
var $levelButton = $('#levelButton');
var $arrows = $('.arrow');
var $btnPlay = $('.btn-play');

var game = {
	rings: 4,
	moves: 0,
	active: false,
	originCol: {},
	targetCol: {},
	moverId: 0,
	targetId: 0,
	over: true,
	registerEvents: function () {
		// clicking on a column
		$columns.on('click', function () {
			if (!game.over) {
				game.click($(this));
			}
		});

		// hovering over a column
		$('.col').mouseenter(function () {
			if (!game.active) {
				$(this).children('.ring').eq(0).addClass('hover');
			} else {
				game.moveRing($(this));
			}
		});

		// leaving a column
		$('.col').mouseleave(function () {
			$(this).children('.ring').eq(0).removeClass('hover');
		});

		// clicking pick level
		$levelButton.on('click', function () {
			game.displayLevelSelector();
		});

		// clicking reset
		$reset.on('click', function () {
			game.reset();
		});

		// clicking level-select arrows
		$c2.on('click', '.arrow', function () {
			game.selectLevel($(this));
		});
	},
	click: function (clicked) {
		clickedRing = clicked.children('.ring').eq(0);
		if (!this.active) {
			// if a ring is NOT already selected...
			this.originCol = clicked;
			clickedRing.addClass('active');
			this.moverId = parseInt(clickedRing.attr('id'));
			this.active = true;
		} else if (this.checkMove(clicked)) {
			// if a ring IS selected, handle moving a ring
			game.moveRing(clicked);
			this.softReset();
			this.incrementCounter();
			this.checkWin();
		}
	},
	checkMove: function (target) {
		this.targetCol = target;
		// select eq(1) because we need to ignore the floating ring
		targetRing = target.children().eq(1);
		this.targetId = targetRing.hasClass('ring')
			? parseInt(targetRing.attr('id'))
			: -100;
		if (this.originCol.attr('class') == this.targetCol.attr('class')) {
			// SAME SPACE
			this.softReset();
			return false;
		} else if (this.moverId > this.targetId) {
			// LEGAL MOVE
			return true;
		} else {
			// ILLEGAL MOVE
			game.targetCol = game.originCol;
			this.rumble();
			return false;
		}
	},
	rumble: function () {
		$('.active').addClass('rumble');
		$columns.on('animationend', '.rumble', function () {
			$(this).removeClass('rumble');
		});
	},
	moveRing: function (destination) {
		$('.active').prependTo(destination);
	},
	incrementCounter: function () {
		this.moves++;
		$moves.html('Moves Played: ' + this.moves);
	},
	softReset: function () {
		this.active = false;
		$rings.removeClass('active hover');
	},
	checkWin: function () {
		$winningColumns.each(function (column) {
			if ($(this).children().length == game.rings) {
				game.gameOver();
				return false;
			}
		});
	},
	gameOver: function () {
		this.over = true;
		var perfect = Math.pow(2, this.rings) - 1;
		$('.c2').prepend("<div class='gameOver report'></div>");
		$('.c2').prepend("<div class='gameOver big'>WIN!!</div>");
		$('.report').html(
			'<p>Your moves: ' +
				this.moves +
				'</p><p>Expected Moves: ' +
				perfect +
				'</p'
		);
	},
	reset: function () {
		// this will be better when I can just make another instance with a constructor function, right?
		$columns.children().remove();
		this.generateRings(this.rings);
		this.over = false;
		this.softReset();
		this.moves = 0;
		this.moverId = 0;
		this.targetId = 0;
		this.targetCol = {};
		this.originCol = {};
		$moves.html('MOVES: ' + this.moves);
		$reset.html('RESET');
		$('.level-select').remove();
		$('.gameOver').remove();
		$levelButton.show();
	},
	selectLevel: function (arrow) {
		var $level = $('.level');
		if (arrow.hasClass('left')) {
			if (this.rings > 3) {
				this.rings--;
			}
		} else if (this.rings < 15) {
			this.rings++;
		}
		$level.html(this.rings);
		this.generateRings(this.rings);
	},
	displayLevelSelector: function () {
		$reset.html('START');
		$levelButton.hide();
		this.over = true;
		var $levelSelect = $(
			`<div class='level-select'><div class='level-select-box'><p class='arrow left'>-</p><div class='level'></div><p class='arrow right'>+</p></div></div>`
		);
		$columns.children().remove();
		$btnPlay.append($levelSelect);
		$('.level').html(this.rings);
		this.generateRings(this.rings);
	},
	generateRings: function (n) {
		$c1.children().remove();
		// this.rings = n;
		var multiplier = 1 / n;
		var width;
		for (var i = 0; i < n; i++) {
			width = 100 - i * multiplier * 100 + '%';
			$c1.prepend('<div class="ring"></div>');
			$c1.children()
				.eq(0)
				.attr('id', i + 1);
			$c1.children().eq(0).css('width', width);
		}
		// reset this variable to account for all rings
		$rings = $('.ring');
		// hard code height of all rings to flex doesn't mess with really tall towers
		$rings.height($rings.height());
	},
};

game.registerEvents();
game.displayLevelSelector();
