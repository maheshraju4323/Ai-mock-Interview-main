/**
 * Seed script (recovery): seeds hierarchy data missed by a timed-out run.
 * Already present: courses 1-2, units 1-10, lessons 1-30, challenges 1-90, most options.
 * This script adds: C++ units 5-6 + lessons/challenges/options, and the full Python course.
 * Uses only the neon() tagged-template sql function (sql.unsafe() does not exist here).
 */
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env.local') });
const { neon } = require('@neondatabase/serverless');

const sql = neon(process.env.DRIZZLE_DB_URL);

// lesson: [title, [[question, [[optionText, isCorrect], ...]], ...]]  (3 challenges, 4 options each)

const CPP_UNIT5_LESSONS = [
  ['Lambda Expressions', [
    ['Which part of a lambda expression holds its captured variables?', [['[]', true], ['()', false], ['{}', false], ['<>', false]]],
    ['Which capture clause captures all used variables by reference?', [['[&]', true], ['[=]', false], ['[ref]', false], ['[*]', false]]],
    ['Valid lambda taking two ints and returning their sum?', [['[](int a, int b) { return a + b; }', true], ['lambda(a, b) => a + b', false], ['function(int a, int b) { return a + b; }', false], ['[](int a, int b) -> a + b', false]]],
  ]],
  ['Move Semantics', [
    ['What does std::move(obj) actually do?', [['Casts obj to an rvalue reference so a move can occur', true], ['Immediately copies obj to new memory', false], ['Deletes obj right away', false], ['Allocates new heap memory', false]]],
    ['Signature of a move constructor for class Widget?', [['Widget(Widget&& other)', true], ['Widget(const Widget& other)', false], ['Widget(Widget other)', false], ['Widget(Widget* other)', false]]],
    ['The Rule of Five covers destructor, copy ctor, copy assign, move ctor and?', [['Move assignment operator', true], ['Default constructor', false], ['Virtual destructor', false], ['Friend operator<<', false]]],
  ]],
  ['constexpr and Const', [
    ['Unlike const, constexpr guarantees?', [['Evaluation at compile time where required', true], ['Values cannot change at runtime', false], ['Thread safety', false], ['Larger stack allocation', false]]],
    ['int arr[f()]; with constexpr int f() { return 4; } works because?', [['f() is evaluated at compile time', true], ['Arrays ignore size expressions', false], ['arr becomes dynamic', false], ['f() is cached at runtime', false]]],
    ['A constexpr function must?', [['Be evaluatable at compile time for constant arguments', true], ['Return void', false], ['Take no parameters', false], ['Be declared static', false]]],
  ]],
];

const CPP_UNIT6_LESSONS = [
  ['Function Templates', [
    ['Correct function template declaration?', [['template <typename T> T add(T a, T b)', true], ['template T add<typename T>(T a, T b)', false], ['generic <T> add(T a, T b)', false], ['function<T> add(T a, T b)', false]]],
    ['When is a function template instantiated?', [['When called with concrete types', true], ['When the header is included', false], ['At link time only', false], ['When the compiler starts', false]]],
    ['Calling add(2, 3) with template <typename T> T add(T a, T b)?', [['Deduces T = int', true], ['Fails without explicit <int>', false], ['Deduces T = double', false], ['Causes infinite recursion', false]]],
  ]],
  ['Class Templates', [
    ['Correct class template definition?', [['template <typename T> class Stack { T data; };', true], ['class Stack<T> { T data; };', false], ['generic class Stack { auto data; };', false], ['Stack template <T> { T data; };', false]]],
    ['How do you declare a Stack storing doubles?', [['Stack<double> s;', true], ['double Stack s;', false], ['Stack s<double>;', false], ['new Stack(double) s;', false]]],
    ['Partial specialization specializes for?', [['A category like T* rather than one exact type', true], ['Exactly one concrete type', false], ['Member variables only', false], ['Namespaces', false]]],
  ]],
  ['Template Specialization', [
    ['Full specialization of Box for bool is written as?', [['template <> class Box<bool>', true], ['template <class bool> class Box', false], ['specialize Box<bool>', false], ['partial class Box<bool>', false]]],
    ['Difference between full and partial specialization?', [['Full fixes every parameter; partial still leaves some generic', true], ['No difference, both fix all parameters', false], ['Partial is only allowed on functions', false], ['Full only works with pointers', false]]],
    ['Which do function templates NOT support?', [['Partial specialization', true], ['Full specialization', false], ['Type deduction', false], ['Multiple parameters', false]]],
  ]],
];

