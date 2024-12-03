# The PesaPal Arbitrary Precision Integer Calculator Program

This program allows you to perform arithmetic operations (addition, subtraction, multiplication, division, modulo, exponentiation, and factorial) on arbitrarily large numbers using arrays of digits. It features a REPL (Read-Eval-Print Loop) interface where you can interactively enter expressions and see results.

This solution has been implemented by [Josiah Nganga](https://linkedin.com/in/kamaujosia). Feel free to reach out to me if you have any questions via [my portfolio](https://josiah.vercel.app)

# Table of Contents

-  [Getting Started](#getting-started)
   -  [Prerequisites](#prerequisites)
   -  [Instructions](#instructions)
   -  [Demo](#demo)
-  [Every Function Explained](#every-function-explained)
   -  [1. Add](#1-add-function)
      -  [How It works](#how-it-works)
      -  [Example](#example)

# Getting Started

### Prerequisites:

-  JavaScript (ES6+) environment
   -  The program is designed to run in a browser or any JavaScript runtime environment such as Node.js.
   -  Make sure you have Node.js installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).

### Instructions:

1. **Cloning the repository**:

   ```bash
   git clone https://github.com/spectr-e/pesapal-arbitrary-precision-calculator.git
   ```

2. **Running the code**:

   -  Open the repository in your code editor.
   -  Open your terminal or command prompt and navigate to the directory where the file is saved.
   -  Run the following command:

   ```bash
       npm install
   ```

   -  Then run the following command:

   ```bash
       node calculator.js
   ```

   -  The REPL will start in the terminal, and you can interact with the program by typing expressions.

3. **Using the REPL**:
   -  After starting the program, you will be prompted to enter an expression like `a + b` or `n!`.
   -  Examples:
      -  **Addition**: `3 + 4` will output `7`.
      -  **Multiplication**: `2 * 5` will output `10`.
      -  **Exponentiation**: `2 ^ 3` will output `8`.
      -  **Factorial**: `5!` will output `120`.
   -  Type `exit` to terminate the program.

### Demo:

```javascript
// Input:
Enter an expression (or 'exit'): 3 + 4
Output: 7

// Input:
Enter an expression (or 'exit'): 5 * 6
Output: 30

// Input:
Enter an expression (or 'exit'): 10 ^ 2
Output: 100

// Input:
Enter an expression (or 'exit'): 7!
Output: 5040

// Input:
Enter an expression (or 'exit'): exit
Program ends.
```

[Back to Table of Contents](#table-of-contents)

# Every Function Explained

### 1. Add Function

The `add` function performs addition of two arrays of digits, `a` and `b`. Each array represents a large number, where each element is a single digit. The function ensures proper handling of carries and returns the sum as an array of digits.

---

### How It Works:

1. **Initialization**:

   -  `result`: An empty array to store the digits of the sum.
   -  `carry`: A variable initialized to 0, used to handle cases where the sum of two digits exceeds 9.
   -  `i` and `j`: Indices initialized to the last elements of arrays `a` and `b`, respectively, to start addition from the least significant digit (rightmost).

2. **Addition Loop**:

   -  The loop continues as long as there are digits in `a` or `b`, or a non-zero `carry` remains.
   -  In each iteration:
      -  Add `carry` to the sum.
      -  If `i` is valid, add `a[i]` to the sum and decrement `i`.
      -  Similarly, if `j` is valid, add `b[j]` to the sum and decrement `j`.
      -  Append the last digit of the sum (`sum % 10`) to `result`.
      -  Update `carry` to `Math.floor(sum / 10)`.

3. **Final Carry**:

   -  After the loop, if `carry` is non-zero, append it to the `result`.

4. **Return**:
   -  Reverse the `result` array to present the digits in the correct order and return it.

### Example:

Adding `[1, 2, 3]` and `[4, 5, 6]`

1. **Initialization**:

   -  `a = [1, 2, 3]`, `b = [4, 5, 6]`
   -  `result = []`, `carry = 0`
   -  `i = 2`, `j = 2`

2. **Step-by-Step Addition**:

   -  **Iteration 1**:

      -  `sum = carry (0) + a[2] (3) + b[2] (6) => sum = 9`
      -  Append `9` to `result => result = [9]`
      -  `carry = Math.floor(sum / 10) = 0`

   -  **Iteration 2**:

      -  `sum = carry (0) + a[1] (2) + b[1] (5) => sum = 7`
      -  Append `7` to `result => result = [9, 7]`
      -  `carry = Math.floor(sum / 10) = 0`

   -  **Iteration 3**:
      -  `sum = carry (0) + a[0] (1) + b[0] (4) => sum = 5`
      -  Append `5` to `result => result = [9, 7, 5]`
      -  `carry = Math.floor(sum / 10) = 0`

3. **Final Carry**:

   -  No remaining carry, skip this step.

4. **Reverse and Return**:
   -  Reverse `result` => `[5, 7, 9]`.

### Final Output:

```javascript
add([1, 2, 3], [4, 5, 6]) // Returns [5, 7, 9]
```

[Back to Table of Contents](#table-of-contents)

---
