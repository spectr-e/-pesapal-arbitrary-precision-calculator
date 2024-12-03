const prompt = require("prompt-sync")({sigint: true})

function add(a, b) {
	let result = []
	let carry = 0
	let i = a.length - 1
	let j = b.length - 1

	while (i >= 0 || j >= 0 || carry) {
		let sum = carry
		if (i >= 0) sum += a[i--]
		if (j >= 0) sum += b[j--]
		result.push(sum % 10)
		carry = Math.floor(sum / 10)
	}

	return result.reverse()
}

function compare(a, b) {
	if (a.length !== b.length) {
		return a.length > b.length ? 1 : -1
	}
	for (let i = 0; i < a.length; i++) {
		if (a[i] !== b[i]) {
			return a[i] > b[i] ? 1 : -1
		}
	}
	return 0
}

function makeFirstNumberNegative(arr) {
	for (let i = 0; i < arr.length; i++) {
		if (typeof arr[i] === "number") {
			arr[i] = arr[i] > 0 ? -arr[i] : arr[i] // Make negative if positive
			return arr // Return the modified array
		}
	}
	return arr // Return unmodified array if no number found
}

// take an expression as input
const input = prompt("Enter two numbers seperated by a space (or 'exit'):")
// place the two inputs into seperate variables
const [a, b] = input.split(" ")
// convert the inputs into arrays of digits
// This parseInt() approach is necessary because it will remove any leading zeros from the input, which might affect the correctness of the arithmetic operations.
const digitA = parseInt(a).toString().split("").map(Number)
const digitB = parseInt(b).toString().split("").map(Number)
// solve the expression
const diff = subtract(digitA, digitB)
// convert the result back into a string and remove any leading zeros
const answer = parseInt(diff.join(""), 10)
console.log({answer})
