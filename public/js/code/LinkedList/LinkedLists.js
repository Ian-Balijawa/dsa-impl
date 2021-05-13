class Comparator {
	/**
	 * @param {function(a: *, b: *)} [compareFunction] - It may be custom compare function that, let's
	 * say may compare custom objects together.
	 */
	constructor(compareFunction) {
		this.compare = compareFunction || Comparator.defaultCompareFunction;
	}

	/**
	 * Default comparison function. It just assumes that "a" and "b" are strings or numbers.
	 * @param {(string|number)} a
	 * @param {(string|number)} b
	 * @returns {number}
	 */
	static defaultCompareFunction(a, b) {
		if (a === b) return 0;

		return a < b ? -1 : 1;
	}

	/**
	 * Checks if two variables are equal.
	 * @param {*} a
	 * @param {*} b
	 * @return {boolean}
	 */
	equal(a, b) {
		return this.compare(a, b) === 0;
	}

	/**
	 * Checks if variable "a" is less than "b".
	 * @param {*} a
	 * @param {*} b
	 * @return {boolean}
	 */
	lessThan(a, b) {
		return this.compare(a, b) < 0;
	}

	/**
	 * Checks if variable "a" is greater than "b".
	 * @param {*} a
	 * @param {*} b
	 * @return {boolean}
	 */
	greaterThan(a, b) {
		return this.compare(a, b) > 0;
	}

	/**
	 * Checks if variable "a" is less than or equal to "b".
	 * @param {*} a
	 * @param {*} b
	 * @return {boolean}
	 */
	lessThanOrEqual(a, b) {
		return this.lessThan(a, b) || this.equal(a, b);
	}

	/**
	 * Checks if variable "a" is greater than or equal to "b".
	 * @param {*} a
	 * @param {*} b
	 * @return {boolean}
	 */
	greaterThanOrEqual(a, b) {
		return this.greaterThan(a, b) || this.equal(a, b);
	}

	/**
	 * Reverses the comparison order.
	 */
	reverse() {
		const compareOriginal = this.compare;
		this.compare = (a, b) => compareOriginal(b, a);
	}
}
// ==============================================================
// ==============================================================

// NODE  for singly linked list =================================
// NODE  for singly linked list =================================
// NODE  for singly linked list =================================
// NODE  for singly linked list =================================
// NODE  for singly linked list =================================
// NODE  for singly linked list =================================
// NODE  for singly linked list =================================
// NODE  for singly linked list =================================
// NODE  for singly linked list =================================
class SinglyLinkedListNode {
	constructor(value, next = null) {
		this.value = value;
		this.next = next;
	}
	/**
	 *
	 * @param {Function} callback callback function used to represent the node as a string
	 * @return The string representation of a Node according to the callback provided as an argument
	 */
	toString(callback) {
		return callback ? callback(this.value) : `${this.value}`;
	}
	/**
	 * @return the String representation of a Node
	 */
	toString() {
		return `Node =  ${this.value}`;
	}

	/**
	 * @return True whelther two nodes are equal to each other
	 *@param {SinglyLinkedListNode} other the node being compared to
	 *
	 */
	equals(other) {
		return this.value === other.value ? true : false;
	}
}

class DoublyLinkedListNode extends SinglyLinkedListNode {
	constructor(value, next = null, previous = null) {
		super(value, next, previous);
		this.next = this.previous = null;
	}
}

// SINGLY LINKED LISTS ==================================
// SINGLY LINKED LISTS ==================================
// SINGLY LINKED LISTS ==================================
// SINGLY LINKED LISTS ==================================
// SINGLY LINKED LISTS ==================================
// SINGLY LINKED LISTS ==================================

class SinglyLinkedList {
	/**
	 * @param {Function} [comparatorFunction] as a callback
	 */
	constructor(comparatorFunction) {
		/** @var SinglyLinkedListNode */
		this.head = null;

		/** @var SinglyLinkedListNode */
		this.tail = null;

		this.compare = new Comparator(comparatorFunction);
	}