// unit: [title, description, lessons]
const PY_UNITS = [
  ['Python Basics', 'Variables, data types, and operators', [
    ['Variables and Naming', [
      ['Which is a valid Python variable name?', [['user_name', true], ['2users', false], ['class', false], ['my-var', false]]],
      ['Python variables are created when?', [['First assigned a value', true], ['Declared with var', false], ['The program compiles', false], ['imported from typing', false]]],
      ['x = 5 then x = "five" results in?', [['x now refers to a string; no error', true], ['A TypeError', false], ['A SyntaxError', false], ['x stays the integer 5', false]]],
    ]],
    ['Basic Data Types', [
      ['type(3.14) returns?', [["<class 'float'>", true], ["<class 'int'>", false], ["<class 'double'>", false], ["<class 'decimal'>", false]]],
      ['Which built-in type is immutable?', [['tuple', true], ['list', false], ['dict', false], ['set', false]]],
      ['type(True) returns?', [["<class 'bool'>", true], ["<class 'int'>", false], ["<class 'boolean'>", false], ["<class 'str'>", false]]],
    ]],
    ['Operators', [
      ['7 // 2 evaluates to?', [['3', true], ['3.5', false], ['4', false], ['1', false]]],
      ['Which operator tests equality?', [['==', true], ['=', false], ['===', false], ['!=', false]]],
      ['10 % 3 evaluates to?', [['1', true], ['3', false], ['0', false], ['3.33', false]]],
    ]],
  ]],
  ['Data Structures in Python', 'Lists, tuples, dictionaries, sets, and comprehensions', [
    ['Lists and Tuples', [
      ['How do you write a single-element tuple?', [['(42,)', true], ['(42)', false], ['tuple(42)', false], ['{42}', false]]],
      ['Which call mutates a list in place?', [['nums.append(4)', true], ['sorted(nums)', false], ['nums + [4]', false], ['len(nums)', false]]],
      ['items[-1] returns?', [['The last element', true], ['The first element', false], ['An IndexError', false], ['None', false]]],
    ]],
    ['Dictionaries and Sets', [
      ["Safe way to read d.get('k', default_value) provides?", [["The value of key k or default_value if missing", true], ['A KeyError always', false], ['Only None', false], ['A list of values', false]]],
      ['What do sets do to duplicate entries?', [['Remove them automatically', true], ['Raise DuplicateError', false], ['Store them twice', false], ['Convert them to lists', false]]],
      ['Iterating a dict directly yields?', [['Its keys', true], ['Its values', false], ['Tuples of pairs', false], ['Sorted keys only', false]]],
    ]],
    ['List Comprehensions', [
      ['[x * x for x in range(3)] produces?', [['[0, 1, 4]', true], ['[1, 4, 9]', false], ['[0, 1, 2]', false], ['[x * x]', false]]],
      ['Keep only positives inside a comprehension with?', [['[x for x in nums if x > 0]', true], ['[x for x in nums where x > 0]', false], ['[x if x > 0 for x in nums]', false], ['filter nums by x > 0', false]]],
      ['Main advantage of comprehensions?', [['Concise, readable construction of sequences', true], ['Lower network latency', false], ['Guaranteed speedup', false], ['Parallel execution', false]]],
    ]],
  ]],
  ['Control Flow and Functions', 'Conditionals, loops, and reusable functions', [
    ['Conditional Statements', [
      ["Python's else-if keyword?", [['elif', true], ['elseif', false], ['else if', false], ['elsif', false]]],
      ['Blocks of code are defined by?', [['Indentation', true], ['Curly braces', false], ['begin/end', false], ['Semicolons', false]]],
      ['if x: runs its body when x is?', [['Truthful such as nonzero or nonempty', true], ['Exactly 1 only', false], ['Positive numbers only', false], ['Never empty strings', false]]],
    ]],
    ['Loops', [
      ['range(1, 4) yields?', [['1, 2, 3', true], ['1, 2, 3, 4', false], ['0, 1, 2, 3', false], ['1 and 4', false]]],
      ['break inside a loop causes?', [['Immediate exit from the loop', true], ['Skip to next iteration', false], ['Restart the loop', false], ['A RuntimeError', false]]],
      ['continue skips?', [['The rest of the current iteration', true], ['All remaining iterations', false], ['The entire loop body once', false], ['Only nested loops', false]]],
    ]],
    ['Function Definitions', [
      ['Keyword that defines a function?', [['def', true], ['function', false], ['define', false], ['fun', false]]],
      ['def greet(name="World") makes name?', [['An optional parameter with default', true], ['A required parameter', false], ['A global variable', false], ['Keyword-only', false]]],
      ['return 1, 2 sends back?', [['The tuple (1, 2)', true], ['Two separate returns', false], ['A SyntaxError', false], ['A list', false]]],
    ]],
  ]],
  ['Object-Oriented Programming', 'Classes, inheritance, and magic methods', [
    ['Classes and Objects', [
      ['Define an empty-ish class named Dog with?', [['class Dog:', true], ['Dog class:', false], ['object Dog:', false], ['struct Dog:', false]]],
      ['__init__ acts as?', [['The initializer called on instantiation', true], ['The destructor', false], ['A static method', false], ['The iterator hook', false]]],
      ['self in a method refers to?', [['The instance the method was called on', true], ['The class itself', false], ['The module', false], ['Any parent class', false]]],
    ]],
    ['Inheritance', [
      ['Syntax making Child inherit Parent?', [['class Child(Parent):', true], ['class Child : Parent:', false], ['Child extends Parent:', false], ['inherit Child from Parent:', false]]],
      ['super() is used to?', [['Call the parent implementation', true], ['Create a sibling class', false], ['Freeze an object', false], ['Access globals', false]]],
      ['Overriding means the child?', [['Provides its own version of an inherited method', true], ['Deletes parent attributes', false], ['Cannot call super', false], ['Becomes abstract', false]]],
    ]],
    ['Magic Methods', [
      ['__str__ should return?', [['A human-readable string', true], ['An integer id', false], ['Bytes', false], ['The class name only', false]]],
      ['Operator + maps to which dunder method?', [['__add__', true], ['__plus__', false], ['__sum__', false], ['__concat__', false]]],
      ['len(obj) invokes?', [['obj.__len__()', true], ['obj.length()', false], ['obj.size()', false], ['__count__()', false]]],
    ]],
  ]],
  ['File Handling and Modules', 'Reading and writing files, importing libraries', [
    ['File Operations', [
      ["Mode string opening a file just to read text?", [['"r"', true], ['"w"', false], ['"a"', false], ['"rw+"', false]]],
      ['Benefit of with open("f.txt") as f: ?', [['File closes automatically even on exceptions', true], ['Files load twice as fast', false], ['Enables binary mode', false], ['Creates missing folders', false]]],
      ['f.read() after reaching EOF returns?', [['An empty string', true], ['An EOFError', false], ['None', false], ['-1', false]]],
    ]],
    ['Standard Libraries', [
      ['math.sqrt(16) evaluates to?', [['4.0', true], ['4', false], ['8', false], ['2', false]]],
      ['random.randint(1, 6) can produce?', [['Any whole number 1 through 6 inclusive', true], ['Only 1 or 6', false], ['Floats like 2.5', false], ['0 through 6', false]]],
      ['from math import sqrt imports?', [['Only the sqrt function', true], ['The entire math module', false], ['All standard libraries', false], ['Nothing unless aliased', false]]],
    ]],
    ['Custom Modules', [
      ['A custom module is simply?', [['Any .py file you import', true], ['Only compiled .pyc files', false], ['A zip archive', false], ['A special folder type', false]]],
      ['utils.py lives next to your script; import it with?', [['import utils', true], ['include utils.py', false], ['require("utils")', false], ['using utils;', false]]],
      ['__name__ equals "__main__" when the file is?', [['Executed directly as a script', true], ['Imported by another module', false], ['Loaded in the REPL only', false], ['Compiled', false]]],
    ]],
  ]],
  ['Advanced Python Concepts', 'Decorators, generators, and context managers', [
    ['Decorators', [
      ['@my_decorator above def f() means?', [['f is passed through my_decorator', true], ['f is commented out', false], ['f becomes a class', false], ['Decorator syntax needs parentheses', false]]],
      ['A decorator is a function that takes a function and returns?', [['Usually a wrapped replacement function', true], ['A string', false], ['A module', false], ['Always None', false]]],
      ['functools.wraps preserves the decorated function\'s?', [['Name and docstring', true], ['Runtime speed', false], ['Memory location', false], ['Source filename', false]]],
    ]],
    ['Generators', [
      ['Keyword turning a function into a generator?', [['yield', true], ['generate', false], ['async', false], ['stream', false]]],
      ['Calling next(gen) past the final yield raises?', [['StopIteration', true], ['GeneratorExit', false], ['ValueError', false], ['Nothing; it restarts', false]]],
      ['Key advantage of generators?', [['Lazy evaluation using little memory', true], ['They run faster than C loops', false], ['They cache all output eagerly', false], ['They enable threading', false]]],
    ]],
    ['Context Managers', [
      ['Context managers pair with which statement?', [['with', true], ['using', false], ['within', false], ['scope', false]]],
      ['__enter__ runs when?', [['Entering the with block', true], ['Exiting the block', false], ['An exception fires', false], ['The object is deleted', false]]],
      ['contextlib.contextmanager converts?', [['A generator function into a context manager', true], ['A class into a generator', false], ['A dict into a set', false], ['Bytes into text', false]]],
    ]],
  ]],
];

