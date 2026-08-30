/**
 * Seed script: courses -> units -> lessons -> challenges -> challenges_options
 * Uses Neon serverless with tagged template literals for all queries.
 */
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env.local') });
const { neon } = require('@neondatabase/serverless');

const sql = neon(process.env.DRIZZLE_DB_URL);

// course.units: [title, description, lessons]
// lesson: [title, challenges]
// challenge: [question, [[optionText, isCorrect], ...]]
const COURSES = [
  {
    title: 'C Programming',
    imageSrc: '/courses/c-lang.svg',
    units: [
      ['Introduction to C', 'Get started with the C programming language basics', [
        ['Hello World Program', [
          ['What function is used to print output in C?', [['printf()', true], ['print()', false], ['echo()', false], ['console.log()', false]]],
          ['Which header file is required for printf?', [['stdio.h', true], ['stdlib.h', false], ['string.h', false], ['math.h', false]]],
          ['What is the return type of main()?', [['int', true], ['void', false], ['char', false], ['float', false]]],
        ]],
        ['Compilation Process', [
          ['Which command compiles C code using GCC?', [['gcc', true], ['javac', false], ['node', false], ['python', false]]],
          ['What does the preprocessor handle?', [['#include directives', true], ['Linking libraries', false], ['Allocating memory', false], ['Running tests', false]]],
          ['Which stage turns object files into an executable?', [['Linking', true], ['Preprocessing', false], ['Parsing', false], ['Commenting', false]]],
        ]],
        ['Basic Syntax', [
          ['Which character terminates a C statement?', [[';', true], [':', false], ['.', false], [',', false]]],
          ['Multi-line comments in C are written as?', [['/* comment */', true], ['// comment', false], ['<!-- comment -->', false], ['# comment', false]]],
          ['Which is a valid variable name?', [['my_var', true], ['2cool', false], ['int', false], ['my-var', false]]],
        ]],
      ]],
      ['Variables and Data Types', 'Learn how to store and manipulate data in C', [
        ['Primitive Data Types', [
          ['Which is NOT a built-in C data type?', [['string', true], ['char', false], ['double', false], ['long', false]]],
          ['Typical size of int on modern systems?', [['4 bytes', true], ['1 byte', false], ['2 bytes', false], ['16 bytes', false]]],
          ['Which type stores a single character?', [['char', true], ['string', false], ['byte', false], ['letter', false]]],
        ]],
        ['Type Modifiers', [
          ['Which modifier restricts a variable to non-negative values?', [['unsigned', true], ['signed', false], ['static', false], ['extern', false]]],
          ['Which keyword makes a value unchangeable?', [['const', true], ['volatile', false], ['register', false], ['mutable', false]]],
          ['short int typically uses how many bytes?', [['2', true], ['1', false], ['4', false], ['8', false]]],
        ]],
        ['Type Conversion', [
          ['Explicit conversion between types is called?', [['Casting', true], ['Parsing', false], ['Boxing', false], ['Linking', false]]],
          ["In 3 + 2.5, what happens to 3?", [['It is promoted to double', true], ['2.5 becomes int', false], ['It causes an error', false], ['Both become char', false]]],
          ['(int)7.9 evaluates to?', [['7', true], ['8', false], ['7.9', false], ['0', false]]],
        ]],
      ]],
      ['Control Flow', 'Direct the execution path of your programs', [
        ['if-else Statements', [
          ['Which operator compares two values for equality?', [['==', true], ['=', false], ['===', false], ['!=', false]]],
          ['Which operator is the logical AND?', [['&&', true], ['||', false], ['!', false], ['++', false]]],
          ['Which keyword handles the negative branch?', [['else', true], ['or', false], ['unless', false], ['finally', false]]],
        ]],
        ['Switch Case', [
          ['Which statement exits a switch case?', [['break', true], ['continue', false], ['pass', false], ['yield', false]]],
          ['Without break, execution will?', [['Fall through to the next case', true], ['Exit immediately', false], ['Cause a compile error', false], ['Restart the switch', false]]],
          ['Which label runs when no case matches?', [['default', true], ['other', false], ['catch', false], ['none', false]]],
        ]],
        ['Looping Constructs', [
          ['Which loop is guaranteed to run at least once?', [['do-while', true], ['while', false], ['for', false], ['goto', false]]],
          ['Which statement jumps to the next iteration?', [['continue', true], ['break', false], ['goto', false], ['switch', false]]],
          ['for(i=0; i<5; i++) runs how many iterations?', [['5', true], ['4', false], ['6', false], ['Infinite', false]]],
        ]],
      ]],
      ['Functions', 'Organize code into reusable blocks', [
        ['Function Declaration', [
          ['A function prototype tells the compiler its?', [['Name, return type and parameters', true], ['Memory address', false], ['Line number', false], ['Assembly code', false]]],
          ['A void function returns?', [['Nothing', true], ['0', false], ['NULL', false], ['-1', false]]],
          ['Parameters listed in a function definition are called?', [['Formal parameters', true], ['Global variables', false], ['Macros', false], ['Registers', false]]],
        ]],
        ['Scope and Lifetime', [
          ['Variables declared inside a function are?', [['Local', true], ['Global', false], ['External', false], ['Constant', false]]],
          ['Which storage class retains its value between calls?', [['static', true], ['auto', false], ['register', false], ['extern', false]]],
          ['A global variable is visible?', [['Throughout the file after its declaration', true], ['Only inside main()', false], ['Only in loops', false], ['Nowhere else', false]]],
        ]],
        ['Recursion', [
          ['Every recursive function needs a?', [['Base case', true], ['Pointer', false], ['Global counter', false], ['Static array', false]]],
          ['Each recursive call is stored on the?', [['Stack', true], ['Heap', false], ['Disk', false], ['Cache', false]]],
          ['A missing base case leads to?', [['Stack overflow', true], ['Syntax error', false], ['Faster code', false], ['Type mismatch', false]]],
        ]],
      ]],
      ['Arrays and Strings', 'Work with collections of data', [
        ['One-dimensional Arrays', [
          ['First index of int arr[5]?', [['0', true], ['1', false], ['-1', false], ['Depends on compiler', false]]],
          ['int nums[10]; holds how many ints?', [['10', true], ['9', false], ['11', false], ['Unknown', false]]],
          ['All elements of a C array must be?', [['The same type', true], ['Different types', false], ['Pointers', false], ['Characters', false]]],
        ]],
        ['Multi-dimensional Arrays', [
          ['Correct 2D array declaration?', [['int grid[3][4];', true], ['int grid[3,4];', false], ['int grid(3)(4);', false], ['array<int>[3][4];', false]]],
          ['Elements in int m[2][5]?', [['10', true], ['7', false], ['25', false], ['2', false]]],
          ['m[1][2] refers to?', [['Row 1, column 2', true], ['Row 2, column 1', false], ['Row 12', false], ['Invalid access', false]]],
        ]],
        ['String Handling', [
          ['C strings terminate with?', [["'\\0' (null terminator)", true], ['Newline character', false], ['A space', false], ['EOF flag', false]]],
          ['Which function returns string length?', [['strlen()', true], ['length()', false], ['size()', false], ['count()', false]]],
          ['strcpy(a, b) does what?', [['Copies b into a', true], ['Compares a and b', false], ['Concatenates onto b', false], ['Prints both', false]]],
        ]],
      ]],
      ['Pointers', 'Master memory addresses and indirection', [
        ['Pointer Basics', [
          ['& applied to a variable gives?', [['Its memory address', true], ['Its value', false], ['Its type', false], ['Its size', false]]],
          ['Valid pointer declaration?', [['int *p;', true], ['int p&;', false], ['ptr@ p;', false], ['int &p;', false]]],
          ['*p dereferencing means?', [['Accessing the value p points to', true], ['Multiplying p by 2', false], ['Getting address of p', false], ['Declaring p', false]]],
        ]],
        ['Pointer Arithmetic', [
          ['p++ where p is int* advances by?', [['sizeof(int) bytes', true], ['Exactly 1 byte', false], ['1 bit', false], ['Zero bytes', false]]],
          ['p1 - p2 within one array yields?', [['Number of elements apart', true], ['Sum of addresses', false], ['Always 1', false], ['Undefined crash', false]]],
          ['Adding two pointers directly is?', [['Not allowed', true], ['Allowed and common', false], ['Allowed only for char*', false], ['Same as subtraction', false]]],
        ]],
        ['Pointers and Arrays', [
          ['arr[3] is equivalent to?', [['*(arr + 3)', true], ['*arr + 3', false], ['&(arr + 3)', false], ['arr + 3', false]]],
          ['An array name in an expression decays to?', [['Pointer to its first element', true], ['Integer 0', false], ['Last element', false], ['Its total size', false]]],
          ['sizeof(arr) where arr is int[10] returns?', [['40 on typical systems', true], ['10', false], ['Size of a pointer', false], ['1', false]]],
        ]],
      ]],
    ],
  },
  {
    title: 'C++',
    imageSrc: '/courses/cpp-lang.svg',
    units: [
      ['Introduction to C++', 'Transition from C to modern C++', [
        ['C++ vs C', [
          ['Major feature C++ adds over C?', [['Classes and objects', true], ['Pointers', false], ['Loops', false], ['Header files', false]]],
          ['Who created C++?', [['Bjarne Stroustrup', true], ['Dennis Ritchie', false], ['Ken Thompson', false], ['James Gosling', false]]],
          ['C++ was originally called?', [['C with Classes', true], ['C Plus', false], ['Objective C', false], ['New C', false]]],
        ]],
        ['Namespaces', [
          ['Keyword used to declare a namespace?', [['namespace', true], ['module', false], ['package', false], ['scope', false]]],
          ['std stands for?', [['Standard library namespace', true], ['String typedef', false], ['Struct table', false], ['System temp dir', false]]],
          ['Effect of using namespace std;?', [['Lets you skip the std:: prefix', true], ['Imports Java packages', false], ['Creates a new namespace', false], ['Disables headers', false]]],
        ]],
        ['Input/Output Streams', [
          ['Which object writes to standard output?', [['cout', true], ['cin', false], ['cerr', false], ['scanf', false]]],
          ['Operator used with cin to read data?', [['>>', true], ['<<', false], ['=>', false], ['::', false]]],
          ['Header declaring cin and cout?', [['iostream', true], ['cstdio', false], ['stream', false], ['conio.h', false]]],
        ]],
      ]],
      ['OOP Fundamentals', 'Classes, objects and the pillars of object-oriented design', [
        ['Classes and Objects', [
          ['A class is best described as a?', [['Blueprint for objects', true], ['Live object itself', false], ['Compiled binary', false], ['Namespace alias', false]]],
          ['Default access level of class members?', [['private', true], ['public', false], ['protected', false], ['internal', false]]],
          ['Method called automatically on creation?', [['Constructor', true], ['Destructor', false], ['main()', false], ['friend()', false]]],
        ]],
        ['Inheritance', [
          ['class Car : public Vehicle means?', [['Car inherits Vehicle', true], ['Vehicle inherits Car', false], ['Car is a friend of Vehicle', false], ['They are unrelated', false]]],
          ['Multiple inheritance allows?', [['More than one base class', true], ['Two constructors', false], ['Nested namespaces', false], ['Virtual machines', false]]],
          ['The diamond problem relates to?', [['Ambiguous inherited members', true], ['Sorting algorithms', false], ['Pointer arithmetic', false], ['File streams', false]]],
        ]],
        ['Polymorphism', [
          ['Keyword enabling dynamic dispatch?', [['virtual', true], ['static', false], ['inline', false], ['const', false]]],
          ['Function overloading requires?', [['Different parameter lists', true], ['Different return types only', false], ['Different class names', false], ['Virtual keyword', false]]],
          ['Pure virtual function is written as?', [['virtual void f() = 0;', true], ['pure virtual f();', false], ['abstract void f();', false], ['virtual f() pure;', false]]],
        ]],
      ]],
      ['Memory Management', 'Manage dynamic memory safely and efficiently', [
        ['new and delete', [
          ['new allocates memory on the?', [['Heap', true], ['Stack', false], ['Register', false], ['ROM', false]]],
          ['Matching deallocator for new?', [['delete', true], ['free()', false], ['destroy()', false], ['clear()', false]]],
          ['Failing to delete allocated memory causes?', [['Memory leak', true], ['Compile error', false], ['Faster program', false], ['Auto cleanup', false]]],
        ]],
        ['Smart Pointers', [
          ['Smart pointer with exclusive ownership?', [['unique_ptr', true], ['shared_ptr', false], ['weak_ptr', false], ['raw_ptr', false]]],
          ['Ownership shared among several owners?', [['shared_ptr', true], ['unique_ptr', false], ['weak_ptr', false], ['auto_ptr', false]]],
          ['Smart pointers are declared in header?', [['memory', true], ['pointer', false], ['alloc', false], ['smart.h', false]]],
        ]],
        ['Memory Leaks', [
          ['A leak happens when allocated memory is?', [['Never freed', true], ['Freed twice', false], ['On the stack', false], ['Read-only', false]]],
          ['Popular tool for detecting leaks?', [['Valgrind', true], ['GCC', false], ['Make', false], ['Git', false]]],
          ['Arrays allocated with new[] are freed with?', [['delete[]', true], ['delete', false], ['free()', false], ['remove[]', false]]],
        ]],
      ]],
      ['STL and Algorithms', 'Standard containers and generic algorithms', [
        ['Vectors and Lists', [
          ['std::vector offers?', [['Fast random access', true], ['Sorted order always', false], ['Fixed capacity', false], ['Key-based lookup', false]]],
          ['std::list shines at?', [['Inserting/erasing mid-sequence', true], ['Random access', false], ['Hash lookups', false], ['Bit operations', false]]],
          ['push_back on a vector adds element?', [['At the end', true], ['At the front', false], ['At sorted position', false], ['Random slot', false]]],
        ]],
        ['Maps and Sets', [
          ['std::map stores?', [['Key-value pairs', true], ['Single values', false], ['Raw pointers', false], ['Bits', false]]],
          ['std::set contains?', [['Unique sorted keys', true], ['Duplicate entries', false], ['Only integers', false], ['Unordered pairs', false]]],
          ['map insertion/lookup complexity?', [['O(log n)', true], ['O(n^2)', false], ['O(n!)', false], ['O(1) guaranteed', false]]],
        ]],
        ['Algorithm Library', [
          ['std::sort lives in header?', [['algorithm', true], ['sorting', false], ['numeric', false], ['vector', false]]],
          ['STL algorithms operate through?', [['Iterators', true], ['Indices only', false], ['SQL queries', false], ['Macros', false]]],
          ['std::find_if requires?', [['A predicate callable', true], ['A hash table', false], ['A mutex', false], ['An ostream', false]]],
        ]],
      ]],
      ['Advanced C++ Features', 'Modern C++ capabilities for expressive code', [
        ['Lambda Expressions', [
          ['Lambda introducer syntax?', [['[]', true], ['{}', false], ['()', false], ['<>', false]]],
          ['[=] captures variables by?', [['Value', true], ['Reference', false], ['Pointer', false], ['Move only', false]]],
          ['[&] captures variables by?', [['Reference', true], ['Value', false], ['Const copy', false], ['Nothing', false]]],
        ]],
        ['Move Semantics', [
          ['Move semantics were standardized in?', [['C++11', true], ['C++98', false], ['C89', false], ['C++03', false]]],
          ['std::move actually?', [['Casts to an rvalue reference', true], ['Copies bytes', false], ['Deletes the object', false], ['Locks memory', false]]],
          ['Rvalue references use which symbol?', [['&&', true], ['&', false], ['**', false], ['~', false]]],
        ]],
        ['constexpr', [
          ['constexpr enables evaluation at?', [['Compile time', true], ['Runtime only', false], ['Load time', false], ['Never', false]]],
          ['constexpr array sizes permit?', [['Compile-time sized arrays and template args', true], ['Dynamic allocation', false], ['Runtime growth', false], ['Garbage collection', false]]],
          ['On variables, constexpr implies?', [['const', true], ['static', false], ['inline always', false], ['volatile', false]]],
        ]],
      ]],
      ['Templates and Generic Programming', 'Write reusable, type-safe generic code', [
        ['Function Templates', [
          ['template<typename T> introduces?', [['A generic function or class', true], ['A macro', false], ['A namespace', false], ['An enum', false]]],
          ['Template code is generated at?', [['Instantiation', true], ['Link time', false], ['Runtime', false], ['Never', false]]],
          ['Calling max<int>(3, 5) is?', [['Explicit instantiation', true], ['Full specialization', false], ['Overload resolution error', false], ['SFINAE', false]]],
        ]],
        ['Class Templates', [
          ['vector<double> is a?', [['Class template instantiation', true], ['Function template', false], ['Macro expansion', false], ['Type alias only', false]]],
          ['Out-of-class template member definitions repeat?', [['template<typename T>', true], ['export keyword', false], ['friend prefix', false], ['static block', false]]],
          ['Default template argument example?', [['template<class T = int>', true], ['template<class T := int>', false], ['default<T>(int)', false], ['template int T;', false]]],
        ]],
        ['Template Specialization', [
          ['Full specialization targets?', [['One exact type', true], ['All types equally', false], ['No types', false], ['Macros', false]]],
          ['Partial specialization is allowed for?', [['Class templates', true], ['Function templates', false], ['Enums', false], ['Namespaces', false]]],
          ['Full specialization syntax uses?', [['template<>', true], ['template[]', false], ['specialize<>', false], ['override template', false]]],
        ]],
      ]],
    ],
  },
  {
    title: 'Python',
    imageSrc: '/courses/python.svg',
    units: [
      ['Python Basics', 'Start your Python journey with core concepts', [
        ['Variables and Naming', [
          ['Creating a variable in Python requires?', [['Just assignment with =', true], ['var keyword', false], ['let keyword', false], ['Type declaration', false]]],
          ['Valid Python identifier?', [['user_name', true], ['2fast', false], ['my-name', false], ['class', false]]],
          ['PEP 8 suggests variable names use?', [['snake_case', true], ['camelCase', false], ['UPPERCASE everywhere', false], ['kebab-case', false]]],
        ]],
        ['Basic Data Types', [
          ['type(3.14) returns?', [['float', true], ['int', false], ['decimal', false], ['double', false]]],
          ['Immutable built-in type?', [['tuple', true], ['list', false], ['dict', false], ['set', false]]],
          ['type(True) returns?', [['bool', true], ['Boolean', false], ['bit', false], ['flag', false]]],
        ]],
        ['Operators', [
          ['** performs?', [['Exponentiation', true], ['Double multiplication', false], ['Bitwise XOR', false], ['Floor division', false]]],
          ['7 // 2 equals?', [['3', true], ['3.5', false], ['4', false], ['1', false]]],
          ['10 % 3 equals?', [['1', true], ['3', false], ['0', false], ['3.33', false]]],
        ]],
      ]],
      ['Data Structures in Python', "Python's built-in collections", [
        ['Lists and Tuples', [
          ['Mutable sequence type?', [['list', true], ['tuple', false], ['str', false], ['bytes', false]]],
          ['Tuple literal syntax?', [['(1, 2, 3)', true], ['[1, 2, 3]', false], ['{1, 2, 3}', false], ['<1, 2, 3>', false]]],
          ['len((4, 5, 6)) returns?', [['3', true], ['2', false], ['15', false], ['TypeError', false]]],
        ]],
        ['Dictionaries and Sets', [
          ['Valid dictionary keys must be?', [['Hashable', true], ['Lists', false], ['Sets', false], ['Other dicts', false]]],
          ['{1, 2, 3} builds a?', [['set', true], ['dict', false], ['tuple', false], ['frozenset', false]]],
          ['d["missing"] raises?', [['KeyError', true], ['IndexError', false], ['None', false], ['ValueError', false]]],
        ]],
        ['List Comprehensions', [
          ['[n * n for n in range(4)] yields?', [['[0, 1, 4, 9]', true], ['[0, 1, 2, 3]', false], ['[1, 4, 9, 16]', false], ['[16]', false]]],
          ['Filter clause inside a comprehension uses?', [['if', true], ['where', false], ['when', false], ['unless', false]]],
          ['Comprehensions can build?', [['Lists, sets and dicts', true], ['Only lists', false], ['Only tuples', false], ['Classes', false]]],
        ]],
      ]],
      ['Control Flow and Functions', 'Logic flow and code organization in Python', [
        ['Conditional Statements', [
          ['Conditional keyword in Python?', [['if', true], ['when', false], ['check', false], ['begin', false]]],
          ["Python's else-if spelling?", [['elif', true], ['elseif', false], ['elsif', false], ['else-if', false]]],
          ['Code blocks are marked by?', [['Indentation', true], ['Braces {}', false], ['end keyword', false], ['Parentheses', false]]],
        ]],
        ['Loops', [
          ['range(1, 4) yields?', [['1, 2, 3', true], ['1, 2, 3, 4', false], ['0, 1, 2, 3', false], ['4', false]]],
          ['Exit a loop early with?', [['break', true], ['stop', false], ['exit', false], ['end', false]]],
          ['Iterate a list directly via?', [['for item in my_list', true], ['foreach (item in my_list)', false], ['my_list.each()', false], ['loop my_list', false]]],
        ]],
        ['Function Definitions', [
          ['Functions are defined with?', [['def', true], ['func', false], ['function', false], ['define', false]]],
          ['**kwargs receives?', [['Keyword arguments as a dict', true], ['Positional args as tuple', false], ['Module paths', false], ['Class instances', false]]],
          ['Function without return gives back?', [['None', true], ['0', false], ['Empty string', false], ['False', false]]],
        ]],
      ]],
      ['Object-Oriented Programming', 'OOP the Pythonic way', [
        ['Classes and Objects', [
          ['Constructor method name?', [['__init__', true], ['__new_object__', false], ['constructor', false], ['init_class', false]]],
          ['self represents?', [['The current instance', true], ['The class object', false], ['The module', false], ['Parent class', false]]],
          ['Create an instance of class Dog via?', [['Dog()', true], ['new Dog()', false], ['Dog.new', false], ['instance(Dog)', false]]],
        ]],
        ['Inheritance', [
          ['Subclass syntax?', [['class Cat(Animal):', true], ['class Cat extends Animal:', false], ['class Cat < Animal:', false], ['inherit Cat from Animal', false]]],
          ['super().__init__() invokes?', [['Parent initializer', true], ['Sibling method', false], ['Destructor', false], ['Static factory', false]]],
          ['MRO determines?', [['Method lookup order', true], ['Memory limits', false], ['Module ranking', false], ['Loop speed', false]]],
        ]],
        ['Magic Methods', [
          ['__str__ should return?', [['Readable string', true], ['Integer id', false], ['Bytecode', false], ['File handle', false]]],
          ['__add__ enables?', [['+ operator on objects', true], ['File appends', false], ['Async calls', false], ['Import hooks', false]]],
          ['__repr__ aims to be?', [['Unambiguous and debug-friendly', true], ['User-facing pretty', false], ['Private only', false], ['Deprecated', false]]],
        ]],
      ]],
      ['File Handling and Modules', 'Work with files and organize code into modules', [
        ['File Operations', [
          ['Mode for reading text?', [["'r'", true], ["'w'", false], ["'a'", false], ["'x'", false]]],
          ['Benefit of with open(...) as f?', [['Auto-closes the file', true], ['Reads faster', false], ['Encrypts contents', false], ['Creates backups', false]]],
          ['f.readlines() returns?', [['List of lines', true], ['Single string', false], ['Dict of lines', false], ['Bytes only', false]]],
        ]],
        ['Standard Libraries', [
          ['math.floor(3.7) returns?', [['3', true], ['4', false], ['3.7', false], ['0.7', false]]],
          ['random.choice(list) picks?', [['Random element', true], ['Smallest item', false], ['Last item', false], ['All items', false]]],
          ['datetime.now() gives?', [['Current date and time', true], ['Epoch only', false], ['Timezone file', false], ['Uptime', false]]],
        ]],
        ['Custom Modules', [
          ['Import your helpers.py with?', [['import helpers', true], ['require helpers', false], ['include "helpers"', false], ['load(helpers)', false]]],
          ["if __name__ == '__main__': guards?", [['Code that runs when executed directly', true], ['Library documentation', false], ['Test discovery', false], ['Package installs', false]]],
          ['from utils import fmt imports?', [['Only the fmt name', true], ['Entire utils namespace', false], ['utils.py source text', false], ['Nothing', false]]],
        ]],
      ]],
      ['Advanced Python Concepts', 'Level up with decorators, generators and more', [
        ['Decorators', [
          ['Decorator syntax symbol?', [['@', true], ['#', false], ['$', false], ['::', false]]],
          ['@timer above a function?', [['Wraps it with timer logic', true], ['Deletes the function', false], ['Makes it async', false], ['Renames the module', false]]],
          ['Decorators receive?', [['A function and usually return one', true], ['Only integers', false], ['File descriptors', false], ['Class bytes', false]]],
        ]],
        ['Generators', [
          ['Generator functions use?', [['yield', true], ['emit', false], ['produce', false], ['await', false]]],
          ['Main generator benefit?', [['Lazy, memory-friendly iteration', true], ['Faster than C', false], ['Automatic threading', false], ['Encrypted output', false]]],
          ['next(gen) retrieves?', [['Next yielded value', true], ['Previous value', false], ['All values at once', false], ['Generator id', false]]],
        ]],
        ['Context Managers', [
          ['Context manager keyword?', [['with', true], ['using', false], ['within', false], ['scope', false]]],
          ['__enter__ runs when?', [['Entering the block', true], ['Exiting the block', false], ['Importing module', false], ['Never automatically', false]]],
          ['contextlib.contextmanager turns?', [['A generator into a context manager', true], ['A class into a module', false], ['A list into a dict', false], ['A file into bytes', false]]],
        ]],
      ]],
    ],
  },
];