	/**
	 * @param {*} value
	 * @return {SinglyLinkedList}
	 */
	addFirst(value) {
		if (!value) return;

		const newNode = new SinglyLinkedListNode(value, this.head);
		if (!(this.head && this.tail)) {
			this.head = this.tail = newNode;
			console.log('added ', value);
			return this;
		}

		let tmp = this.head;
		newNode.next = tmp;
		this.head = newNode;
		console.log('added ', value);

		return this;
	}

	/**
	 * @param {*} value
	 * @return {SinglyLinkedList}
	 */
	addLast(value) {
		if (!value) return;
		const newNode = new SinglyLinkedListNode(value);

		// If there is no head yet let's make new node a head.
		if (!this.head) {
			this.head = newNode;
			this.tail = newNode;

			return this;
		}

		// Attach new node to the end of linked list.
		this.tail.next = newNode;
		this.tail = newNode;

		return this;
	}

	/**
	 * @param {*} value The value specifying the target node to be deleted
	 * @return {LinkedListNode} the node that was deleted
	 */
	delete(value) {
		if (!this.head) return null;

		let deletedNode = null;

		// If the head must be deleted then make next node that is differ
		// from the head to be a new head.
		while (this.head && this.compare.equal(this.head.value, value)) {
			deletedNode = this.head;
			this.head = this.head.next;
		}

		let currentNode = this.head;

		if (currentNode !== null) {
			// If next node must be deleted then make next node to be a next next one.
			while (currentNode.next) {
				if (this.compare.equal(currentNode.next.value, value)) {
					deletedNode = currentNode.next;
					currentNode.next = currentNode.next.next;
				} else {
					currentNode = currentNode.next;
				}
			}
		}

		// Check if tail must be deleted.
		if (this.compare.equal(this.tail.value, value)) {
			this.tail = currentNode;
		}

		return deletedNode;
	}

	/**
	 * @param {Object} findParams node value and a predicate function
	 * @param {*} findParams.value the value of a node being specified
	 * @param {function} [findParams.callback]
	 * @return {LinkedListNode} The node whose value if being sought and null if no such node exists
	 */
	find(value = undefined, callback = undefined) {
		if (!this.head) {
			return null;
		}

		let currentNode = this.head;

		while (currentNode) {
			// If callback is specified then try to find node by callback.
			if (callback && callback(currentNode.value)) {
				return currentNode;
			}

			// If value is specified then try to compare by value..
			if (
				value !== undefined &&
				this.compare.equal(currentNode.value, value)
			) {
				return currentNode;
			}

			currentNode = currentNode.next;
		}

		return null;
	}

	/**Equivalent to removing Last on dequeue data structure
	 * or the  pop method of the stack and queue
	 * @return {LinkedListNode}
	 */
	deleteTail() {
		const deletedTail = this.tail;

		if (this.head === this.tail) {
			// There is only one node in linked list.
			this.head = null;
			this.tail = null;

			return deletedTail;
		}

		// If there are many nodes in linked list...

		// Rewind to the last node and delete "next" link for the node before the last one.
		let currentNode = this.head;
		while (currentNode.next) {
			if (!currentNode.next.next) {
				currentNode.next = null;
			} else {
				currentNode = currentNode.next;
			}
		}

		this.tail = currentNode;

		return deletedTail;
	}

	/**
	 * This works just like the dequeue of a queue data structure
	 * by removing and returning the first element or node of the LinkedList
	 * some books call it the remove first method
	 * @return {LinkedListNode} head that was removed
	 */
	deleteHead() {
		if (!this.head) {
			return null;
		}

		const deletedHead = this.head;

		if (this.head.next) {
			this.head = this.head.next;
		} else {
			this.head = null;
			this.tail = null;
		}

		return deletedHead;
	}

	/**
	 * @param {*[]} values - Array of values that need to be converted to linked list.
	 * @return {SinglyLinkedList}
	 */
	fromArray(values) {
		values.forEach(value => this.addLast(value));

		return this;
	}

	/**
	 * @return {LinkedListNode[]}
	 */
	toArray() {
		const nodes = [];

		let currentNode = this.head;
		while (currentNode) {
			nodes.push(currentNode);
			currentNode = currentNode.next;
		}

		return nodes;
	}

