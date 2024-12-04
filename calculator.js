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

function subtract(a, b) {
	// Compare a and b to determine which is larger
	const isNegative = compare(a, b) < 0 // Result is negative if a < b

	// Ensure we always subtract the smaller number from the larger number
	const larger = isNegative ? b : a
	const smaller = isNegative ? a : b

	let result = []
	let borrow = 0
	let i = larger.length - 1
	let j = smaller.length - 1

	// Subtraction loop
	while (i >= 0 || j >= 0) {
		let diff = (i >= 0 ? larger[i--] : 0) - borrow
		if (j >= 0) diff -= smaller[j--]

		if (diff < 0) {
			diff += 10
			borrow = 1
		} else {
			borrow = 0
		}
		result.push(diff)
	}

	// Remove leading zeros
	while (result.length > 1 && result[result.length - 1] === 0) {
		result.pop()
	}

	// Reverse the result array and return with the appropriate sign
	result.reverse()
	return isNegative ? makeFirstNumberNegative(result) : result
}

function multiply(a, b) {
	const indexA = a.length - 1
	const indexB = b.length - 1
	let result = Array(a.length + b.length).fill(0)

	for (let i = indexA; i >= 0; i--) {
		for (let j = indexB; j >= 0; j--) {
			let product = a[i] * b[j]
			let p1 = i + j // carry position
			let p2 = p1 + 1 // current digit position
			let sum = product + result[p2]

			result[p1] += Math.floor(sum / 10)
			result[p2] = sum % 10
		}
	}
	while (result.length > 1 && result[0] === 0) {
		result.shift()
	}

	return result
}

function divide(a, b) {
	if (b.every((digit) => digit === 0)) {
		throw new Error("Division by zero")
	}

	let result = []
	let current = []

	for (let i = 0; i < a.length; i++) {
		current.push(a[i])
		console.log({current})
		let count = 0
		console.log({comparison: compare(current, b)})
		while (compare(current, b) >= 0) {
			current = subtract(current, b)
			console.log({current})
			count++
		}
		result.push(count)
		console.log({result})
	}

	while (result.length > 1 && result[0] === 0) {
		result.shift()
	}

	return result
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
console.log({digitA, digitB})
const result = divide(digitA, digitB)
// convert the result back into a string and remove any leading zeros
const answer = parseInt(result.join(""), 10)
console.log({answer})
