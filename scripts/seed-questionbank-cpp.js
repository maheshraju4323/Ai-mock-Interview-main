require('dotenv').config({ path: require('path').join(__dirname, '..', '.env.local') });
const { neon } = require('@neondatabase/serverless');
const sql = neon(process.env.DRIZZLE_DB_URL);

const T_BASIC = 'Basic Syntax and I/O';
const T_VARS = 'Variables and Data Types';
const T_OOP = 'OOP Fundamentals';
const T_INHERIT = 'Inheritance and Polymorphism';
const T_MEM = 'Memory Management';
const T_TEMPLATES = 'Templates';
const T_STL_CONTAINERS = 'STL Containers';
const T_STL_ALGOS = 'STL Algorithms';
const T_EXCEPT = 'Exception Handling';
const T_MODERN = 'Modern C++ Features';

const questions = [
  // ==================== Basic Syntax and I/O (10) - Easy ====================
  {
    topic: T_BASIC,
    difficulty: 'Easy',
    question: 'Which function is the entry point of every C++ program?',
    options: ['start()', 'main()', 'init()', 'begin()'],
    correctAnswer: 'main()',
    explanation: 'Execution of every standard C++ program begins at the main() function.'
  },
  {
    topic: T_BASIC,
    difficulty: 'Easy',
    question: 'Which object is used to write output to the standard console in C++?',
    options: ['std::cin', 'std::cout', 'std::cerr', 'std::log'],
    correctAnswer: 'std::cout',
    explanation: 'std::cout, defined in <iostream>, writes to the standard output stream using the << operator.'
  },
  {
    topic: T_BASIC,
    difficulty: 'Easy',
    question: 'Which header must be included to use std::cin and std::cout?',
    options: ['<stdio.h>', '<conio.h>', '<iostream>', '<string>'],
    correctAnswer: '<iostream>',
    explanation: 'Standard stream objects like cin and cout are declared in the <iostream> header.'
  },
  {
    topic: T_BASIC,
    difficulty: 'Easy',
    question: 'What symbol starts a single-line comment in C++?',
    options: ['//', '/*', '#', '--'],
    correctAnswer: '//',
    explanation: '// begins a comment that extends to the end of the line; /* */ is for block comments.'
  },
  {
    topic: T_BASIC,
    difficulty: 'Easy',
    question: 'What character terminates most statements in C++?',
    options: [':', '.', ';', ','],
    correctAnswer: ';',
    explanation: 'Statements and declarations in C++ end with a semicolon.'
  },
  {
    topic: T_BASIC,
    difficulty: 'Easy',
    question: 'What does std::endl do besides inserting a newline character?',
    options: ['Flushes the output buffer', 'Closes the output stream', 'Clears the console screen', 'Ends the program'],
    correctAnswer: 'Flushes the output buffer',
    explanation: 'std::endl writes a newline and then flushes the stream buffer, unlike "\n" which only writes a newline.'
  },
  {
    topic: T_BASIC,
    difficulty: 'Easy',
    question: 'Which operator is used with std::cin to read input into a variable?',
    options: ['<<', '>>', '->', '::'],
    correctAnswer: '>>',
    explanation: 'The extraction operator >> pulls data from the input stream into a variable.'
  },
  {
    topic: T_BASIC,
    difficulty: 'Easy',
    question: 'What is the scope resolution operator in C++?',
    options: ['::', '.', '->', '#'],
    correctAnswer: '::',
    explanation: ':: is used to access members of a namespace or class, such as std::cout.'
  },
  {
    topic: T_BASIC,
    difficulty: 'Easy',
    question: 'Which statement lets you write cout without the std:: prefix?',
    options: ['using namespace std;', 'include std;', 'namespace using std;', 'import std.*;'],
    correctAnswer: 'using namespace std;',
    explanation: 'This using-directive brings all names from namespace std into the current scope.'
  },
  {
    topic: T_BASIC,
    difficulty: 'Easy',
    question: 'Lines that begin with # are processed by which component of the build pipeline?',
    options: ['The linker', 'The preprocessor', 'The runtime library', 'The operating system'],
    correctAnswer: 'The preprocessor',
    explanation: 'Directives like #include and #define are handled by the preprocessor before compilation proper.'
  },

  // ==================== Variables and Data Types (8) - Easy/Medium ====================
  {
    topic: T_VARS,
    difficulty: 'Easy',
    question: 'What is the typical size of an int on a modern 64-bit platform?',
    options: ['2 bytes', '4 bytes', '8 bytes', '16 bytes'],
    correctAnswer: '4 bytes',
    explanation: 'On most modern platforms int is 32 bits (4 bytes), although the standard only guarantees a minimum of 16 bits.'
  },
  {
    topic: T_VARS,
    difficulty: 'Easy',
    question: 'What is the value range of a signed char?',
    options: ['0 to 255', '-127 to 127', '-128 to 127', '-255 to 255'],
    correctAnswer: '-128 to 127',
    explanation: 'A signed char is typically 8 bits, giving a range of -128 to 127.'
  },
  {
    topic: T_VARS,
    difficulty: 'Easy',
    question: 'What is the default type of the floating-point literal 3.14?',
    options: ['float', 'double', 'long double', 'decimal'],
    correctAnswer: 'double',
    explanation: 'An unsuffixed floating-point literal has type double; 3.14f would be a float.'
  },
  {
    topic: T_VARS,
    difficulty: 'Easy',
    question: 'What happens when an unsigned int variable holding 0 is decremented?',
    options: ['It becomes -1', 'It wraps around to its maximum value', 'Undefined behavior always occurs', 'A compile error occurs'],
    correctAnswer: 'It wraps around to its maximum value',
    explanation: 'Unsigned arithmetic is performed modulo 2^N, so decrementing past zero wraps to UINT_MAX.'
  },
  {
    topic: T_VARS,
    difficulty: 'Medium',
    question: 'What must happen when a variable is declared const?',
    options: ['It must be initialized at declaration', 'It must be static', 'It must be global', 'It must be a primitive type'],
    correctAnswer: 'It must be initialized at declaration',
    explanation: 'A const object cannot be assigned later, so it must be initialized when it is declared.'
  },
  {
    topic: T_VARS,
    difficulty: 'Medium',
    question: 'What does the sizeof operator return for char on any conforming C++ implementation?',
    options: ['Always 4', 'Always 1', 'Depends on the platform', 'Depends on the compiler flags'],
    correctAnswer: 'Always 1',
    explanation: 'sizeof(char) is defined by the standard to be exactly 1 byte, and sizeof measures sizes in units of char.'
  },
  {
    topic: T_VARS,
    difficulty: 'Medium',
    question: 'Which conversion happens in the expression int x = 3.9;',
    options: ['The value is rounded to 4', 'The fractional part is truncated, x becomes 3', 'A compile error occurs', 'x becomes 3.9 stored as double'],
    correctAnswer: 'The fractional part is truncated, x becomes 3',
    explanation: 'Converting a floating-point value to an integer type truncates toward zero, discarding the fraction.'
  },
  {
    topic: T_VARS,
    difficulty: 'Medium',
    question: 'What is an enumeration (enum) primarily used for?',
    options: ['Storing multiple types in one variable', 'Defining named integer constants', 'Creating dynamic arrays', 'Overloading operators automatically'],
    correctAnswer: 'Defining named integer constants',
    explanation: 'An enum defines a set of named integral constant values, improving readability over raw magic numbers.'
  },

  // ==================== OOP Fundamentals (15) - Easy/Medium ====================
  {
    topic: T_OOP,
    difficulty: 'Easy',
    question: 'What is a class in C++?',
    options: [
      'A built-in data type for numbers',
      'A user-defined blueprint from which objects are created',
      'A pointer to memory',
      'A compiled executable module'
    ],
    correctAnswer: 'A user-defined blueprint from which objects are created',
    explanation: 'A class bundles data and functions into a type; instances of it are called objects.'
  },
  {
    topic: T_OOP,
    difficulty: 'Easy',
    question: 'What is the default access specifier for members of a class?',
    options: ['public', 'private', 'protected', 'internal'],
    correctAnswer: 'private',
    explanation: 'Members of a class are private by default; struct members default to public.'
  },
  {
    topic: T_OOP,
    difficulty: 'Easy',
    question: 'What is the name rule for a constructor?',
    options: [
      'It must start with "init"',
      'It must match the class name and have no return type',
      'It can be any name marked virtual',
      'It must be named constructor'
    ],
    correctAnswer: 'It must match the class name and have no return type',
    explanation: 'A constructor shares the class name and specifies no return type, not even void.'
  },
  {
    topic: T_OOP,
    difficulty: 'Easy',
    question: 'How is a destructor named?',
    options: ['Same as class name preceded by ~', 'Same as class name preceded by !', 'delete()', 'destroy()'],
    correctAnswer: 'Same as class name preceded by ~',
    explanation: 'The destructor is written as ~ClassName(), takes no parameters, and runs when the object is destroyed.'
  },
  {
    topic: T_OOP,
    difficulty: 'Easy',
    question: 'Can constructors be overloaded in C++?',
    options: ['Yes, by having different parameter lists', 'No, only one is allowed per class', 'Only if the class is abstract', 'Only destructors can be overloaded'],
    correctAnswer: 'Yes, by having different parameter lists',
    explanation: 'Multiple constructors with different parameter lists let objects be created in different ways.'
  },
  {
    topic: T_OOP,
    difficulty: 'Easy',
    question: 'What does the this pointer refer to inside a non-static member function?',
    options: ['The class itself as a type', 'The current object instance', 'The first parameter passed', 'A global singleton'],
    correctAnswer: 'The current object instance',
    explanation: 'this holds the address of the object on which the member function was invoked.'
  },
  {
    topic: T_OOP,
    difficulty: 'Easy',
    question: 'What is special about a static data member of a class?',
    options: [
      'Each object gets its own copy',
      'It is shared by all objects of the class',
      'It cannot be accessed outside main()',
      'It must be declared public'
    ],
    correctAnswer: 'It is shared by all objects of the class',
    explanation: 'A static member exists once for the whole class rather than once per object.'
  },
  {
    topic: T_OOP,
    difficulty: 'Medium',
    question: 'Why would you declare a function a friend of a class?',
    options: [
      'To make it run faster',
      'To give it access to private and protected members',
      'To make it callable without including headers',
      'To allow it to be inherited'
    ],
    correctAnswer: 'To give it access to private and protected members',
    explanation: 'Friendship grants a non-member function or another class access to private and protected members.'
  },
  {
    topic: T_OOP,
    difficulty: 'Medium',
    question: 'When should you use a member initializer list instead of assignment in a constructor body?',
    options: [
      'Never, both are identical',
      'For const members, references, and base/member classes without default constructors',
      'Only for primitive types',
      'Only when the class has no destructor'
    ],
    correctAnswer: 'For const members, references, and base/member classes without default constructors',
    explanation: 'These members cannot be default-constructed and then assigned, so they must be initialized directly in the initializer list.'
  },
  {
    topic: T_OOP,
    difficulty: 'Medium',
    question: 'Why must a copy constructor take its argument by reference?',
    options: [
      'Passing by value would recursively invoke the copy constructor itself',
      'References are faster in all cases',
      'The standard forbids any other parameter types',
      'It allows the copy to modify the source'
    ],
    correctAnswer: 'Passing by value would recursively invoke the copy constructor itself',
    explanation: 'Passing by value requires copying the argument, which would call the copy constructor again infinitely.'
  },
  {
    topic: T_OOP,
    difficulty: 'Medium',
    question: 'What does encapsulation mean in object-oriented programming?',
    options: [
      'Deriving new classes from old ones',
      'Hiding internal state behind a controlled public interface',
      'Writing one function per class',
      'Compiling classes into shared libraries'
    ],
    correctAnswer: 'Hiding internal state behind a controlled public interface',
    explanation: 'Encapsulation restricts direct access to internal data, exposing behavior through public methods.'
  },
  {
    topic: T_OOP,
    difficulty: 'Easy',
    question: 'If a class declares no constructors, what does the compiler provide?',
    options: ['Nothing at all', 'An implicit default constructor', 'A deleted constructor causing compile errors', 'A constructor named auto'],
    correctAnswer: 'An implicit default constructor',
    explanation: 'The compiler generates an implicit default constructor if no constructors are declared.'
  },
  {
    topic: T_OOP,
    difficulty: 'Easy',
    question: 'Can a constructor have a return type such as void?',
    options: ['Yes, void is allowed', 'No, constructors declare no return type', 'Yes, but only inline', 'Only static constructors may'],
    correctAnswer: 'No, constructors declare no return type',
    explanation: 'Constructors never specify a return type, not even void.'
  },
  {
    topic: T_OOP,
    difficulty: 'Easy',
    question: 'Assuming an object is created and destroyed normally, how many times does its destructor run?',
    options: ['Zero times', 'Exactly once', 'Once per member', 'Twice, at creation and destruction'],
    correctAnswer: 'Exactly once',
    explanation: 'Each object has its destructor called exactly once, when its lifetime ends.'
  },
  {
    topic: T_OOP,
    difficulty: 'Easy',
    question: 'What is the default access level of members in a struct?',
    options: ['private', 'protected', 'public', 'static'],
    correctAnswer: 'public',
    explanation: 'struct defaults to public access, while class defaults to private; otherwise they are equivalent.'
  },

  // ==================== Inheritance and Polymorphism (12) - Medium ====================
  {
    topic: T_INHERIT,
    difficulty: 'Medium',
    question: 'What is the purpose of declaring a member function virtual?',
    options: [
      'It makes the function faster',
      'It enables dynamic dispatch so the override runs through a base-class pointer',
      'It prevents the function from being overridden',
      'It makes the function static'
    ],
    correctAnswer: 'It enables dynamic dispatch so the override runs through a base-class pointer',
    explanation: 'Virtual functions resolve at runtime via the vtable, allowing derived overrides to be called polymorphically.'
  },
  {
    topic: T_INHERIT,
    difficulty: 'Medium',
    question: 'What syntax marks a pure virtual function declaration?',
    options: ['virtual void f();', 'virtual void f() = 0;', 'pure virtual void f();', 'virtual void f() final;'],
    correctAnswer: 'virtual void f() = 0;',
    explanation: 'Appending = 0 makes the function pure virtual, requiring derived classes to implement it.'
  },
  {
    topic: T_INHERIT,
    difficulty: 'Medium',
    question: 'What is true about an abstract class?',
    options: [
      'It cannot be instantiated directly',
      'It cannot contain data members',
      'It cannot have constructors',
      'All of its members must be virtual'
    ],
    correctAnswer: 'It cannot be instantiated directly',
    explanation: 'A class with at least one pure virtual function is abstract; only pointers/references to it may be used.'
  },
  {
    topic: T_INHERIT,
    difficulty: 'Medium',
    question: 'In diamond inheritance, what problem does virtual inheritance solve?',
    options: [
      'Duplicate copies of the common base class appearing in the most-derived object',
      'Slower compile times',
      'Loss of private member access',
      'Inability to overload constructors'
    ],
    correctAnswer: 'Duplicate copies of the common base class appearing in the most-derived object',
    explanation: 'Virtual inheritance ensures a single shared instance of the common base exists despite two derivation paths.'
  },
  {
    topic: T_INHERIT,
    difficulty: 'Medium',
    question: 'Who can access a protected member of a class?',
    options: [
      'Only the class itself',
      'The class itself, its friends, and its derived classes',
      'Any code in the same file',
      'Everyone, like public'
    ],
    correctAnswer: 'The class itself, its friends, and its derived classes',
    explanation: 'protected grants access to the declaring class plus subclasses, but not outside code.'
  },
  {
    topic: T_INHERIT,
    difficulty: 'Medium',
    question: 'In what order are base and derived parts constructed?',
    options: [
      'Derived part first, then base',
      'Base class first, then members, then derived constructor body',
      'Alphabetically by class name',
      'Unspecified by the standard'
    ],
    correctAnswer: 'Base class first, then members, then derived constructor body',
    explanation: 'Construction proceeds bases-to-derived: virtual/most-derived bases, non-static members, then the body.'
  },
  {
    topic: T_INHERIT,
    difficulty: 'Medium',
    question: 'Why should a class used polymorphically have a virtual destructor?',
    options: [
      'So deleting via a base pointer invokes the derived destructor properly',
      'To make deletion faster',
      'Because destructors are virtual by default anyway',
      'To prevent the class from being copied'
    ],
    correctAnswer: 'So deleting via a base pointer invokes the derived destructor properly',
    explanation: 'Deleting a derived object through a base pointer with a non-virtual destructor is undefined behavior.'
  },
  {
    topic: T_INHERIT,
    difficulty: 'Medium',
    question: 'What condition allows a derived function to override a base virtual function?',
    options: [
      'Any signature works',
      'Same name, same parameter list, and compatible cv/ref qualification',
      'Same name only',
      'The base function must also be static'
    ],
    correctAnswer: 'Same name, same parameter list, and compatible cv/ref qualification',
    explanation: 'Overriding requires an identical signature (or covariant return); differing signatures hide instead.'
  },
  {
    topic: T_INHERIT,
    difficulty: 'Medium',
    question: 'What does the override keyword added in C++11 do?',
    options: [
      'Forces dynamic dispatch at runtime',
      'Asks the compiler to verify the function actually overrides a virtual base function',
      'Makes the function final',
      'Replaces the need for the virtual keyword entirely'
    ],
    correctAnswer: 'Asks the compiler to verify the function actually overrides a virtual base function',
    explanation: 'override triggers a compile error if no matching virtual function is being overridden, catching typos.'
  },
  {
    topic: T_INHERIT,
    difficulty: 'Medium',
    question: 'What is object slicing?',
    options: [
      'Memory corruption from buffer overflows',
      'Losing derived-class members when assigning a derived object to a base object by value',
      'Splitting a class into multiple files',
      'Copying only pointers between objects'
    ],
    correctAnswer: 'Losing derived-class members when assigning a derived object to a base object by value',
    explanation: 'Copy-initializing a Base from a Derived copies only the base subobject, slicing away derived parts.'
  },
  {
    topic: T_INHERIT,
    difficulty: 'Medium',
    question: 'What does marking a virtual function final accomplish?',
    options: [
      'It disables further overriding in classes deriving from this one',
      'It guarantees the function will be inlined',
      'It converts the function to pure virtual',
      'It makes the class abstract'
    ],
    correctAnswer: 'It disables further overriding in classes deriving from this one',
    explanation: 'final forbids derived classes from overriding the function; applied to a class, it forbids further derivation.'
  },
  {
    topic: T_INHERIT,
    difficulty: 'Medium',
    question: 'What is the default mode of inheritance when you write class D : B ?',
    options: ['public', 'private', 'protected', 'virtual'],
    correctAnswer: 'private',
    explanation: 'Class inheritance defaults to private (struct defaults to public).'
  },

  // ==================== Memory Management (10) - Medium/Hard ====================
  {
    topic: T_MEM,
    difficulty: 'Medium',
    question: 'Which storage area does the new operator allocate from?',
    options: ['The stack', 'The heap (free store)', 'Static storage', 'CPU registers'],
    correctAnswer: 'The heap (free store)',
    explanation: 'new allocates objects dynamically on the heap/free store, which persists until delete is called.'
  },
  {
    topic: T_MEM,
    difficulty: 'Easy',
    question: 'Which operator releases memory previously allocated with new?',
    options: ['free()', 'release()', 'delete', 'destroy'],
    correctAnswer: 'delete',
    explanation: 'delete deallocates memory allocated by new and invokes the object destructor.'
  },
  {
    topic: T_MEM,
    difficulty: 'Medium',
    question: 'What is a memory leak?',
    options: [
      'Allocated memory that is never freed and can no longer be referenced',
      'Reading uninitialized stack memory',
      'Writing beyond an array boundary',
      'Two pointers referencing the same address'
    ],
    correctAnswer: 'Allocated memory that is never freed and can no longer be referenced',
    explanation: 'Leaks occur when dynamically allocated memory is not released, gradually exhausting available memory.'
  },
  {
    topic: T_MEM,
    difficulty: 'Medium',
    question: 'What is a dangling pointer?',
    options: [
      'A null-initialized pointer',
      'A pointer that still holds the address of freed or destroyed storage',
      'A pointer declared inside a loop',
      'A smart pointer managing shared ownership'
    ],
    correctAnswer: 'A pointer that still holds the address of freed or destroyed storage',
    explanation: 'Using a dangling pointer after its target is deleted is undefined behavior.'
  },
  {
    topic: T_MEM,
    difficulty: 'Medium',
    question: 'Which deallocator must be paired with new[]?',
    options: ['delete', 'delete[]', 'free()', 'realloc()'],
    correctAnswer: 'delete[]',
    explanation: 'Arrays allocated with new[] must be released with delete[] so every element destructor runs.'
  },
  {
    topic: T_MEM,
    difficulty: 'Medium',
    question: 'Why is stack allocation generally faster than heap allocation?',
    options: [
      'The stack uses a simple pointer bump while the heap searches free structures',
      'The CPU caches only stack addresses',
      'Heap memory is slower RAM physically',
      'Stack variables bypass the OS entirely'
    ],
    correctAnswer: 'The stack uses a simple pointer bump while the heap searches free structures',
    explanation: 'Stack frames are managed by moving the stack pointer, whereas heap allocation involves allocator bookkeeping.'
  },
  {
    topic: T_MEM,
    difficulty: 'Hard',
    question: 'What does std::unique_ptr provide?',
    options: [
      'Shared reference-counted ownership',
      'Exclusive ownership that frees the resource automatically when the pointer is destroyed',
      'Garbage-collected ownership',
      'Weak observation without affecting lifetime'
    ],
    correctAnswer: 'Exclusive ownership that frees the resource automatically when the pointer is destroyed',
    explanation: 'unique_ptr owns its pointee exclusively and deletes it upon destruction; it cannot be copied.'
  },
  {
    topic: T_MEM,
    difficulty: 'Hard',
    question: 'Why can a std::unique_ptr not be copied?',
    options: [
      'Copying is disabled to preserve exclusive ownership semantics',
      'The pointed-to type may not be copyable',
      'It would corrupt the vtable',
      'It can, but only with explicit cast'
    ],
    correctAnswer: 'Copying is disabled to preserve exclusive ownership semantics',
    explanation: 'The copy constructor is deleted; ownership must be transferred explicitly with std::move.'
  },
  {
    topic: T_MEM,
    difficulty: 'Hard',
    question: 'What is the RAII principle?',
    options: [
      'Resource Acquisition Is Initialization: tying resource lifetime to object scope',
      'Random Access In Iterators: optimizing container traversal',
      'Runtime Allocation Inspection Interface',
      'Recursive Allocation In Inheritance hierarchies'
    ],
    correctAnswer: 'Resource Acquisition Is Initialization: tying resource lifetime to object scope',
    explanation: 'RAII acquires resources in constructors and releases them in destructors, making cleanup automatic.'
  },
  {
    topic: T_MEM,
    difficulty: 'Hard',
    question: 'By default, what does a failing plain new expression do?',
    options: [
      'Returns nullptr',
      'Throws std::bad_alloc',
      'Calls exit(1)',
      'Retries forever until memory is available'
    ],
    correctAnswer: 'Throws std::bad_alloc',
    explanation: 'Ordinary new throws bad_alloc on failure; the noexcept form new(std::nothrow) returns nullptr instead.'
  },

  // ==================== Templates (8) - Hard ====================
  {
    topic: T_TEMPLATES,
    difficulty: 'Hard',
    question: 'At which stage are template functions instantiated into concrete code?',
    options: ['Preprocessing', 'Compile time', 'Link time only', 'Runtime on first call'],
    correctAnswer: 'Compile time',
    explanation: 'Templates generate code during compilation for each set of arguments used, a process called instantiation.'
  },
  {
    topic: T_TEMPLATES,
    difficulty: 'Hard',
    question: 'What is template specialization?',
    options: [
      'Providing a custom definition for a specific template argument combination',
      'Marking templates as final',
      'Restricting templates to class types only',
      'Generating assembly manually for templates'
    ],
    correctAnswer: 'Providing a custom definition for a specific template argument combination',
    explanation: 'Full or partial specialization supplies alternative implementations for particular argument sets.'
  },
  {
    topic: T_TEMPLATES,
    difficulty: 'Hard',
    question: 'Are typename and class interchangeable when declaring a type template parameter?',
    options: [
      'Yes, they mean the same thing in this position',
      'No, class rejects fundamental types',
      'No, typename rejects class types',
      'typename was removed in C++17'
    ],
    correctAnswer: 'Yes, they mean the same thing in this position',
    explanation: 'In a template-parameter-list, typename and class are synonyms; class does not limit to actual classes.'
  },
  {
    topic: T_TEMPLATES,
    difficulty: 'Hard',
    question: 'What is a non-type template parameter?',
    options: [
      'A constant value such as an int or enum passed as a template argument',
      'A parameter whose type is deduced at runtime',
      'A parameter omitted at instantiation',
      'A template that accepts no arguments'
    ],
    correctAnswer: 'A constant value such as an int or enum passed as a template argument',
    explanation: 'Examples include template<int N> as used with std::array<int, 10>.'
  },
  {
    topic: T_TEMPLATES,
    difficulty: 'Hard',
    question: 'What feature allows a template to accept a variable number of arguments?',
    options: ['Variadic templates with parameter packs', 'Defaulted template arguments', 'Template chaining', 'Macro expansion packs'],
    correctAnswer: 'Variadic templates with parameter packs',
    explanation: 'template<typename... Args> introduces a pack expanded with ..., enabling calls like std::make_unique.'
  },
  {
    topic: T_TEMPLATES,
    difficulty: 'Hard',
    question: 'What does SFINAE stand for and mean?',
    options: [
      'Substitution Failure Is Not An Error: invalid substitutions remove overloads from consideration instead of failing compilation',
      'Single File Inclusion And Extension',
      'Standard Function Interface For All Entities',
      'Static Finalization Of Inline And External entities'
    ],
    correctAnswer: 'Substitution Failure Is Not An Error: invalid substitutions remove overloads from consideration instead of failing compilation',
    explanation: 'SFINAE lets the compiler discard candidate templates whose substitution fails, enabling overload selection tricks.'
  },
  {
    topic: T_TEMPLATES,
    difficulty: 'Hard',
    question: 'Where are template definitions usually placed relative to their declarations?',
    options: [
      'In the header, visible at each point of instantiation',
      'Always in .cpp files linked separately',
      'Inside anonymous namespaces in source files',
      'Anywhere, since templates are macros'
    ],
    correctAnswer: 'In the header, visible at each point of instantiation',
    explanation: 'The compiler needs the full definition where instances are generated, so templates live in headers (unless explicitly instantiated).'
  },
  {
    topic: T_TEMPLATES,
    difficulty: 'Hard',
    question: 'What does CTAD introduced in C++17 allow?',
    options: [
      'Deducing class template arguments from a constructor call, e.g. std::pair p(1, 2.0);',
      'Converting templates to raw pointers automatically',
      'Compile-time assertion of template correctness',
      'Automatic generation of comparison operators'
    ],
    correctAnswer: 'Deducing class template arguments from a constructor call, e.g. std::pair p(1, 2.0);',
    explanation: 'Class Template Argument Deduction infers the template parameters from initializer expressions.'
  },

  // ==================== STL Containers (12) - Medium ====================
  {
    topic: T_STL_CONTAINERS,
    difficulty: 'Medium',
    question: 'What underlying layout does std::vector use?',
    options: ['Contiguous dynamic array', 'Doubly-linked nodes', 'Hash buckets', 'Balanced tree nodes'],
    correctAnswer: 'Contiguous dynamic array',
    explanation: 'vector stores elements contiguously, giving O(1) random access and cache-friendly iteration.'
  },
  {
    topic: T_STL_CONTAINERS,
    difficulty: 'Medium',
    question: 'What data structure typically underlies std::map?',
    options: ['Hash table', 'Red-black tree', 'Skip list', 'Dynamic array'],
    correctAnswer: 'Red-black tree',
    explanation: 'std::map is commonly implemented as a red-black tree keeping keys ordered with O(log n) operations.'
  },
  {
    topic: T_STL_CONTAINERS,
    difficulty: 'Medium',
    question: 'What is the average lookup complexity of std::unordered_map?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
    correctAnswer: 'O(1)',
    explanation: 'unordered_map hashes keys, achieving average constant-time lookups with worst case O(n).'
  },
  {
    topic: T_STL_CONTAINERS,
    difficulty: 'Medium',
    question: 'Which container supports O(1) insertion and removal at both ends?',
    options: ['std::deque', 'std::vector', 'std::list', 'std::set'],
    correctAnswer: 'std::deque',
    explanation: 'deque provides constant-time insertion/removal at both front and back.'
  },
  {
    topic: T_STL_CONTAINERS,
    difficulty: 'Medium',
    question: 'What happens when inserting a duplicate key into std::set?',
    options: [
      'The insert is ignored and the existing element kept',
      'Both values are stored side by side',
      'The old value is replaced',
      'The container throws an exception'
    ],
    correctAnswer: 'The insert is ignored and the existing element kept',
    explanation: 'set holds unique keys; insert returns a pair whose bool indicates whether insertion happened.'
  },
  {
    topic: T_STL_CONTAINERS,
    difficulty: 'Medium',
    question: 'Which container is best for frequent middle insertions with iterators remaining valid?',
    options: ['std::list', 'std::vector', 'std::array', 'std::string'],
    correctAnswer: 'std::list',
    explanation: 'list is a doubly-linked list: splicing in the middle is O(1) given an iterator and never invalidates other iterators.'
  },
  {
    topic: T_STL_CONTAINERS,
    difficulty: 'Medium',
    question: 'What is the amortized complexity of vector push_back?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
    correctAnswer: 'O(1)',
    explanation: 'Growth by geometric factor makes occasional reallocation costs amortize to constant time per push.'
  },
  {
    topic: T_STL_CONTAINERS,
    difficulty: 'Medium',
    question: 'Key difference between map and unordered_map iteration order?',
    options: [
      'map iterates in sorted key order; unordered_map iterates in unspecified order',
      'Both iterate sorted',
      'unordered_map iterates sorted; map unspecified',
      'Neither supports iteration'
    ],
    correctAnswer: 'map iterates in sorted key order; unordered_map iterates in unspecified order',
    explanation: 'Ordered containers traverse their tree in key sequence; hash-based ones have no guaranteed order.'
  },
  {
    topic: T_STL_CONTAINERS,
    difficulty: 'Medium',
    question: 'Which STL adaptor enforces Last-In-First-Out semantics?',
    options: ['std::stack', 'std::queue', 'std::priority_queue', 'std::vector'],
    correctAnswer: 'std::stack',
    explanation: 'stack exposes only push, pop, and top, enforcing LIFO behavior over an underlying deque/vector.'
  },
  {
    topic: T_STL_CONTAINERS,
    difficulty: 'Medium',
    question: 'What element does priority_queue::top() return by default?',
    options: ['The smallest element', 'The largest element according to comparator less<T>', 'The oldest inserted element', 'A random element'],
    correctAnswer: 'The largest element according to comparator less<T>',
    explanation: 'By default priority_queue is a max-heap, so top() yields the greatest element.'
  },
  {
    topic: T_STL_CONTAINERS,
    difficulty: 'Medium',
    question: 'After clear() is called on a vector of capacity 100 containing 60 elements, what is its size?',
    options: ['0', '60', '100', 'Undefined'],
    correctAnswer: '0',
    explanation: 'clear() destroys elements leaving size 0; the capacity is unchanged.'
  },
  {
    topic: T_STL_CONTAINERS,
    difficulty: 'Medium',
    question: 'What type does vec.size() return for a std::vector<int> vec?',
    options: ['int', 'size_t (an unsigned integer type)', 'double', 'auto only usable in range-for'],
    correctAnswer: 'size_t (an unsigned integer type)',
    explanation: 'Container size functions return size_type, typically size_t, an unsigned type.'
  },

  // ==================== STL Algorithms (8) - Medium/Hard ====================
  {
    topic: T_STL_ALGOS,
    difficulty: 'Medium',
    question: 'What is the complexity of std::sort?',
    options: ['O(n)', 'O(n log n)', 'O(n squared)', 'O(log n)'],
    correctAnswer: 'O(n log n)',
    explanation: 'std::sort performs roughly n log n comparisons, typically an introsort hybrid.'
  },
  {
    topic: T_STL_ALGOS,
    difficulty: 'Medium',
    question: 'What does std::find return when the value is not present?',
    options: ['nullptr', 'The iterator equal to last', 'An empty optional', 'It throws std::not_found'],
    correctAnswer: 'The iterator equal to last',
    explanation: 'Callers compare the result against the end-of-range iterator to detect absence.'
  },
  {
    topic: T_STL_ALGOS,
    difficulty: 'Medium',
    question: 'What does std::count_if require as its third argument?',
    options: ['A predicate returning true for counted elements', 'The output iterator', 'The number to count', 'A comparison functor only taking two elements'],
    correctAnswer: 'A predicate returning true for counted elements',
    explanation: 'count_if tallies elements satisfying the unary predicate supplied as the third argument.'
  },
  {
    topic: T_STL_ALGOS,
    difficulty: 'Medium',
    question: 'Which header must be included to use std::accumulate?',
    options: ['<algorithm>', '<numeric>', '<functional>', '<iterator>'],
    correctAnswer: '<numeric>',
    explanation: 'accumulate lives in <numeric> alongside iota, inner_product, and partial_sum.'
  },
  {
    topic: T_STL_ALGOS,
    difficulty: 'Medium',
    question: 'What does std::remove actually do to the container?',
    options: [
      'Erases elements and shrinks the container',
      'Logically moves unwanted elements forward and returns a new logical end, without changing size',
      'Deletes the container itself',
      'Swaps duplicates to the back permanently'
    ],
    correctAnswer: 'Logically moves unwanted elements forward and returns a new logical end, without changing size',
    explanation: 'That is why the erase-remove idiom pairs erase with remove to truly shrink the container.'
  },
  {
    topic: T_STL_ALGOS,
    difficulty: 'Hard',
    question: 'Difference between std::sort and std::stable_sort?',
    options: [
      'stable_sort preserves the relative order of equivalent elements',
      'sort is stable; stable_sort is not',
      'stable_sort only works on lists',
      'They are aliases for the same algorithm'
    ],
    correctAnswer: 'stable_sort preserves the relative order of equivalent elements',
    explanation: 'stable_sort keeps equal-key elements in original order at extra cost, often O(n log n) with additional memory.'
  },
  {
    topic: T_STL_ALGOS,
    difficulty: 'Medium',
    question: 'What does std::max_element return?',
    options: ['The maximum value itself', 'An iterator to the largest element', 'The index of the largest element', 'A pair of min and max iterators'],
    correctAnswer: 'An iterator to the largest element',
    explanation: 'Like most STL algorithms, max_element returns iterators; dereference to obtain the value.'
  },
  {
    topic: T_STL_ALGOS,
    difficulty: 'Hard',
    question: 'Why must std::binary_search receive a sorted range?',
    options: [
      'Its halving logic relies on order to decide which half to search',
      'It sorts the range internally first',
      'Sorted ranges enable O(1) lookup',
      'Unsorted input causes a thrown exception'
    ],
    correctAnswer: 'Its halving logic relies on order to decide which half to search',
    explanation: 'Binary search compares against the midpoint and discards half the range each step, assuming ordering.'
  },

  // ==================== Exception Handling (7) - Medium ====================
  {
    topic: T_EXCEPT,
    difficulty: 'Medium',
    question: 'Which three constructs make up the core C++ exception mechanism?',
    options: ['try, catch, throw', 'error, handler, raise', 'exception, signal, abort', 'assert, throw, finally'],
    correctAnswer: 'try, catch, throw',
    explanation: 'throw raises an exception; try encloses guarded code; catch handles matching exceptions.'
  },
  {
    topic: T_EXCEPT,
    difficulty: 'Medium',
    question: 'What does catch (...) match?',
    options: ['Only ellipsis-typed exceptions', 'Any exception regardless of type', 'Exceptions with three arguments', 'Nothing; it is deprecated'],
    correctAnswer: 'Any exception regardless of type',
    explanation: 'The ellipsis handler catches everything and must appear last among handlers.'
  },
  {
    topic: T_EXCEPT,
    difficulty: 'Medium',
    question: 'Which method retrieves the descriptive message from a std::exception?',
    options: ['message()', 'what()', 'describe()', 'str()'],
    correctAnswer: 'what()',
    explanation: 'what() returns a null-terminated explanatory string, typically set via the constructor.'
  },
  {
    topic: T_EXCEPT,
    difficulty: 'Medium',
    question: 'Why is catching exceptions by const reference preferred?',
    options: [
      'Avoids slicing of derived exception objects and needless copies',
      'References are required by the ABI',
      'Const references rethrow automatically',
      'Value catches are illegal in C++'
    ],
    correctAnswer: 'Avoids slicing of derived exception objects and needless copies',
    explanation: 'Catch-by-value slices polymorphic exception hierarchies; const& preserves them efficiently.'
  },
  {
    topic: T_EXCEPT,
    difficulty: 'Medium',
    question: 'What happens when an exception is thrown and never caught?',
    options: [
      'std::terminate is called, ending the program',
      'The exception is silently discarded',
      'The program continues from main()',
      'The exception converts to a return code'
    ],
    correctAnswer: 'std::terminate is called, ending the program',
    explanation: 'With no matching handler up the stack, terminate runs and the program aborts.'
  },
  {
    topic: T_EXCEPT,
    difficulty: 'Medium',
    question: 'What does the noexcept specifier communicate?',
    options: [
      'The function promises not to throw; violations lead to std::terminate',
      'The function throws only std::exception types',
      'The function disables all exceptions globally',
      'The function is allowed to throw anything'
    ],
    correctAnswer: 'The function promises not to throw; violations lead to std::terminate',
    explanation: 'noexcept documents and enforces non-throwing behavior, also enabling optimizations like move during resize.'
  },
  {
    topic: T_EXCEPT,
    difficulty: 'Medium',
    question: 'During stack unwinding, what role do destructors play?',
    options: [
      'Destructors of local objects run as scopes are exited',
      'Destructors are skipped during unwinding',
      'Only destructors marked noexcept run',
      'Destructors convert exceptions to return codes'
    ],
    correctAnswer: 'Destructors of local objects run as scopes are exited',
    explanation: 'Guaranteed destruction during unwinding underpins RAII-style cleanup in exceptional paths.'
  },

  // ==================== Modern C++ Features (10) - Hard ====================
  {
    topic: T_MODERN,
    difficulty: 'Hard',
    question: 'What does the auto keyword do?',
    options: [
      'Declares a variable whose type is deduced from its initializer',
      'Allocates automatic storage explicitly',
      'Marks a function as inline automatically',
      'Converts any type to string'
    ],
    correctAnswer: 'Declares a variable whose type is deduced from its initializer',
    explanation: 'Since C++11, auto performs initializer-based type deduction, reducing verbosity with iterators and lambdas.'
  },
  {
    topic: T_MODERN,
    difficulty: 'Hard',
    question: 'Advantage of nullptr over NULL or 0?',
    options: [
      'nullptr has a dedicated type and is not convertible to an integer',
      'nullptr is smaller in memory',
      'nullptr works in C++98',
      'There is no difference'
    ],
    correctAnswer: 'nullptr has a dedicated type and is not convertible to an integer',
    explanation: 'Being typed std::nullptr_t avoids ambiguity in overloads like f(int) versus f(char*).'
  },
  {
    topic: T_MODERN,
    difficulty: 'Hard',
    question: 'Which capture clause makes a lambda copy all referenced locals by value?',
    options: ['[=]', '[&]', '[*]', '[v]'],
    correctAnswer: '[=]',
    explanation: '[=] copies the used locals into the closure; [&] captures by reference instead.'
  },
  {
    topic: T_MODERN,
    difficulty: 'Hard',
    question: 'What does std::move actually do?',
    options: [
      'Physically copies bytes from source to destination',
      'Casts its argument to an rvalue reference, enabling move semantics',
      'Transfers heap pages between processes',
      'Moves the object to a different thread'
    ],
    correctAnswer: 'Casts its argument to an rvalue reference, enabling move semantics',
    explanation: 'std::move performs no movement itself; it permits bind of an rvalue so moves can steal resources.'
  },
  {
    topic: T_MODERN,
    difficulty: 'Hard',
    question: 'What does an rvalue reference (T&&) bind to?',
    options: [
      'Temporary objects and objects explicitly marked for moving',
      'Only literals',
      'Any lvalue expression',
      'Global variables exclusively'
    ],
    correctAnswer: 'Temporary objects and objects explicitly marked for moving',
    explanation: 'T&& binds rvalues (temporaries, results of std::move), enabling resource pilfering in move constructors.'
  },
  {
    topic: T_MODERN,
    difficulty: 'Hard',
    question: 'What does constexpr indicate about a function or variable?',
    options: [
      'It can be evaluated at compile time when given constant expressions',
      'It must always be computed at compile time',
      'It is constant after the first runtime evaluation',
      'It replaces const in all contexts'
    ],
    correctAnswer: 'It can be evaluated at compile time when given constant expressions',
    explanation: 'constexpr permits compile-time evaluation; with runtime arguments it degrades to ordinary execution.'
  },
  {
    topic: T_MODERN,
    difficulty: 'Hard',
    question: 'Which loop construct iterates directly over container elements?',
    options: ['for (auto& e : vec)', 'for_each(vec, e)', 'loop (vec as e)', 'for (e in vec)'],
    correctAnswer: 'for (auto& e : vec)',
    explanation: 'The range-based for loop, standardized in C++11, visits each element without index bookkeeping.'
  },
  {
    topic: T_MODERN,
    difficulty: 'Hard',
    question: 'What problem do structured bindings (C++17) solve?',
    options: [
      'Decomposing aggregates into named variables, e.g. auto [k, v] : myMap',
      'Binding raw pointers to smart pointers',
      'Enforcing alignment of struct members',
      'Guaranteeing zero-copy returns'
    ],
    correctAnswer: 'Decomposing aggregates into named variables, e.g. auto [k, v] : myMap',
    explanation: 'Structured bindings unpack tuples, pairs, arrays, and structs into individual identifiers.'
  },
  {
    topic: T_MODERN,
    difficulty: 'Hard',
    question: 'When is std::optional preferable to returning a sentinel value?',
    options: [
      'When a function may or may not produce a value, expressing the outcome in the type',
      'When the returned value exceeds 64 bits',
      'When exceptions are forbidden but panics are fine',
      'optional is only for strings'
    ],
    correctAnswer: 'When a function may or may not produce a value, expressing the outcome in the type',
    explanation: 'optional<T> makes possible-absence explicit and self-documenting compared to sentinels like -1 or nullptr.'
  },
  {
    topic: T_MODERN,
    difficulty: 'Hard',
    question: 'What does std::shared_ptr use to manage joint ownership?',
    options: [
      'A control block holding strong reference counts',
      'The garbage collector in libstdc++',
      'OS-level handle duplication',
      'Circular linked lists of owners'
    ],
    correctAnswer: 'A control block holding strong reference counts',
    explanation: 'Copies increment the count; when it reaches zero the managed object is destroyed. Cycles require weak_ptr.'
  }
];

async function main() {
  try {
    console.log(`Seeding ${questions.length} C++ questions into questionBank...`);

    let inserted = 0;
    for (const q of questions) {
      const opts = JSON.stringify(q.options);
      await sql`INSERT INTO "questionBank" (course, topic, difficulty, question, options, "correctAnswer", explanation) VALUES ('C++', ${q.topic}, ${q.difficulty}, ${q.question}, ${opts}, ${q.correctAnswer}, ${q.explanation})`;
      inserted++;
      if (inserted % 10 === 0) {
        console.log(`Inserted ${inserted}/${questions.length} questions...`);
      }
    }

    const result = await sql`SELECT COUNT(*) AS count FROM "questionBank" WHERE course = 'C++'`;
    console.log(`Done. Total C++ questions in questionBank: ${result[0].count}`);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exitCode = 1;
  }
}

main();
