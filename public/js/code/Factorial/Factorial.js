const _numFact = new WeakMap();

class Factorial {
	constructor(number) {
		_numFact.set(this, number);
		this.number = _numFact.get(this);
	}
	/** This is a recursive Factorial method, an alternative to iteration
	 * @param {*} number A positive argument should be supplied
	 * @returns  The Factorial of a number supplied as an argument
	 */
	recursiveFactorial(number = _numFact.get(this)) {
		if (Factorial.isValid(number)) {
			return number === 1
				? 1
				: number * this.recursiveFactorial(number - 1);
		}
		return new Error('please supply a valid Number format');
	}

	/**
	 * This is an iterative Factorial function, an alternative to recursion
	 * @param {*} number
	 * @returns The Factorial of the @param number supplied as an argument
	 * This iterative function has both Time complexity and Space complexity of O(N)
	 */

	iterativeFactorial(number = _numFact.get(this)) {
		if (Factorial.isValid(number)) {
			let Nfactorial = 1;
			for (let i = number; i >= 1; i--) Nfactorial *= i;
			return Nfactorial;
		}
		return new Error('please supply a valid Number format');
	}

	//The number supplied should in addition to being (obviously) a Number, must also a positive isInteger
	static isValid(number) {
		return Number.isInteger(number) && number >= 0 && number;
	}
}

const inputFactorial = document.getElementById('input-factorial');
inputFactorial.addEventListener('keypress', event => {
	if (event.key === 'Enter') {
		document.getElementById('run-factorial').click();
	}
});

// module.exports = new Factorial();
// module.exports = Factorial;
