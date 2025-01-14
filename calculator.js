const prompt = require("prompt-sync")({sigint: true})

// Core Functions
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

function divide(a, b, precision = 2) {
	// Changed default precision to 2
	if (b.every((digit) => digit === 0)) {
		throw new Error("Division by zero")
	}

	let result = []
	let current = []
	let decimalPoint = 0

	// Integer part
	for (let i = 0; i < a.length; i++) {
		current.push(a[i])

		let count = 0
		while (compare(current, b) >= 0) {
			current = subtract(current, b)
			count++
		}
		result.push(count)
	}

	// Decimal part
	if (!current.every((digit) => digit === 0)) {
		result.push(".") // Add decimal point
		decimalPoint = result.length

		for (let i = 0; i < precision; i++) {
			current.push(0)
			let count = 0
			while (compare(current, b) >= 0) {
				current = subtract(current, b)
				count++
			}
			result.push(count)
		}
	}

	// Remove leading zeros in integer part
	while (result.length > decimalPoint && result[0] === 0) {
		result.shift()
	}

	// Remove trailing zeros in decimal part (if no integer part)
	if (decimalPoint === 1) {
		while (result[result.length - 1] === 0) {
			result.pop()
		}
	}

	// If the result is only a decimal point, add a leading zero
	if (result.length === 1 && result[0] === ".") {
		result.unshift(0)
	}

	return result
}

function modulo(a, b) {
	if (b.every((digit) => digit === 0)) {
		throw new Error("Modulo by zero")
	}

	let current = []

	for (let i = 0; i < a.length; i++) {
		current.push(a[i])
		while (compare(current, b) >= 0) {
			current = subtract(current, b)
		}
	}

	return current
}

function exponentiation(a, b) {
	let result = [1]
	let base = a.slice()

	while (b > 0) {
		if (b % 2 === 1) {
			result = multiply(result, base)
		}
		base = multiply(base, base)
		b = Math.floor(b / 2)
	}

	return result
}

// Helper Functions
function compare(a, b) {
	if (a.every((digit) => digit === 0)) {
		return -1
	}

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

function toDigits(num) {
	return num.toString().split("").map(Number)
}

function fromDigits(digits) {
	return parseFloat(digits.join(""), 10)
}

// REPL
while (true) {
	const input = prompt("Enter an expression (or 'exit'):")
	if (input === "exit") break

	try {
		const [a, op, b] = input.split(" ")
		const digitsA = toDigits(parseInt(a))
		const digitsB = toDigits(parseInt(b))
		let result

		switch (op) {
			case "+":
				result = add(digitsA, digitsB)
				break
			case "-":
				result = subtract(digitsA, digitsB)
				break
			case "*":
				result = multiply(digitsA, digitsB)
				break
			case "/":
				result = divide(digitsA, digitsB)
				break
			case "%":
				result = modulo(digitsA, digitsB)
				break
			case "^":
				result = exponentiation(digitsA, parseInt(b))
				break
			case "!":
				result = factorial(parseInt(a))
				break
			default:
				throw new Error("Invalid operator")
		}

		console.log(fromDigits(result))
	} catch (error) {
		console.error(error.message)
	}
}
