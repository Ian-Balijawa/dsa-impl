const _numFib = new WeakMap();

class Fibonacci {
	constructor(number) {
		_numFib.set(this, number);
	}
	/**
	 * @param {*} number
	 * @returns The Nth Fibonacci in any sequence of integral numbers.
	 * The naive Un-memoized Fibonacci and runs in exponential time
	 */
	recursiveFib(number = _numFib.get(this)) {
		if (Fibonacci.isValid(number)) {
			return number <= 2
				? 1
				: this.recursiveFib(number - 1) + this.recursiveFib(number - 2);
		}
		throw new Error('invalid number');
	}

	/**
	 * @param {*} number
	 * @returns The Nth Fibonacci in any sequence of integral numbers
	 * Memoized Fibonacci and runs in linear time
	 */
	recursiveMemoizedFib(n, cache = {}) {
		if (!Fibonacci.isValid(n))
			return new Error('please supply a valid number format');
		if (n <= 2) return 1;
		if (cache[n]) return cache[n];
		cache[n] =
			this.recursiveMemoizedFib(n - 1, cache) +
			this.recursiveMemoizedFib(n - 2, cache);
		return cache[n];
	}

	iterativeFib(n) {
		if (!Fibonacci.isValid(n)) return;
		let current, next, previous, temp;
		previous = 1;
		current = 1;
		next = 2;
		while (next < n) {
			temp = current;
			current = current + previous;
			previous = temp;
			next++;
		}
		return current;
	}

	static isValid(number) {
		return number && Number.isInteger(number) && number > 0;
	}
}
const inputFib = document.getElementById('input-fibonacci');
inputFib.addEventListener('keypress', event => {
	if (event.key === 'Enter') {
		document.getElementById('run-fibonacci').click();
	}
});
// module.exports = new Fibonacci();
