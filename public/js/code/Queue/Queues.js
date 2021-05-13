const _list = new WeakMap();

class Queue {
	constructor(size = 0) {
		_list.set(this, []);
		this.size = size;
		this.numberOfElements = 0;
	}

	enqueue(element) {
		if (element && !this.isFull()) {
			_list.get(this).push(element);
			this.numberOfElements++;
		} else {
			throw new Error('Queue is already Full. Cannot add more elements');
		}
	}

	dequeue() {
		if (!this.isEmpty()) this.numberOfElements--;
		return _list.get(this).shift();
	}

	getSize() {
		return this.size;
	}

	isEmpty() {
		return _list.get(this).length === 0;
	}

	isFull() {
		return _list.get(this).length === this.size;
	}

	getAllElements() {
		const listToBeReturnedToClient = [..._list.get(this)];
		return listToBeReturnedToClient;
	}
}

class CircularQueue extends Queue {
	constructor(size) {
		super(size);
	}

	addFirst(element) {
		if (!this.isFull()) {
			return this.getAllElements().unshift(element);
		}
	}

	removeLast() {
		return this.getAllElements().pop();
	}
}
