require('dotenv').config({ path: require('path').join(__dirname, '..', '.env.local') });
const { neon } = require('@neondatabase/serverless');

const sql = neon(process.env.DRIZZLE_DB_URL);

const questions = [
  {
    topic: "Basic Syntax",
    difficulty: "Easy",
    question: "What is the correct file extension for Python source files?",
    options: [".pt", ".py", ".pyt", ".pn"],
    correctAnswer: ".py",
    explanation: "Python source files use the .py extension."
  },
  {
    topic: "Basic Syntax",
    difficulty: "Easy",
    question: "Which built-in function is used to display output in Python?",
    options: ["echo()", "display()", "print()", "output()"],
    correctAnswer: "print()",
    explanation: "print() writes its arguments to the standard output console."
  },
  {
    topic: "Basic Syntax",
    difficulty: "Easy",
    question: "How do you start a single-line comment in Python?",
    options: ["//", "<!--", "#", "--"],
    correctAnswer: "#",
    explanation: "The # symbol begins a single-line comment; everything after it on the line is ignored by the interpreter."
  },
  {
    topic: "Basic Syntax",
    difficulty: "Easy",
    question: "Which keyword is used to define a function in Python?",
    options: ["function", "def", "fun", "define"],
    correctAnswer: "def",
    explanation: "Functions are defined using the def keyword followed by the function name and parentheses."
  },
  {
    topic: "Basic Syntax",
    difficulty: "Easy",
    question: "What is the purpose of indentation in Python?",
    options: ["It is purely cosmetic", "It defines blocks of code", "It separates imports", "It declares variables"],
    correctAnswer: "It defines blocks of code",
    explanation: "Indentation is syntactically significant in Python; it determines which statements belong to a block such as a function body or loop body."
  },
  {
    topic: "Basic Syntax",
    difficulty: "Easy",
    question: "How do you create a multi-line string literal in Python?",
    options: ["Using single quotes only", "Using triple quotes \"\"\"...\"\"\"", "Using backticks", "Using <> tags"],
    correctAnswer: "Using triple quotes \"\"\"...\"\"\"",
    explanation: "Triple quotes (single or double) allow strings to span multiple lines."
  },
  {
    topic: "Basic Syntax",
    difficulty: "Easy",
    question: "What does the `pass` statement do?",
    options: ["Exits the program", "Skips the current loop iteration", "Does nothing; it acts as a placeholder", "Raises an exception"],
    correctAnswer: "Does nothing; it acts as a placeholder",
    explanation: "pass is a null operation used where syntactically some code is required but no action should be taken."
  },
  {
    topic: "Basic Syntax",
    difficulty: "Easy",
    question: "What is the output of print(\"Hello\", \"World\")?",
    options: ["HelloWorld", "Hello World", "Hello,World", "Error"],
    correctAnswer: "Hello World",
    explanation: "By default, print() joins multiple arguments with a single space."
  },
  {
    topic: "Basic Syntax",
    difficulty: "Easy",
    question: "Which character can be used to continue a logical statement onto the next physical line in Python?",
    options: ["Backslash \\", "Semicolon ;", "Ampersand &", "Tilde ~"],
    correctAnswer: "Backslash \\",
    explanation: "The backslash (\\) at the end of a line explicitly continues a statement onto the next line."
  },
  {
    topic: "Basic Syntax",
    difficulty: "Easy",
    question: "Which of the following is a valid Python variable name?",
    options: ["2score", "my-score", "my_score", "class"],
    correctAnswer: "my_score",
    explanation: "Identifiers cannot start with a digit, cannot contain hyphens, and cannot be reserved keywords like class."
  },

  {
    topic: "Variables and Data Types",
    difficulty: "Easy",
    question: "What is the output of type(5)?",
    options: ["<class 'float'>", "<class 'int'>", "<class 'number'>", "<class 'str'>"],
    correctAnswer: "<class 'int'>",
    explanation: "Whole numbers without a decimal point are of type int in Python."
  },
  {
    topic: "Variables and Data Types",
    difficulty: "Easy",
    question: "What is the output of type(\"hello\")?",
    options: ["<class 'char'>", "<class 'string'>", "<class 'str'>", "<class 'text'>"],
    correctAnswer: "<class 'str'>",
    explanation: "Text data is represented by the str type in Python."
  },
  {
    topic: "Variables and Data Types",
    difficulty: "Easy",
    question: "Which data type represents True or False values in Python?",
    options: ["bool", "boolean", "bit", "flag"],
    correctAnswer: "bool",
    explanation: "Python's boolean type is named bool, with the two values True and False."
  },
  {
    topic: "Variables and Data Types",
    difficulty: "Easy",
    question: "What is the result of int(\"42\")?",
    options: ["\"42\"", "42", "42.0", "TypeError"],
    correctAnswer: "42",
    explanation: "int() parses the numeric string \"42\" and returns the integer 42."
  },
  {
    topic: "Variables and Data Types",
    difficulty: "Easy",
    question: "Which of the following is NOT a built-in Python data type?",
    options: ["list", "dict", "array", "set"],
    correctAnswer: "array",
    explanation: "list, dict, and set are built-in types. Arrays only exist via the separate array module, not as a core built-in type."
  },
  {
    topic: "Variables and Data Types",
    difficulty: "Easy",
    question: "Given x = 10 followed later by x = \"ten\", what happens?",
    options: ["Error, types cannot change", "x becomes \"ten\"", "x stays 10", "x becomes None"],
    correctAnswer: "x becomes \"ten\"",
    explanation: "Python uses dynamic typing, so variables can be rebound to values of different types at any time."
  },
  {
    topic: "Variables and Data Types",
    difficulty: "Easy",
    question: "What is the output of type(None)?",
    options: ["<class 'null'>", "<class 'NoneType'>", "<class 'void'>", "<class 'undefined'>"],
    correctAnswer: "<class 'NoneType'>",
    explanation: "None is the sole instance of the NoneType class, representing absence of a value."
  },
  {
    topic: "Variables and Data Types",
    difficulty: "Easy",
    question: "Which of these built-in types is immutable?",
    options: ["list", "dict", "set", "tuple"],
    correctAnswer: "tuple",
    explanation: "Tuples cannot be modified after creation, unlike lists, dicts, and sets which are mutable."
  },
  {
    topic: "Variables and Data Types",
    difficulty: "Easy",
    question: "What is the result of float(3)?",
    options: ["3", "3.0", "\"3.0\"", "TypeError"],
    correctAnswer: "3.0",
    explanation: "float() converts an integer to its floating-point equivalent."
  },
  {
    topic: "Variables and Data Types",
    difficulty: "Easy",
    question: "What is the output of str(10) + str(5)?",
    options: ["15", "105", "10 5", "TypeError"],
    correctAnswer: "105",
    explanation: "+ concatenates two strings, so \"10\" + \"5\" produces \"105\" rather than performing arithmetic."
  },

  {
    topic: "Operators and Expressions",
    difficulty: "Easy",
    question: "What is the output of 7 // 2?",
    options: ["3.5", "3", "4", "2"],
    correctAnswer: "3",
    explanation: "// is floor division, which divides and rounds down toward negative infinity, giving 3."
  },
  {
    topic: "Operators and Expressions",
    difficulty: "Easy",
    question: "What is the output of 2 ** 3?",
    options: ["6", "8", "9", "5"],
    correctAnswer: "8",
    explanation: "** is the exponentiation operator, so 2 ** 3 equals 8."
  },
  {
    topic: "Operators and Expressions",
    difficulty: "Easy",
    question: "What is the output of 10 % 3?",
    options: ["3", "1", "0", "3.33"],
    correctAnswer: "1",
    explanation: "% returns the remainder of division; 10 divided by 3 leaves remainder 1."
  },
  {
    topic: "Operators and Expressions",
    difficulty: "Easy",
    question: "Which operator checks equality between two values in Python?",
    options: ["=", "==", "===", "!="],
    correctAnswer: "==",
    explanation: "= assigns a value, while == compares two values for equality."
  },
  {
    topic: "Operators and Expressions",
    difficulty: "Medium",
    question: "What is the output of 2 ** 3 ** 2?",
    options: ["64", "512", "36", "128"],
    correctAnswer: "512",
    explanation: "Exponentiation is right-associative, so this evaluates as 2 ** (3 ** 2) = 2 ** 9 = 512."
  },
  {
    topic: "Operators and Expressions",
    difficulty: "Medium",
    question: "What is the difference between == and is in Python?",
    options: [
      "There is no difference",
      "== compares values while is compares identity (whether they are the same object in memory)",
      "is compares values while == compares identity",
      "== works only on numbers"
    ],
    correctAnswer: "== compares values while is compares identity (whether they are the same object in memory)",
    explanation: "== checks that two objects have equal values; is checks whether two names refer to the exact same object."
  },
  {
    topic: "Operators and Expressions",
    difficulty: "Medium",
    question: "What is the output of `not True or False`?",
    options: ["True", "False", "None", "SyntaxError"],
    correctAnswer: "False",
    explanation: "not binds tighter than or, so the expression is (not True) or False, which equals False or False = False."
  },
  {
    topic: "Operators and Expressions",
    difficulty: "Easy",
    question: "What is the result of the expression \"3\" + \"4\" in Python?",
    options: ["7", "34", "12", "TypeError"],
    correctAnswer: "34",
    explanation: "When applied to strings, + performs concatenation, producing \"34\" instead of numeric addition."
  },

  {
    topic: "Control Flow",
    difficulty: "Easy",
    question: "Which keyword starts a conditional branch in Python?",
    options: ["if", "switch", "when", "check"],
    correctAnswer: "if",
    explanation: "Python conditionals use if, optionally followed by elif and else branches."
  },
  {
    topic: "Control Flow",
    difficulty: "Easy",
    question: "Which sequence of numbers does range(5) produce when iterated?",
    options: ["0, 1, 2, 3, 4", "1, 2, 3, 4, 5", "0, 1, 2, 3, 4, 5", "Only 5"],
    correctAnswer: "0, 1, 2, 3, 4",
    explanation: "range(5) generates integers starting from 0 up to but excluding the stop value 5."
  },
  {
    topic: "Control Flow",
    difficulty: "Easy",
    question: "What does the break statement do inside a loop?",
    options: ["Skips to the next iteration", "Exits the loop immediately", "Restarts the loop", "Pauses the loop"],
    correctAnswer: "Exits the loop immediately",
    explanation: "break terminates the innermost enclosing loop right away."
  },
  {
    topic: "Control Flow",
    difficulty: "Easy",
    question: "What does the continue statement do inside a loop?",
    options: ["Exits the loop entirely", "Skips the rest of the current iteration and continues with the next", "Ends the program", "Repeats the current iteration forever"],
    correctAnswer: "Skips the rest of the current iteration and continues with the next",
    explanation: "continue jumps straight to the next iteration without executing the remaining statements in the loop body."
  },
  {
    topic: "Control Flow",
    difficulty: "Easy",
    question: "What is the output?\n\nfor i in range(3):\n    if i == 2:\n        break\n    print(i)",
    options: ["0 1 2", "0 1", "1 2", "0"],
    correctAnswer: "0 1",
    explanation: "The loop prints 0 and 1, then breaks when i reaches 2 before printing it."
  },
  {
    topic: "Control Flow",
    difficulty: "Easy",
    question: "When does a while loop stop executing?",
    options: ["After a fixed number of iterations", "When its condition becomes False (or a break executes)", "When all list items are consumed", "Never"],
    correctAnswer: "When its condition becomes False (or a break executes)",
    explanation: "A while loop repeats as long as its condition is truthy and stops when it becomes falsy or a break occurs."
  },
  {
    topic: "Control Flow",
    difficulty: "Medium",
    question: "What is the output?\n\nx = 0\nwhile x < 3:\n    x += 1\nprint(x)",
    options: ["2", "3", "4", "Infinite loop"],
    correctAnswer: "3",
    explanation: "x increments once per iteration until the condition fails; when x equals 3 the loop exits, so 3 is printed."
  },
  {
    topic: "Control Flow",
    difficulty: "Medium",
    question: "How does Python implement a ternary (conditional) expression?",
    options: [
      "Yes, as `value_if_true if condition else value_if_false`",
      "No, Python has no ternary expression",
      "Yes, using ? and : like C-style languages",
      "Yes, using then/else keywords"
    ],
    correctAnswer: "Yes, as `value_if_true if condition else value_if_false`",
    explanation: "Python's conditional expression reads value_if_true if condition else value_if_false."
  },
  {
    topic: "Control Flow",
    difficulty: "Medium",
    question: "An else block attached directly to a for loop runs when:",
    options: [
      "The loop completes without encountering break",
      "The loop raises an error",
      "Every single iteration ends",
      "The loop body never executes"
    ],
    correctAnswer: "The loop completes without encountering break",
    explanation: "The for-else construct runs the else block only if the loop finished normally, i.e., break was never hit."
  },
  {
    topic: "Control Flow",
    difficulty: "Easy",
    question: "What is the output?\n\nif 5 > 3:\n    print(\"A\")\nelif 5 > 1:\n    print(\"B\")\nelse:\n    print(\"C\")",
    options: ["A B C", "A", "B", "C"],
    correctAnswer: "A",
    explanation: "Only the first true branch runs; since 5 > 3 is True, A is printed and the elif/else branches are skipped."
  },

  {
    topic: "Functions and Scope",
    difficulty: "Medium",
    question: "What is the purpose of *args in a function definition?",
    options: [
      "It accepts a variable number of positional arguments as a tuple",
      "It accepts keyword arguments as a dictionary",
      "It multiplies all arguments together",
      "It declares an array parameter"
    ],
    correctAnswer: "It accepts a variable number of positional arguments as a tuple",
    explanation: "*args collects any extra positional arguments into a tuple named args inside the function."
  },
  {
    topic: "Functions and Scope",
    difficulty: "Medium",
    question: "What is the purpose of **kwargs in a function definition?",
    options: [
      "It accepts a variable number of positional arguments",
      "It accepts a variable number of keyword arguments as a dict",
      "It exponentiates each argument",
      "It is invalid syntax"
    ],
    correctAnswer: "It accepts a variable number of keyword arguments as a dict",
    explanation: "**kwargs gathers extra keyword arguments into a dictionary keyed by argument name."
  },
  {
    topic: "Functions and Scope",
    difficulty: "Medium",
    question: "What is the output?\n\ndef f(a, b=5):\n    return a + b\nprint(f(3))",
    options: ["3", "5", "8", "Error"],
    correctAnswer: "8",
    explanation: "Since b is omitted, the default value 5 is used, so f(3) returns 3 + 5 = 8."
  },
  {
    topic: "Functions and Scope",
    difficulty: "Medium",
    question: "What happens when you use a mutable object (like a list) as a default argument value?",
    options: [
      "A new default object is created on every call",
      "The same object is shared across calls, so changes persist between calls",
      "Python raises a TypeError",
      "The argument automatically becomes immutable"
    ],
    correctAnswer: "The same object is shared across calls, so changes persist between calls",
    explanation: "Default values are evaluated once at function definition time, so mutating a mutable default affects subsequent calls."
  },
  {
    topic: "Functions and Scope",
    difficulty: "Medium",
    question: "Which keyword allows a function to assign to a global variable?",
    options: ["local", "global", "static", "extern"],
    correctAnswer: "global",
    explanation: "Declaring global x inside a function makes assignments affect the module-level variable x."
  },
  {
    topic: "Functions and Scope",
    difficulty: "Medium",
    question: "What is the output?\n\nx = 10\ndef f():\n    x = 20\nf()\nprint(x)",
    options: ["20", "10", "None", "Error"],
    correctAnswer: "10",
    explanation: "Assigning x inside the function creates a new local variable; the global x remains 10 because global was not declared."
  },
  {
    topic: "Functions and Scope",
    difficulty: "Medium",
    question: "What does a lambda expression evaluate to?",
    options: [
      "Nothing, lambdas are statements",
      "An anonymous function object",
      "A class instance",
      "A generator object"
    ],
    correctAnswer: "An anonymous function object",
    explanation: "lambda creates a small unnamed function object that can be assigned or passed around like any other function."
  },
  {
    topic: "Functions and Scope",
    difficulty: "Medium",
    question: "What is the output of (lambda x: x * 2)(5)?",
    options: ["10", "25", "5", "Error"],
    correctAnswer: "10",
    explanation: "The lambda doubles its argument, so calling it with 5 returns 10."
  },
  {
    topic: "Functions and Scope",
    difficulty: "Medium",
    question: "What does a function return when it has no explicit return statement?",
    options: ["0", "None", "An empty string", "It raises an error"],
    correctAnswer: "None",
    explanation: "Every function call in Python yields a value; without an explicit return, the implicit return value is None."
  },
  {
    topic: "Functions and Scope",
    difficulty: "Medium",
    question: "What does the statement `return a, b` actually return?",
    options: [
      "Two separate values simultaneously",
      "A tuple containing a and b",
      "A list containing a and b",
      "Only the last value b"
    ],
    correctAnswer: "A tuple containing a and b",
    explanation: "Comma-separated return values are packed into a tuple, which callers can unpack."
  },

  {
    topic: "Lists and Tuples",
    difficulty: "Medium",
    question: "What is the difference between list.append(x) and list.extend(iterable)?",
    options: [
      "They behave identically",
      "append() adds its argument as a single element, while extend() iterates over its argument adding each element",
      "append() modifies a copy while extend() modifies in place",
      "extend() removes elements from the list"
    ],
    correctAnswer: "append() adds its argument as a single element, while extend() iterates over its argument adding each element",
    explanation: "append([1,2]) grows the list by one element (the nested list), whereas extend([1,2]) adds both elements individually."
  },
  {
    topic: "Lists and Tuples",
    difficulty: "Medium",
    question: "What is the output of [1, 2, 3][::-1]?",
    options: ["[1, 2, 3]", "[3, 2, 1]", "[3]", "IndexError"],
    correctAnswer: "[3, 2, 1]",
    explanation: "The slice [::-1] steps through the list backwards, producing a reversed copy."
  },
  {
    topic: "Lists and Tuples",
    difficulty: "Medium",
    question: "What is the output of [10, 20, 30][-1]?",
    options: ["10", "20", "30", "IndexError"],
    correctAnswer: "30",
    explanation: "Negative indices count from the end, so index -1 refers to the last element."
  },
  {
    topic: "Lists and Tuples",
    difficulty: "Medium",
    question: "Which statement about tuples is TRUE?",
    options: [
      "They are mutable",
      "They are immutable",
      "They cannot contain mixed data types",
      "They support the append() method"
    ],
    correctAnswer: "They are immutable",
    explanation: "Once created, a tuple's contents cannot be changed; tuples can still hold mixed types."
  },
  {
    topic: "Lists and Tuples",
    difficulty: "Medium",
    question: "What is the output of [x * 2 for x in range(3)]?",
    options: ["[0, 2, 4]", "[2, 4, 6]", "[0, 1, 2]", "[0, 2, 4, 6]"],
    correctAnswer: "[0, 2, 4]",
    explanation: "range(3) yields 0, 1, 2, and doubling each gives [0, 2, 4]."
  },
  {
    topic: "Lists and Tuples",
    difficulty: "Medium",
    question: "What does lst.pop() do when called with no argument?",
    options: [
      "Removes the first element",
      "Removes and returns the last element",
      "Removes all elements",
      "Raises an IndexError on non-empty lists"
    ],
    correctAnswer: "Removes and returns the last element",
    explanation: "pop() with no argument removes the final item and returns it; pop(i) removes the item at index i."
  },
  {
    topic: "Lists and Tuples",
    difficulty: "Medium",
    question: "How do you create a tuple containing exactly one element?",
    options: ["t = (1)", "t = (1,)", "t = tuple(1)", "t = [1]"],
    correctAnswer: "t = (1,)",
    explanation: "Without the trailing comma, (1) is just the integer 1 in parentheses; the comma is what makes it a tuple."
  },
  {
    topic: "Lists and Tuples",
    difficulty: "Medium",
    question: "What is the difference between sorted(lst) and lst.sort()?",
    options: [
      "They behave identically",
      "sorted() returns a new sorted list while lst.sort() sorts in place and returns None",
      "lst.sort() returns a new list while sorted() sorts in place",
      "sorted() only works on lists of numbers"
    ],
    correctAnswer: "sorted() returns a new sorted list while lst.sort() sorts in place and returns None",
    explanation: "sorted() is a built-in that works on any iterable and returns a new list; sort() mutates the list itself and returns None."
  },
  {
    topic: "Lists and Tuples",
    difficulty: "Medium",
    question: "What is the output of list(zip([1, 2], [\"a\", \"b\"]))?",
    options: ["[[1, 'a'], [2, 'b']]", "[(1, 'a'), (2, 'b')]", "(1, 'a', 2, 'b')", "{1: 'a', 2: 'b'}"],
    correctAnswer: "[(1, 'a'), (2, 'b')]",
    explanation: "zip pairs corresponding elements from each iterable into tuples, and list() collects them into a list."
  },
  {
    topic: "Lists and Tuples",
    difficulty: "Medium",
    question: "What is the output of [1, 2, 3, 4, 5][1:4]?",
    options: ["[1, 2, 3]", "[2, 3, 4]", "[2, 3, 4, 5]", "[1, 2, 3, 4]"],
    correctAnswer: "[2, 3, 4]",
    explanation: "Slicing includes the start index (1) but excludes the stop index (4), yielding elements at indices 1, 2, and 3."
  },

  {
    topic: "Dictionaries and Sets",
    difficulty: "Medium",
    question: "What happens when you access a missing key with d[\"key\"]?",
    options: ["Returns None", "Returns an empty string", "Raises a KeyError", "Creates the key with value None"],
    correctAnswer: "Raises a KeyError",
    explanation: "Direct subscript access on a nonexistent key raises KeyError; use get() to avoid the error."
  },
  {
    topic: "Dictionaries and Sets",
    difficulty: "Medium",
    question: "What does d.get(\"missing\", 0) return if \"missing\" is not a key in d?",
    options: ["KeyError", "None", "0", "False"],
    correctAnswer: "0",
    explanation: "get() returns the provided default value instead of raising an error when the key is absent."
  },
  {
    topic: "Dictionaries and Sets",
    difficulty: "Medium",
    question: "Which dictionary method lets you iterate over keys and values together?",
    options: ["keys()", "values()", "items()", "pairs()"],
    correctAnswer: "items()",
    explanation: "items() yields (key, value) tuples, allowing loops like `for k, v in d.items():`."
  },
  {
    topic: "Dictionaries and Sets",
    difficulty: "Medium",
    question: "What is the output of len({1, 2, 2, 3, 3, 3})?",
    options: ["6", "3", "1", "0"],
    correctAnswer: "3",
    explanation: "Sets discard duplicates, so the set contains {1, 2, 3} and its length is 3."
  },
  {
    topic: "Dictionaries and Sets",
    difficulty: "Medium",
    question: "Which type is an immutable (hashable) version of a set?",
    options: ["set", "frozenset", "dict", "tuple"],
    correctAnswer: "frozenset",
    explanation: "frozenset cannot be modified after creation, making it hashable and usable as a dictionary key or set member."
  },
  {
    topic: "Dictionaries and Sets",
    difficulty: "Medium",
    question: "What is the result of {1, 2, 3} | {3, 4, 5}?",
    options: ["{1, 2, 3}", "{3, 4, 5}", "{1, 2, 3, 4, 5}", "{3}"],
    correctAnswer: "{1, 2, 3, 4, 5}",
    explanation: "The | operator computes the union of two sets, combining all unique elements from both."
  },
  {
    topic: "Dictionaries and Sets",
    difficulty: "Medium",
    question: "How do you check whether the key \"name\" exists in dictionary d?",
    options: ["d.has(\"name\")", "\"name\" in d", "d.contains(\"name\")", "d.exists(\"name\")"],
    correctAnswer: "\"name\" in d",
    explanation: "The in operator tests membership against a dictionary's keys in O(1) average time."
  },
  {
    topic: "Dictionaries and Sets",
    difficulty: "Medium",
    question: "What is the output of {x: x ** 2 for x in range(3)}?",
    options: ["{0: 0, 1: 1, 2: 4}", "{0, 1, 4}", "[0, 1, 4]", "{1: 1, 2: 4, 3: 9}"],
    correctAnswer: "{0: 0, 1: 1, 2: 4}",
    explanation: "This dict comprehension maps each number from 0 to 2 to its square."
  },

  {
    topic: "OOP in Python",
    difficulty: "Medium",
    question: "What is the role of the __init__ method in a Python class?",
    options: [
      "It deletes an object",
      "It initializes a newly created object's attributes",
      "It prints the object",
      "It compares two objects"
    ],
    correctAnswer: "It initializes a newly created object's attributes",
    explanation: "__init__ is the constructor called automatically when an instance is created, setting up its initial state."
  },
  {
    topic: "OOP in Python",
    difficulty: "Medium",
    question: "What does `self` refer to inside an instance method?",
    options: [
      "The class itself",
      "The specific instance the method was called on",
      "The parent class",
      "The module namespace"
    ],
    correctAnswer: "The specific instance the method was called on",
    explanation: "self is a reference to the current instance, letting each method access that object's attributes and other methods."
  },
  {
    topic: "OOP in Python",
    difficulty: "Medium",
    question: "What is the correct syntax for a class Child inheriting from Parent?",
    options: [
      "class Child extends Parent:",
      "class Child(Parent):",
      "class Child inherits Parent:",
      "class Child: Parent:"
    ],
    correctAnswer: "class Child(Parent):",
    explanation: "Inheritance is declared by listing parent classes in parentheses after the child class name."
  },
  {
    topic: "OOP in Python",
    difficulty: "Medium",
    question: "Inside a child class constructor, what does super().__init__() do?",
    options: [
      "Calls the child's constructor again",
      "Calls the parent class constructor so inherited initialization runs",
      "Creates a brand-new independent instance",
      "Deletes inherited methods"
    ],
    correctAnswer: "Calls the parent class constructor so inherited initialization runs",
    explanation: "super() returns a proxy of the parent class, letting the child invoke the parent's __init__ to initialize inherited state."
  },
  {
    topic: "OOP in Python",
    difficulty: "Medium",
    question: "Redefining a method inherited from a parent class within a child class is called:",
    options: ["Overloading", "Overriding", "Encapsulation", "Instantiation"],
    correctAnswer: "Overriding",
    explanation: "Overriding replaces the parent implementation with the child's version for instances of the child class."
  },
  {
    topic: "OOP in Python",
    difficulty: "Hard",
    question: "What is the effect of naming an attribute with double underscores, e.g. __balance, inside a class?",
    options: [
      "It becomes globally accessible",
      "Name mangling rewrites it to _ClassName__balance, discouraging external access",
      "It makes the class abstract",
      "Double underscores have no special meaning for attributes"
    ],
    correctAnswer: "Name mangling rewrites it to _ClassName__balance, discouraging external access",
    explanation: "Python mangles double-leading-underscore names into _ClassName__attr to avoid collisions in subclasses and signal privacy by convention."
  },
  {
    topic: "OOP in Python",
    difficulty: "Medium",
    question: "How does a @staticmethod differ from a regular instance method?",
    options: [
      "It receives self automatically",
      "It receives neither self nor cls and behaves like a plain function grouped inside the class",
      "It can only be called on instances, never on the class",
      "It must always return None"
    ],
    correctAnswer: "It receives neither self nor cls and behaves like a plain function grouped inside the class",
    explanation: "@staticmethod methods take no implicit first argument and cannot access instance or class state directly."
  },
  {
    topic: "OOP in Python",
    difficulty: "Medium",
    question: "What is the conventional first parameter of a @classmethod?",
    options: ["self", "cls", "this", "class"],
    correctAnswer: "cls",
    explanation: "Classmethods receive the class itself as their first argument, conventionally named cls."
  },
  {
    topic: "OOP in Python",
    difficulty: "Medium",
    question: "What best describes polymorphism in Python?",
    options: [
      "Writing multiple constructors in one class",
      "Different classes providing implementations of the same method interface, usable interchangeably",
      "Hiding internal data behind accessor methods",
      "Splitting code across many modules"
    ],
    correctAnswer: "Different classes providing implementations of the same method interface, usable interchangeably",
    explanation: "Polymorphism allows code to call the same method on objects of different classes and get behavior specific to each class."
  },
  {
    topic: "OOP in Python",
    difficulty: "Medium",
    question: "What is the purpose of the __str__ method in a class?",
    options: [
      "It converts the object to bytes",
      "It returns a readable string representation used by print() and str()",
      "It compares two objects for equality",
      "It hashes the object for storage"
    ],
    correctAnswer: "It returns a readable string representation used by print() and str()",
    explanation: "Defining __str__ controls what users see when printing an instance; __repr__ serves debugging purposes."
  },
  {
    topic: "OOP in Python",
    difficulty: "Hard",
    question: "Which standard library module provides the base class for defining abstract base classes?",
    options: ["abstract", "abc", "baseclasses", "interfaces"],
    correctAnswer: "abc",
    explanation: "The abc module provides ABCMeta and @abstractmethod to define abstract base classes that enforce method implementation in subclasses."
  },
  {
    topic: "OOP in Python",
    difficulty: "Hard",
    question: "How does Python determine the method resolution order (MRO) under multiple inheritance?",
    options: [
      "Alphabetical ordering of parent classes",
      "The C3 linearization algorithm, viewable via ClassName.__mro__",
      "Reverse declaration order of parents",
      "Random selection at runtime"
    ],
    correctAnswer: "The C3 linearization algorithm, viewable via ClassName.__mro__",
    explanation: "CPython uses C3 linearization to produce a consistent MRO that preserves hierarchy constraints; it is exposed through __mro__."
  },

  {
    topic: "File Handling and Modules",
    difficulty: "Medium",
    question: "Which file mode opens a file for writing, creating it if needed and truncating it if it exists?",
    options: ["r", "w", "a", "x"],
    correctAnswer: "w",
    explanation: "\"w\" mode creates an empty file or wipes existing content before writing."
  },
  {
    topic: "File Handling and Modules",
    difficulty: "Medium",
    question: "Which mode opens a file so new content is added at the end of existing content?",
    options: ["r", "w", "a", "rb"],
    correctAnswer: "a",
    explanation: "\"a\" (append) mode writes new data after the existing contents without truncating them."
  },
  {
    topic: "File Handling and Modules",
    difficulty: "Medium",
    question: "What is the main benefit of using `with open(...) as f:`?",
    options: [
      "Files open faster",
      "The file is closed automatically, even if an exception occurs inside the block",
      "The file gets encrypted",
      "It loads the whole file into memory as a string"
    ],
    correctAnswer: "The file is closed automatically, even if an exception occurs inside the block",
    explanation: "The with statement uses context managers so cleanup (closing the file) happens reliably regardless of errors."
  },
  {
    topic: "File Handling and Modules",
    difficulty: "Medium",
    question: "What does f.readlines() return?",
    options: [
      "One big string with the entire file",
      "A list of lines, each ending with \\n",
      "A dictionary mapping line numbers to text",
      "The number of lines in the file"
    ],
    correctAnswer: "A list of lines, each ending with \\n",
    explanation: "readlines() splits the file content at newline characters and returns them as a list of strings including \\n."
  },
  {
    topic: "File Handling and Modules",
    difficulty: "Medium",
    question: "Which statement imports only the sqrt function from the math module?",
    options: [
      "import sqrt from math",
      "from math import sqrt",
      "include math.sqrt",
      "import math.sqrt as sqrt"
    ],
    correctAnswer: "from math import sqrt",
    explanation: "`from math import sqrt` brings sqrt into the current namespace so it can be called directly."
  },
  {
    topic: "File Handling and Modules",
    difficulty: "Medium",
    question: "What extension do compiled Python bytecode cache files have?",
    options: [".pyc", ".pyo", ".pt", ".pyd"],
    correctAnswer: ".pyc",
    explanation: "Imported modules are compiled to bytecode and cached as .pyc files inside __pycache__ directories."
  },
  {
    topic: "File Handling and Modules",
    difficulty: "Medium",
    question: "Which os module function returns the current working directory?",
    options: ["os.getcwd()", "os.dir()", "os.current_dir()", "os.pwd()"],
    correctAnswer: "os.getcwd()",
    explanation: "os.getcwd() stands for 'get current working directory'."
  },
  {
    topic: "File Handling and Modules",
    difficulty: "Medium",
    question: "What does random.randint(1, 10) return?",
    options: [
      "A float between 1 and 10",
      "A random integer between 1 and 10 inclusive",
      "Exactly the value 10",
      "A random element chosen from a list"
    ],
    correctAnswer: "A random integer between 1 and 10 inclusive",
    explanation: "randint(a, b) samples uniformly from integers a through b, including both endpoints."
  },
  {
    topic: "File Handling and Modules",
    difficulty: "Medium",
    question: "What happens if you open a nonexistent file in \"r\" mode?",
    options: [
      "The file is created automatically",
      "A FileNotFoundError is raised",
      "An empty string is returned silently",
      "The program waits until the file appears"
    ],
    correctAnswer: "A FileNotFoundError is raised",
    explanation: "Read mode requires the file to exist; otherwise Python raises FileNotFoundError."
  },
  {
    topic: "File Handling and Modules",
    difficulty: "Medium",
    question: "What is the value of the __name__ variable inside a module that has been imported?",
    options: [
      "The module's full file path",
      "The module's name (its filename without the .py extension)",
      "__main__",
      "The package's name"
    ],
    correctAnswer: "The module's name (its filename without the .py extension)",
    explanation: "__name__ equals \"__main__\" only when a file is run directly; imported modules get their own module name."
  },

  {
    topic: "Advanced Concepts",
    difficulty: "Hard",
    question: "What does the yield keyword do in a function?",
    options: [
      "Returns one value and permanently exits the function",
      "Produces a value, pauses execution, and turns the function into a generator",
      "Raises an exception safely",
      "Declares a global variable"
    ],
    correctAnswer: "Produces a value, pauses execution, and turns the function into a generator",
    explanation: "Using yield makes the function a generator whose execution resumes after each yielded value on the next request."
  },
  {
    topic: "Advanced Concepts",
    difficulty: "Hard",
    question: "What is a decorator in Python?",
    options: [
      "A design pattern reserved for GUI programming",
      "A callable that wraps another function to extend its behavior without modifying it",
      "A special kind of comment annotation",
      "A subclass of the list type"
    ],
    correctAnswer: "A callable that wraps another function to extend its behavior without modifying it",
    explanation: "Decorators take a function as input and return a wrapped version, commonly applied with the @ syntax."
  },
  {
    topic: "Advanced Concepts",
    difficulty: "Hard",
    question: "What is the Global Interpreter Lock (GIL) in CPython?",
    options: [
      "A mechanism that encrypts Python files",
      "A mutex that allows only one thread to execute Python bytecode at a time",
      "A lock applied to global variables during imports",
      "The component responsible for garbage collection"
    ],
    correctAnswer: "A mutex that allows only one thread to execute Python bytecode at a time",
    explanation: "The GIL serializes bytecode execution among threads in CPython, limiting CPU-bound multithreading performance."
  },
  {
    topic: "Advanced Concepts",
    difficulty: "Hard",
    question: "What is a closure in Python?",
    options: [
      "A properly closed file handle",
      "A function that remembers variables from its enclosing scope even after the outer function finishes",
      "A technique for ending loops early",
      "A private attribute of a class"
    ],
    correctAnswer: "A function that remembers variables from its enclosing scope even after the outer function finishes",
    explanation: "Inner functions capture free variables from enclosing scopes, keeping them alive via the function's __closure__."
  },
  {
    topic: "Advanced Concepts",
    difficulty: "Hard",
    question: "What is the output?\n\ndef counter():\n    count = 0\n    def inc():\n        nonlocal count\n        count += 1\n        return count\n    return inc\nc = counter()\nprint(c(), c())",
    options: ["1 1", "1 2", "2 2", "Error"],
    correctAnswer: "1 2",
    explanation: "inc closes over count; each call increments and returns the shared counter, yielding 1 then 2."
  },
  {
    topic: "Advanced Concepts",
    difficulty: "Hard",
    question: "What does applying functools.lru_cache to a function accomplish?",
    options: [
      "Limits the maximum recursion depth",
      "Memoizes results of previous calls so repeated calls with the same arguments return instantly",
      "Converts the function into a class",
      "Executes the function in parallel threads"
    ],
    correctAnswer: "Memoizes results of previous calls so repeated calls with the same arguments return instantly",
    explanation: "lru_cache stores computed results in a least-recently-used cache keyed by the call arguments."
  },
  {
    topic: "Advanced Concepts",
    difficulty: "Hard",
    question: "Which pair of methods makes an object usable as a context manager with the with statement?",
    options: ["__start__ and __stop__", "__enter__ and __exit__", "__open__ and __close__", "__begin__ and __end__"],
    correctAnswer: "__enter__ and __exit__",
    explanation: "with calls __enter__ on entry and guarantees __exit__ runs on exit, enabling reliable resource management."
  },
  {
    topic: "Advanced Concepts",
    difficulty: "Hard",
    question: "Why are generators more memory-efficient than lists?",
    options: [
      "They compress their data internally",
      "They yield items lazily one at a time instead of materializing the whole sequence in memory",
      "They store data directly on disk",
      "They convert everything to binary strings"
    ],
    correctAnswer: "They yield items lazily one at a time instead of materializing the whole sequence in memory",
    explanation: "Generators compute each value on demand and hold only the current state, avoiding the cost of storing every element."
  },
  {
    topic: "Advanced Concepts",
    difficulty: "Hard",
    question: "What is the output?\n\na = [1, 2, [3, 4]]\nb = a.copy()\nb[2][0] = 99\nprint(a[2][0])",
    options: ["3", "99", "None", "IndexError"],
    correctAnswer: "99",
    explanation: "copy() performs a shallow copy, so the nested list is shared and mutating it through b also changes a."
  },
  {
    topic: "Advanced Concepts",
    difficulty: "Hard",
    question: "How does copy.deepcopy() differ from copy.copy()?",
    options: [
      "There is no practical difference",
      "deepcopy recursively copies nested objects so the copies share no references",
      "copy() writes the object to disk",
      "deepcopy works only on dictionaries"
    ],
    correctAnswer: "deepcopy recursively copies nested objects so the copies share no references",
    explanation: "deepcopy clones the entire object graph, while shallow copy duplicates only the outermost container."
  },
  {
    topic: "Advanced Concepts",
    difficulty: "Hard",
    question: "What is the output of print(*[1, 2, 3], sep=\"-\")?",
    options: ["123", "1-2-3", "[1, 2, 3]", "1 2 3"],
    correctAnswer: "1-2-3",
    explanation: "The * unpacks the list into separate positional arguments, and sep=\"-\" joins them with dashes."
  },
  {
    topic: "Advanced Concepts",
    difficulty: "Hard",
    question: "What is duck typing in Python?",
    options: [
      "Static type checking performed before runtime",
      "Judging an object's suitability by the methods/behavior it supports rather than its explicit type",
      "A typing style requiring every variable declaration",
      "Naming conventions inspired by birds"
    ],
    correctAnswer: "Judging an object's suitability by the methods/behavior it supports rather than its explicit type",
    explanation: "Duck typing follows the idea: if it walks and quacks like the expected interface, it can be used, regardless of its actual class."
  }
];

async function main() {
  try {
    console.log(`Seeding ${questions.length} Python questions into questionBank...`);
    let inserted = 0;
    for (const q of questions) {
      const opts = JSON.stringify(q.options);
      await sql`INSERT INTO "questionBank" (course, topic, difficulty, question, options, "correctAnswer", explanation) VALUES ('Python', ${q.topic}, ${q.difficulty}, ${q.question}, ${opts}, ${q.correctAnswer}, ${q.explanation})`;
      inserted++;
      if (inserted % 10 === 0) {
        console.log(`Inserted ${inserted}/${questions.length}`);
      }
    }
    const [{ count }] = await sql`SELECT COUNT(*)::int AS count FROM "questionBank" WHERE course = 'Python'`;
    console.log(`Done. Inserted ${inserted} questions. Total Python questions in questionBank: ${count}`);
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exitCode = 1;
  }
}

main();
