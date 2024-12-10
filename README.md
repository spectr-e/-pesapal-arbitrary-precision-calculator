# The PesaPal Arbitrary Precision Integer Calculator Program

This program allows you to perform arithmetic operations (addition, subtraction, multiplication, division, modulo, exponentiation, and factorial) on arbitrarily large numbers using arrays of digits. It features a REPL (Read-Eval-Print Loop) interface where you can interactively enter expressions and see results.

This solution has been implemented by [Josiah Nganga](https://linkedin.com/in/kamaujosia). Feel free to reach out to me if you have any questions via [my portfolio](https://josiah.vercel.app)

# Table of Contents

-  [Getting Started](#getting-started)
   -  [Prerequisites](#prerequisites)
   -  [Instructions](#instructions)
   -  [Demo](#demo)
-  [Core Functions](#core-functions)
   -  [1. `add` function](#1-add-function)
      -  [How It works](#how-it-works)
      -  [Example Walkthrough](#example-walkthrough)
   -  [2. `subtract` function](#2-subtract-function)
      -  [How It works](#how-it-works-1)
      -  [Example Walkthrough](#example-walkthrough-1)
   -  [3. `multiply` function](#3-multiply-function)
      -  [How It works](#how-it-works-2)
      -  [Example Walkthrough](#example-walkthrough-2)
   -  [4. `divide` function](#4-divide-function)
      -  [How It works](#how-it-works-3)
      -  [Example Walkthrough](#example-walkthrough-3)
   -  [5. `modulo` function](#5-modulo-function)
      -  [How It works](#how-it-works-4)
      -  [Example Walkthrough](#example-walkthrough-4)
-  [Helper Functions](#helper-functions)
   -  [1. `compare` function](#1-compare-function)
      -  [How It works](#how-it-works-5)
      -  [Example Walkthrough](#example-walkthrough-5)
   -  [2. `makeFirstNumberNegative` function](#2-makefirstnumbernegative-function)
      -  [How It works](#how-it-works-6)
      -  [Example Walkthrough](#example-walkthrough-6)

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

# Core Functions

## 1. `add` Function

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

### Example Walkthrough:

**Input**: `[1, 2, 3]` and `[4, 5, 6]`

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

**Output**:

```javascript
add([1, 2, 3], [4, 5, 6]) // Returns [5, 7, 9]
```

[Back to Table of Contents](#table-of-contents)

## 2. `subtract` Function

This function performs subtraction between two arrays of digits, `a` and `b`, and manages cases where the result is negative. It ensures proper borrowing when needed and adjusts the sign of the result if the smaller number is subtracted from the larger.

---

### How It works:

1. **Comparison**:

   -  The `compare` function determines whether `a` is greater than, equal to, or less than `b`.
      -  If `a` is shorter, it is smaller, and vice versa.
      -  If `a` and `b` have the same length, digit-by-digit comparison decides which is larger.
   -  Based on the comparison:
      -  `isNegative` is set to `true` if `a` is less than `b`, meaning the result will be negative.

2. **Normalization**:

   -  To ensure correct subtraction logic, always subtract the smaller number from the larger number:
      -  If `isNegative`, swap `a` and `b` so the larger number is the minuend (`larger`) and the smaller is the subtrahend (`smaller`).

3. **Subtraction Loop**:

   -  Process the digits from right to left (least significant to most significant):
      -  Subtract the current digit of `smaller` from `larger` while considering any `borrow` from previous iterations.
      -  If the result is negative:
         -  Add 10 to the result.
         -  Set `borrow` to 1 for the next higher digit.
      -  Otherwise, reset `borrow` to 0.
   -  Append the result of each subtraction to `result`.

4. **Remove Leading Zeros**:

   -  Any leading zeros in the result are removed by popping them until a non-zero digit is found or only one digit remains.

5. **Adjust Sign for Negative Results**:

   -  If `isNegative` is true, the `makeFirstNumberNegative` function converts the most significant digit of `result` to negative.

6. **Return**:
   -  Reverse the `result` array to present the digits in the correct order and return it.

---

### Example Walkthrough

**Input**: `[1, 2, 3]` and `[4, 5]`

1. **Comparison**:

   -  `compare([1, 2, 3], [4, 5])` determines that `a > b`.
   -  `isNegative = false`.

2. **Normalization**:

   -  `larger = [1, 2, 3]`, `smaller = [4, 5]`.

3. **Subtraction Loop**:

   -  Start with `i = 2` (index of `3`) and `j = 1` (index of `5`).
   -  **Step 1**: `3 - 5 = -2`. Borrow 1, append `8` to `result`.
   -  **Step 2**: `2 (from borrow: 1) - 4 = -2`. Borrow 1, append `8` to `result`.
   -  **Step 3**: `1 (from borrow: 1) - 0 = 0`. Append `0` to `result`.

4. **Remove Leading Zeros**:

   -  `result = [0, 8, 8]`. Remove the leading `0`.

5. **Adjust Sign**:

   -  `isNegative` is false, so no adjustment is needed.

6. **Return**:
   -  Reverse `result` to `[8, 8]`.

**Output**:

```javascript
subtract([1, 2, 3], [4, 5]) // Returns [8, 8]
```

[Back to Table of Contents](#table-of-contents)

## 3. `multiply` Function

The `multiply` function performs multiplication of two arrays of digits, `a` and `b`. Each array represents a large number, where each element is a single digit. The function uses a digit-by-digit approach and manages carries across multiple positions.

---

### How It Works:

1. **Initialization**:

   -  `result`: An array initialized with zeros, with a length of `a.length + b.length`. This ensures enough space to hold the product.
   -  Nested loops: Two loops iterate through every combination of digits in `a` and `b`, starting from the least significant digits.

2. **Multiplication and Carry Management**:

   -  For each pair of digits `a[i]` and `b[j]`:
      -  Multiply `a[i]` and `b[j]` to get `product`.
      -  Determine positions in `result`:
         -  `p1 = i + j` (carry position).
         -  `p2 = i + j + 1` (current digit position).
      -  Add `product` to the value at `p2` (including any carry from previous calculations).
      -  Update `result[p1]` with the carry (`Math.floor(sum / 10)`).
      -  Update `result[p2]` with the remainder (`sum % 10`).

3. **Remove Leading Zeros**:

   -  After processing all digits, leading zeros in the `result` are removed by popping elements until only one digit remains or the first non-zero digit is found.

4. **Return**:
   -  The `result` array is returned as the final product.

### Example Walkthrough:

**Input**: `[1, 2]` and `[3, 4]`

1. **Initialization**:

   -  `a = [1, 2]`, `b = [3, 4]`
   -  `result = [0, 0, 0, 0]` (length = `a.length + b.length = 4`)

2. **Step-by-Step Multiplication**:

   -  **Outer Loop (i = 1)**:

      -  **Inner Loop (j = 1)**:
         -  `product = a[1] (2) * b[1] (4) = 8`
         -  `p1 = 2`, `p2 = 3`
         -  Add `8` to `result[3]`: `result = [0, 0, 0, 8]`
      -  **Inner Loop (j = 0)**:
         -  `product = a[1] (2) * b[0] (3) = 6`
         -  `p1 = 1`, `p2 = 2`
         -  Add `6` to `result[2]`: `result = [0, 0, 6, 8]`

   -  **Outer Loop (i = 0)**:
      -  **Inner Loop (j = 1)**:
         -  `product = a[0] (1) * b[1] (4) = 4`
         -  `p1 = 1`, `p2 = 2`
         -  Add `4` to `result[2]` (carry managed): `result = [0, 1, 0, 8]`
      -  **Inner Loop (j = 0)**:
         -  `product = a[0] (1) * b[0] (3) = 3`
         -  `p1 = 0`, `p2 = 1`
         -  Add `3` to `result[1]`: `result = [0, 4, 0, 8]`

3. **Remove Leading Zeros**:

   -  Final `result = [0, 4, 0, 8]`. Remove the leading zero: `result = [4, 0, 8]`.

4. **Return**:
   -  The final result is `[4, 0, 8]`.

**Output**:

```javascript
multiply([1, 2], [3, 4]) // Returns [4, 0, 8]
```

[Back to Table of Contents](#table-of-contents)

## 4. `divide` Function

The `divide` function performs division of two arrays of digits, `a` (dividend) and `b` (divisor), with a specified precision for decimal places. Each array represents a large number, where each element is a single digit. The function uses a long division approach to calculate the quotient, including both the integer and decimal parts. Division by zero is explicitly handled by throwing an error.

### How It Works:

1. **Handle Division by Zero**:

   -  If all digits in `b` are zero, throw an error: `"Division by zero"`.

2. **Initialization**:

   -  `result`: An empty array to store the quotient digits.
   -  `current`: An empty array used to build the portion of the dividend currently being divided.
   -  `decimalPoint`: A variable to store the index of the decimal point in the `result` array.

3. **Integer Part Calculation**:

   -  Iterate through each digit of `a` from left to right.
   -  Add the current digit of `a` to `current`.
   -  Determine how many times `b` fits into `current`:
      -  Use a loop to subtract `b` from `current` while `current >= b`, counting how many subtractions occur.
      -  Append this count to `result`.
   -  After processing all digits, `current` contains the remainder.

4. **Decimal Part Calculation**:

   -  If `current` is not zero (i.e., there's a remainder), proceed to calculate the decimal part:
      -  Append a decimal point (`.`) to `result`.
      -  Set `decimalPoint` to the current length of `result`.
      -  Iterate `precision` times (default is 2):
         -  Append a `0` to `current`.
         -  Determine how many times `b` fits into `current` (similar to the integer part calculation).
         -  Append this count to `result`.

5. **Remove Leading and Trailing Zeros**:

   -  Remove leading zeros from the integer part of `result`.
   -  If there's no integer part, remove trailing zeros from the decimal part.

6. **Handle Special Case**:

   -  If `result` only contains a decimal point after removing trailing zeros, add a leading zero (`0`).

7. **Return**:
   -  The `result` array is returned as the quotient, including the decimal part.

### Example Walkthrough (with decimals)

**Input**: `[1]` divided by `[3]` with `precision = 4`

1. **Initialization**:

   -  `a = [1]`, `b = [3]`
   -  `result = []`, `current = []`, `precision = 4`

2. **Integer Part Calculation**:

   -  **Iteration 1 (Process digit 1)**:
      -  Add `1` to `current`: `current = [1]`.
      -  `1 < 3`, so append `0` to `result`: `result = [0]`.
      -  Remainder: `current = [1]`

3. **Decimal Part Calculation**:

   -  `current` is not zero, so proceed with decimal calculation.
   -  Append `.` to `result`: `result = [0, '.']`
   -  `decimalPoint = 2`
   -  **Iteration 1**:
      -  Append `0` to `current`: `current = [1, 0]`
      -  `10 / 3 = 3` (fits 3 times) -> `current = [1]` -> Append `3` to `result`: `result = [0, '.', 3]`
   -  **Iteration 2**:
      -  Append `0` to `current`: `current = [1, 0]`
      -  `10 / 3 = 3` (fits 3 times) -> `current = [1]` -> Append `3` to `result`: `result = [0, '.', 3, 3]`
   -  **Iteration 3**:
      -  Append `0` to `current`: `current = [1, 0]`
      -  `10 / 3 = 3` (fits 3 times) -> `current = [1]` -> Append `3` to `result`: `result = [0, '.', 3, 3, 3]`
   -  **Iteration 4**:
      -  Append `0` to `current`: `current = [1, 0]`
      -  `10 / 3 = 3` (fits 3 times) -> `current = [1]` -> Append `3` to `result`: `result = [0, '.', 3, 3, 3, 3]`

4. **Remove Leading and Trailing Zeros**:

   -  No trailing zeros to remove.

5. **Handle Special Case**:

   -  Not applicable.

6. **Return**:
   -  The final result is `[0, '.', 3, 3, 3, 3]`.

**Output**:

```javascript
divide([1], [3], 4) // Returns [0, '.', 3, 3, 3, 3] which represents 0.3333
```

## 5. `modulo` Function

The `modulo` function calculates the remainder when one array of digits, `a` (dividend), is divided by another array of digits, `b` (divisor). Each array represents a large number, where each element is a single digit. The function uses a repeated subtraction approach to find the modulo. Modulo by zero is explicitly handled by throwing an error.

### How It Works:

1. **Handle Modulo by Zero**:

   -  If all digits in `b` are zero, throw an error: `"Modulo by zero"`.

2. **Initialization**:

   -  `current`: An empty array used to build the portion of the dividend currently being processed.

3. **Repeated Subtraction Loop**:

   -  Iterate through each digit of `a` from left to right.
   -  Add the current digit of `a` to `current`.
   -  Repeatedly subtract `b` from `current` while `current >= b`. This effectively simulates the division process to find the remainder.

4. **Return**:
   -  After processing all digits, `current` contains the remainder, which is the modulo result. The `current` array is returned.

### Example Walkthrough

**Input**: `[1, 0, 2, 4]` modulo `[4]`

1. **Initialization**:

   -  `a = [1, 0, 2, 4]`, `b = [4]`
   -  `current = []`

2. **Step-by-Step Modulo Calculation**:

   -  **Iteration 1 (Process digit 1)**:

      -  Add `1` to `current`: `current = [1]`.
      -  `1 < 4`, so no subtraction is performed.

   -  **Iteration 2 (Process digit 0)**:

      -  Add `0` to `current`: `current = [1, 0]`.
      -  `10 >= 4`. Subtract `4` twice: `current = [2]`.

   -  **Iteration 3 (Process digit 2)**:

      -  Add `2` to `current`: `current = [2, 2]`.
      -  `22 >= 4`. Subtract `4` five times: `current = [2]`.

   -  **Iteration 4 (Process digit 4)**:
      -  Add `4` to `current`: `current = [2, 4]`.
      -  `24 >= 4`. Subtract `4` six times: `current = [0]`.

3. **Return**:
   -  The final `current = [0]`, which is the remainder.

**Output**:

```javascript
modulo([1, 0, 2, 4], [4]) // Returns [0]
```

[Back to Table of Contents](#table-of-contents)

# Helper Functions

## 1. `compare` Function

The `compare` function compares two arrays of digits, `a` and `b`, which represent large numbers. It determines whether `a` is greater than, less than, or equal to `b`.

---

### How It Works:

1. **Length Comparison**:

   -  First, compare the lengths of `a` and `b`:
      -  If the length of `a` is greater than `b`, then `a` is greater.
      -  If the length of `a` is smaller than `b`, then `a` is smaller.

2. **Digit-by-Digit Comparison**:

   -  If the lengths are equal, compare the digits of `a` and `b` starting from the most significant (leftmost) digit.
      -  If any digit in `a` is greater than the corresponding digit in `b`, then `a` is greater.
      -  If any digit in `a` is smaller than the corresponding digit in `b`, then `a` is smaller.

3. **Return**:
   -  Return `1` if `a` is greater, `-1` if `a` is smaller, and `0` if they are equal.

---

### Example Walkthrough:

**Input**: `[1, 0, 2, 4]` and `[1, 2, 3, 4]`

1. **Length Comparison**:

   -  `a = [1, 0, 2, 4]`, `b = [1, 2, 3, 4]`
   -  Both arrays have the same length (4), so proceed to the next step.

2. **Digit-by-Digit Comparison**:

   -  **Compare most significant digits**:
      -  `a[0] = 1`, `b[0] = 1`. They are equal, so move to the next digit.
   -  **Compare next significant digits**:
      -  `a[1] = 0`, `b[1] = 2`. Since `0 < 2`, `a` is smaller than `b`.

3. **Return**:
   -  Since `a` is smaller than `b`, return `-1`.

**Output**:

```javascript
compare([1, 0, 2, 4], [1, 2, 3, 4]) // Returns -1
```

[Back to Table of Contents](#table-of-contents)

## 2. `makeFirstNumberNegative` Function

The `makeFirstNumberNegative` iterates through an array of digits and changes the first positive number it encounters to a negative number. It ensures that the result reflects the intended negative sign in the most significant digit.

---

### How It Works:

1. **Initialization**:

   -  The function takes an array `arr` and iterates through each element to find the first positive number.

2. **Condition Check**:

   -  If a positive number is found, it is converted to its negative counterpart by multiplying it by `-1`.
   -  Once a positive number is made negative, the function immediately returns the modified array.

3. **Return**:
   -  If no positive number is found (i.e., all numbers are either zero or negative), the array is returned unmodified.

---

### Example Walkthrough

**Input**: `[2, 3, 4]`

1. **Iteration**:

   -  The function iterates through the array `[2, 3, 4]`.
   -  At index 0, the number `2` is positive, so it gets converted to `-2`.

2. **Return**:
   -  After the first positive number is made negative, the function returns the modified array `[-2, 3, 4]`.

**Output**:

```javascript
makeFirstNumberNegative([2, 3, 4]) // Returns [-2, 3, 4]
```

[Back to Table of Contents](#table-of-contents)
