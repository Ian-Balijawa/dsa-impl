const _list_ = new WeakMap();

class Stack {
	constructor(initialSize) {
		_list_.set(this, []);
		this.size = initialSize;
	}
	push(value) {
		// if (!value) throw new Error('Invalid argument(s) passed!');
		if (_list_.get(this).length === this.size) {
			throw new Error(
				'StackOverFlow Operation. Cannot push to an already full stack'
			);
		}
		_list_.get(this).push(value);
	}

	peek() {
		return this.isEmpty()
			? null
			: _list_.get(this)[_list_.get(this).length - 1];
	}

	pop() {
		if (!this.isEmpty()) {
			let length = _list_.get(this).length;
			const topElement = _list_.get(this)[length - 1];
			// _list_.get(this).splice(_list_.get(this).length - 1);
			_list_.get(this).length--;
			return topElement;
		}
		throw new Error('StackUnderflow! cannot pop from an empty stack');
	}

	isFull() {
		return _list_.get(this).length === this.size;
	}

	isEmpty() {
		return _list_.get(this).length === 0;
	}

	getSizeOfList() {
		const length = _list_.get(this).length;
		return length;
	}
	toString() {
		let string = '';
		for (let i = 0; i < _list_.get(this).length; i++) {
			string += _list_.get(this)[i] + ' ';
		}

		return string;
	}
	getAllElements() {
		const list = _list_.get(this);
		return list;
	}
}
const inputCreateStack = document.getElementById('input-create-stack');
inputCreateStack.addEventListener('keypress', event => {
	if (event.key === 'Enter') {
		document.getElementById('run-create-stack').click();
	}
});

const inputPush = document.getElementById('input-push');
inputPush.addEventListener('keypress', event => {
	if (event.key === 'Enter') {
		document.getElementById('run-push').click();
	}
});
