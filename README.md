# The PesaPal Arbitrary Precision Integer Calculator Program

This program allows you to perform arithmetic operations (addition, subtraction, multiplication, division, modulo, exponentiation, and factorial) on arbitrarily large numbers using arrays of digits. It features a REPL (Read-Eval-Print Loop) interface where you can interactively enter expressions and see results.

This solution has been implemented by [Josiah Nganga](https://linkedin.com/in/kamaujosia). Feel free to reach out to me if you have any questions via [my portfolio](https://josiah.vercel.app)

# Table of Contents

-  [Getting Started](#getting-started)
   -  [Prerequisites](#prerequisites)
   -  [Instructions](#instructions)
   -  [Demo](#demo)

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
