// const Stack = require('./code/Stack/Stack');

$(document).ready(function () {
	// code operations
	// running the factorial function

	$('#run-factorial').click(function () {
		let input = $('#input-factorial').val();
		let output = new Factorial().iterativeFactorial(Number(input));
		$('#input-factorial').val('');
		$('#output-factorial').text(output).show(100);
	});

	//   running the fibonacci
	$('#run-fibonacci').click(() => {
		let input = $('#input-fibonacci').val();
		let output = new Fibonacci().recursiveMemoizedFib(Number(input));
		$('#input-fibonacci').val('');
		$('#output-fibonacci').text(output).show(100);
	});

	//  =================== STACKS ===================================

	//   create a new stack
	let input;
	$('#run-create-stack').click(() => {
		input = $('#input-create-stack').val();
		$('#output-create-stack')
			.text(`Stack of size ${input} element(s)`)
			.show(100);
		$('#input-create-stack').val('');
	});

	let stack = new Stack(input);
	//   push element to the stack
	let pushInput;
	$('#run-push').click(() => {
		pushInput = $('#input-push').val();

		stack.push(pushInput);
		$('#output-push')
			.text(`${pushInput} has been added to the Stack`)
			.show(100);
		$('#input-push').val('');
	});

	//   pop element off the stack
	$('#run-pop').click(() => {
		const lastIn = stack.pop();
		$('#output-pop').text(`Stack of size ${stack.size}`).show(100);
		$('#output-pop')
			.text(`${lastIn} has been popped off from the Stack`)
			.show(100);
		// $('#output-pop').text(error.message).show(100);
	});

	//   peek element off the stack
	$('#run-peek').click(() => {
		let output = stack.peek();
		$('#output-peek').text(output).show(100);
	});
	//  =================== STACKS ===================================

	// =================== LINKED LISTS =========================

	// create new linked list
	let SLL = new SinglyLinkedList();
	let DLL = new DoublyLinkedList();

	// add element to the front
	$('#run-add-first-sll').click(() => {
		let input = $('#input-add-first-sll').val();
		let output = SLL.addFirst(input);
		$('#output-add-first-sll').text(output.toString()).show(100);
		$('#input-add-first-sll').val('');
	});

	// add element to the end of the Singly Linked List
	$('#run-add-last').click(() => {
		let input = $('#input-add-last').val();
		SLL.addLast(input);
		$('#output-add-last').text(SLL.toString()).show(100);
		$('#input-add-last').val('');
	});

	// delete an element
	$('#run-delete').click(() => {
		let input = $('#input-delete').val();
		let output = SLL.delete(input);
		output = output === null ? "Element doesn't exist" : output;
		$('#output-delete').text(output).show(100);
		$('#input-delete').val('');
	});

	// find an element
	$('#run-find').click(() => {
		let input = $('#input-find').val();
		let output = SLL.find(input);
		output = output === null ? "Element doesn't exist" : output;
		$('#output-find').text(output).show(100);
		$('#input-find').val('');
	});

	//  delete tail element
	$('#run-delete-tail').click(() => {
		let output =
			SLL.deleteTail() === null ? 'list already empty' : SLL.deleteTail();
		$('#output-delete-tail').text(output).show(100);
		$('#input-delete-tail').val('');
	});

	//  delete head element
	$('#run-delete-head').click(() => {
		let output = SLL.deleteHead();
		$('#output-delete-head').text(output).show(100);
		$('#input-delete-head').val('');
	});

	// doubly linked lists operations

	// add element to the front of the Doubly Linked List
	$('#run-add-first-dll').click(() => {
		let input = $('#input-add-first-dll').val();
		let output = DLL.addFirst(input);
		$('#output-add-first-dll').text(output).show(100);
		$('#input-add-first-dll').val('');
	});

	// add element to the end of the Doubly Linked List
	$('#run-add-last-dll').click(() => {
		let input = $('#input-add-last-dll').val();
		let output = DLL.addLast(input);
		$('#output-add-last-dll').text(output).show(100);
		$('#input-add-last-dll').val('');
	});

	// delete an elementfrom Doubly Linked
	$('#run-delete-dll').click(() => {
		let input = $('#input-delete-dll').val();
		let output = DLL.delete(input);
		output = output != null ? output : "Element doesn't exist";
		$('#output-delete-dll').text(output).show(100);
		$('#input-delete-dll').val('');
	});

	// ====================== Queues==================
	var queue;
	// create a new queue
	$('#run-create-queue').click(() => {
		let input = $('#input-create-queue').val();
		queue = new Queue(input);
		$('#output-create-queue')
			.text(`Queue of size ${queue.size} element(s)`)
			.show(100);
	});

	//   enqueue element to the queue
	$('#run-enqueue').click(() => {
		try {
			let input = $('#input-enqueue').val();
			queue.enqueue(input);
			$('#output-enqueue')
				.text(`${input} has been added to the queue`)
				.show(100);
		} catch (error) {
			// FIXME
			$('#output-enqueue').text(error.message).show(100);
		} finally {
			$('#input-enqueue').val('');
		}
	});

	//   dequeue element to the queue
	$('#run-dequeue').click(() => {
		try {
			let output = queue.dequeue();
			$('#output-dequeue').text(output).show(100);
		} catch (error) {
			$('#output-dequeue').text(error.message).show(100);
		} finally {
			$('#input-dequeue').val('');
		}
	});

	// create a new circular-queue
	var circularQueue;
	$('#run-create-circular-queue').click(() => {
		let input = $('#input-create-circular-queue').val();
		circularQueue = new CircularQueue(input);
		$('#output-create-circular-queue')
			.text(`Circular Queue of size ${circularQueue.size} element(s)`)
			.show(100);
	});

	//   add first element to the circular queue
	$('#run-add-first').click(() => {
		try {
			let input = $('#input-add-first').val();
			let output = circularQueue.addFirst(input);
			$('#output-add-first').text(output).show(100);
		} catch (error) {
			$('#output-add-first').text(error.message).show(100);
		} finally {
			$('#input-add-first').val('');
		}
	});

	//   remove last element of the circular queue
	$('#run-remove-last').click(() => {
		try {
			let output = circularQueue.removeLast();
			$('#output-remove-last').text(output).show(100);
		} catch (error) {
			$('#output-remove-last').text(error.message).show(100);
		} finally {
			$('#input-remove-last').val('');
		}
	});
});