async function main() {
  try {
    // ---- Validation ---------------------------------------------------------
    const cppLessons = [...CPP_UNIT5_LESSONS, ...CPP_UNIT6_LESSONS];

    let cppChallengeTotal = 0;
    for (const [, challenges] of cppLessons) {
      if (challenges.length !== 3) throw new Error('Each C++ lesson must have 3 challenges');
      for (const [, opts] of challenges) {
        if (opts.length !== 4 || opts.filter(([, c]) => c).length !== 1) {
          throw new Error('Each challenge needs exactly 4 options with exactly 1 correct');
        }
        cppChallengeTotal++;
      }
    }

    let pyChallengeTotal = 0;
    for (const [, , lessons] of PY_UNITS) {
      for (const [, challenges] of lessons) {
        if (challenges.length !== 3) throw new Error('Each Python lesson must have 3 challenges');
        for (const [, opts] of challenges) {
          if (opts.length !== 4 || opts.filter(([, c]) => c).length !== 1) {
            throw new Error('Each challenge needs exactly 4 options with exactly 1 correct');
          }
          pyChallengeTotal++;
        }
      }
    }
    console.log(`Validation OK: expecting ${cppChallengeTotal} C++ challenges and ${pyChallengeTotal} Python challenges`);

    // ---- 1. Python course ----------------------------------------------------
    const [courseRow] = await sql`
      INSERT INTO "courses" ("title", "image_src")
      VALUES (${'Python'}, ${'/courses/python.svg'})
      RETURNING id
    `;
    const pyCourseId = courseRow.id;
    console.log(`Inserted Python course id=${pyCourseId}`);

    // ---- 2. Remaining C++ units (5 and 6) --------------------------------------
    const [cppUnit5Row] = await sql`
      INSERT INTO "units" ("title", "description", "course_id", "order")
      VALUES (${'Advanced C++ Features'}, ${'Lambda expressions, move semantics, and constexpr'}, ${2}, ${5})
      RETURNING id
    `;
    const [cppUnit6Row] = await sql`
      INSERT INTO "units" ("title", "description", "course_id", "order")
      VALUES (${'Templates and Generic Programming'}, ${'Function templates, class templates, and template specialization'}, ${2}, ${6})
      RETURNING id
    `;
    const cppUnitIds = [cppUnit5Row.id, cppUnit6Row.id];
    console.log(`Inserted C++ units id=${cppUnitIds[0]} and id=${cppUnitIds[1]}`);

    // ---- 3. Remaining C++ lessons (3 under unit 5, then 3 under unit 6) ----------
    const cppLessonIds = [];
    for (let i = 0; i < cppLessons.length; i++) {
      const [title] = cppLessons[i];
      const unitId = cppUnitIds[Math.floor(i / 3)];
      const [row] = await sql`
        INSERT INTO "lessons" ("title", "unit_id", "order")
        VALUES (${title}, ${unitId}, ${(i % 3) + 1})
        RETURNING id
      `;
      cppLessonIds.push(row.id);
    }
    console.log(`Inserted ${cppLessonIds.length} C++ lessons`);

    // ---- 4. Python units -----------------------------------------------------------
    const pyUnitIds = [];
    for (let i = 0; i < PY_UNITS.length; i++) {
      const [title, description] = PY_UNITS[i];
      const [row] = await sql`
        INSERT INTO "units" ("title", "description", "course_id", "order")
        VALUES (${title}, ${description}, ${pyCourseId}, ${i + 1})
        RETURNING id
      `;
      pyUnitIds.push(row.id);
    }
    console.log(`Inserted ${pyUnitIds.length} Python units`);

    // ---- 5. Python lessons (3 per unit) -----------------------------------------------
    const pyLessonIds = [];
    for (let u = 0; u < PY_UNITS.length; u++) {
      const [, , lessons] = PY_UNITS[u];
      for (let l = 0; l < lessons.length; l++) {
        const [title] = lessons[l];
        const [row] = await sql`
          INSERT INTO "lessons" ("title", "unit_id", "order")
          VALUES (${title}, ${pyUnitIds[u]}, ${l + 1})
          RETURNING id
        `;
        pyLessonIds.push(row.id);
      }
    }
    console.log(`Inserted ${pyLessonIds.length} Python lessons`);

    // ---- 6. Challenges (3 SELECT questions per lesson) ----------------------------------
    const challengeIds = [];
    const optionSets = [];

    const insertChallengesForLesson = async (lessonId, challenges) => {
      for (let j = 0; j < challenges.length; j++) {
        const [question, opts] = challenges[j];
        const [row] = await sql`
          INSERT INTO "challenges" ("lesson_id", "type", "question", "order")
          VALUES (${lessonId}, ${'SELECT'}, ${question}, ${j + 1})
          RETURNING id
        `;
        challengeIds.push(row.id);
        optionSets.push(opts);
      }
    };

    for (let i = 0; i < cppLessons.length; i++) {
      await insertChallengesForLesson(cppLessonIds[i], cppLessons[i][1]);
    }
    console.log(`Inserted ${challengeIds.length} C++ challenges`);

    const cppChallengeCount = challengeIds.length;
    for (let u = 0; u < PY_UNITS.length; u++) {
      const [, , lessons] = PY_UNITS[u];
      for (let l = 0; l < lessons.length; l++) {
        await insertChallengesForLesson(pyLessonIds[u * 3 + l], lessons[l][1]);
      }
    }
    console.log(`Inserted ${challengeIds.length - cppChallengeCount} Python challenges (${challengeIds.length} total)`);

    // ---- 7. Challenge options (one 4-row INSERT per challenge) -----------------------------
    let optionCount = 0;
    for (let i = 0; i < challengeIds.length; i++) {
      const cid = challengeIds[i];
      const opts = optionSets[i];
      if (opts.length !== 4) throw new Error(`Challenge id=${cid} must have exactly 4 options`);
      await sql`
        INSERT INTO "challenges_options" ("challenge_id", "text", "correct")
        VALUES (${cid}, ${opts[0][0]}, ${opts[0][1]}),
               (${cid}, ${opts[1][0]}, ${opts[1][1]}),
               (${cid}, ${opts[2][0]}, ${opts[2][1]}),
               (${cid}, ${opts[3][0]}, ${opts[3][1]})
      `;
      optionCount += opts.length;
      if ((i + 1) % 18 === 0) {
        console.log(`Inserted options for ${i + 1}/${challengeIds.length} challenges (${optionCount} option rows)`);
      }
    }

    console.log('Seed completed successfully!');
    console.log(
      `Summary: +1 course (Python), +${cppUnitIds.length} C++ units, +${pyUnitIds.length} Python units, ` +
      `+${cppLessonIds.length + pyLessonIds.length} lessons, +${challengeIds.length} challenges, +${optionCount} options`
    );
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exitCode = 1;
  }
}

main();