async function seed() {
  try {
    // Validate data before inserting
    let challengeCount = 0;
    for (const course of COURSES) {
      if (course.units.length !== 6) throw new Error(`Course ${course.title} must have 6 units`);
      for (const [, , lessons] of course.units) {
        if (lessons.length !== 3) throw new Error(`Unit must have 3 lessons`);
        for (const [, challenges] of lessons) {
          if (challenges.length !== 3) throw new Error(`Lesson must have 3 challenges`);
          for (const [, options] of challenges) {
            if (options.length !== 4 || options.filter(([, c]) => c).length !== 1) {
              throw new Error(`Challenge needs exactly 4 options with exactly 1 correct`);
            }
            challengeCount++;
          }
        }
      }
    }
    console.log(`Validation passed: 3 courses, ${challengeCount} challenges expected`);

    const stats = { courses: 0, units: 0, lessons: 0, challenges: 0, options: 0 };

    for (const course of COURSES) {
      const [c] = await sql`INSERT INTO "courses" ("title", "image_src") VALUES (${course.title}, ${course.imageSrc}) RETURNING id`;
      stats.courses++;

      let unitOrder = 1;
      for (const [unitTitle, unitDesc, lessons] of course.units) {
        const [u] = await sql`INSERT INTO "units" ("title", "description", "course_id", "order") VALUES (${unitTitle}, ${unitDesc}, ${c.id}, ${unitOrder}) RETURNING id`;
        unitOrder++;
        stats.units++;

        let lessonOrder = 1;
        for (const [lessonTitle, challenges] of lessons) {
          const [l] = await sql`INSERT INTO "lessons" ("title", "unit_id", "order") VALUES (${lessonTitle}, ${u.id}, ${lessonOrder}) RETURNING id`;
          lessonOrder++;
          stats.lessons++;

          let challengeOrder = 1;
          for (const [question, options] of challenges) {
            const [ch] = await sql`INSERT INTO "challenges" ("lesson_id", "type", "question", "order") VALUES (${l.id}, 'SELECT', ${question}, ${challengeOrder}) RETURNING id`;
            challengeOrder++;
            stats.challenges++;

            for (const [optionText, correct] of options) {
              await sql`INSERT INTO "challenges_options" ("challenge_id", "text", "correct") VALUES (${ch.id}, ${optionText}, ${correct})`;
              stats.options++;
            }
          }
        }
      }

      console.log(`Seeded "${course.title}": courses=${stats.courses}, units=${stats.units}, lessons=${stats.lessons}, challenges=${stats.challenges}, options=${stats.options}`);
    }

    console.log(`Seeded ${stats.courses} courses`);
    console.log(`Seeded ${stats.units} units`);
    console.log(`Seeded ${stats.lessons} lessons`);
    console.log(`Seeded ${stats.challenges} challenges`);
    console.log(`Seeded ${stats.options} options`);
    console.log('Seed completed successfully!');
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seed();