	/**
	 * @param {function} [callback]
	 * @return {string}
	 */
	toString(callback) {
		return this.toArray()
			.map(node => node.toString(callback))
			.toString();
	}

	/**
	 * Reverse a linked list.
	 * @returns {SinglyLinkedList}
	 */
	reverse() {
		let currNode = this.head;
		let prevNode = null;
		let nextNode = null;

		while (currNode) {
			// Store next node.
			nextNode = currNode.next;

			// Change next node of the current node so it would link to previous node.
			currNode.next = prevNode;

			// Move prevNode and currNode nodes one step forward.
			prevNode = currNode;
			currNode = nextNode;
		}

		// Reset head and tail.
		this.tail = this.head;
		this.head = prevNode;

		return this;
	}
}

// DOUBLY LINKED LIST ====================================
// DOUBLY LINKED LIST ====================================
// DOUBLY LINKED LIST ====================================
// DOUBLY LINKED LIST ====================================
// DOUBLY LINKED LIST ====================================
// DOUBLY LINKED LIST ====================================
// DOUBLY LINKED LIST ====================================
// DOUBLY LINKED LIST ====================================

class DoublyLinkedList extends SinglyLinkedList {
	/**
		 super(comparatorFunction);
		 * @param {Function} [comparatorFunction] passed in as a callback
		 */
	constructor(comparatorFunction) {
		super(comparatorFunction);
		this.compare = new Comparator(comparatorFunction);
	}

	/**
	 * @param {*} value
	 * @return {DoublyLinkedList}
	 */
	addFirst(value) {
		if (!value) return;
		// Make new node to be a head.
		const newNode = new DoublyLinkedListNode(value);

		// assuming that the head and the tail coexist together. If one is null, the other must also be null.
		if (!(this.head && this.tail)) {
			this.head = this.tail = newNode;
			newNode.next = null;
			newNode.previous = null;
			return this;
		}

		let firstNode = this.head;
		newNode.next = firstNode;
		this.head = newNode;

		return this;
	}

	/**
	 * @param {*} value
	 * @return {SinglyLinkedList}
	 */
	addLast(value) {
		if (!value) return;
		const newNode = new DoublyLinkedListNode(value);

		// If there is no head yet let's make new node a head.
		if (!this.head) {
			this.head = newNode;
			this.tail = newNode;

			return this;
		}

		// Attach new node to the end of linked list.
		let currentNode = this.head;
		let previousNode = null;
		while (currentNode) {
			previousNode = currentNode;
			currentNode = currentNode.next;
		}

		previousNode.next = newNode;
		newNode.previous = previousNode;

		return this;
	}

	/**
	 * @param {*} value The value specifying the target node to be deleted
	 * @return {LinkedListNode} the node that was deleted
	 */
	delete(value) {
		if (!value) return;
		if (!this.head) return null;

		let deletedNode = null;

		// If the head must be deleted then make next node that is differ
		// from the head to be a new head.
		if (this.head && this.compare.equal(this.head.value, value)) {
			deletedNode = this.head;
			this.head = this.head.next;

			return deletedNode;
		}

		let currentNode = this.head;

		if (currentNode !== null) {
			// If next node must be deleted then make next node to be a next next one.
			while (currentNode.next) {
				if (this.compare.equal(currentNode.next.value, value)) {
					deletedNode = currentNode.next;
					currentNode.next = currentNode.next.next;
					currentNode.previous = deletedNode.previous;
				} else {
					currentNode = currentNode.next;
				}
			}
		}

		// Check if tail must be deleted.
		if (this.compare.equal(this.tail.value, value)) {
			this.tail = currentNode;
		}

		return deletedNode;
	}
}

// const inputDelete = document.getElementById('input-delete');
// inputAddFirstSLL.addEventListener('keypress', event => {
// 	if (event.key === 'Enter') {
// 		document.getElementById('run-delete').click();
// 	}
// });

// const inputFind = document.getElementById('input-find');
// inputAddFirstSLL.addEventListener('keypress', event => {
// 	if (event.key === 'Enter') {
// 		document.getElementById('run-find').click();
// 	}
// });
