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

// take an expression as input
const input = prompt("Enter two numbers seperated by a space (or 'exit'):")
// place the two inputs into seperate variables
const [a, b] = input.split(" ")
// convert the inputs into arrays of digits
// This parseInt() approach is necessary because it will remove any leading zeros from the input, which might affect the correctness of the arithmetic operations.
const digitA = parseInt(a).toString().split("").map(Number)
const digitB = parseInt(b).toString().split("").map(Number)
// perform the addition
const sum = add(digitA, digitB)
// convert the result back into a string and remove any leading zeros
const answer = parseInt(sum.join(""), 10)
console.log({answer})
console.log({result: add([1, 2, 3], [4, 5, 6])})
