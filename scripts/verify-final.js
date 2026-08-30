require('dotenv').config({ path: require('path').join(__dirname, '..', '.env.local') });
const { neon } = require('@neondatabase/serverless');
const sql = neon(process.env.DRIZZLE_DB_URL);

(async () => {
  try {
    console.log('=== POST-SEED VERIFICATION ===\n');

    // 1. Existing data intact
    const mi = await sql`SELECT count(*) as c FROM "mockInterview"`;
    console.log('mockInterview:', mi[0].c, mi[0].c === '1' ? 'OK' : 'FAIL');
    const ua = await sql`SELECT count(*) as c FROM "userAnswer"`;
    console.log('userAnswer:', ua[0].c, ua[0].c === '5' ? 'OK' : 'FAIL');

    // 2. Course hierarchy
    const co = await sql`SELECT count(*) as c FROM "courses"`;
    console.log('\ncourses:', co[0].c, co[0].c === '3' ? 'OK' : 'FAIL');
    const un = await sql`SELECT count(*) as c FROM "units"`;
    console.log('units:', un[0].c, un[0].c === '18' ? 'OK' : 'FAIL');
    const le = await sql`SELECT count(*) as c FROM "lessons"`;
    console.log('lessons:', le[0].c, le[0].c === '54' ? 'OK' : 'FAIL');
    const ch = await sql`SELECT count(*) as c FROM "challenges"`;
    console.log('challenges:', ch[0].c, ch[0].c === '162' ? 'OK' : 'FAIL');
    const op = await sql`SELECT count(*) as c FROM "challenges_options"`;
    console.log('challenges_options:', op[0].c, op[0].c === '648' ? 'OK (648)' : 'CLOSE (' + op[0].c + ')');

    // 3. Courses per unit check
    const unitsPerCourse = await sql`SELECT course_id, count(*) as c FROM "units" GROUP BY course_id ORDER BY course_id`;
    console.log('\nUnits per course:', JSON.stringify(unitsPerCourse));
    const lessonsPerUnit = await sql`SELECT count(*) as c FROM "lessons" GROUP BY unit_id HAVING count(*) != 3`;
    console.log('Lessons per unit != 3:', lessonsPerUnit.length === 0 ? 'OK (all have 3)' : lessonsPerUnit);

    // 4. Question bank
    const qb = await sql`SELECT course, count(*) as c FROM "questionBank" GROUP BY course ORDER BY course`;
    console.log('\nquestionBank by course:');
    let qbTotal = 0;
    for (const row of qb) {
      console.log('  ', row.course + ':', row.c, parseInt(row.c) === 100 ? 'OK' : 'FAIL');
      qbTotal += parseInt(row.c);
    }
    console.log('  Total:', qbTotal, qbTotal === 300 ? 'OK' : 'FAIL');

    // 5. Question bank topic distribution
    const qbTopics = await sql`SELECT course, topic, count(*) as c FROM "questionBank" GROUP BY course, topic ORDER BY course, topic`;
    console.log('\nQuestion bank topics:');
    let prevCourse = '';
    for (const row of qbTopics) {
      if (row.course !== prevCourse) {
        console.log('  --- ' + row.course + ' ---');
        prevCourse = row.course;
      }
      console.log('    ' + row.topic + ':', row.c);
    }

    // 6. HR questions
    const hr = await sql`SELECT category, count(*) as c FROM "hrQuestions" GROUP BY category ORDER BY category`;
    console.log('\nhrQuestions by category:');
    let hrTotal = 0;
    for (const row of hr) {
      console.log('  ', row.category + ':', row.c);
      hrTotal += parseInt(row.c);
    }
    console.log('  Total:', hrTotal);

    // 7. dailyProgress table exists
    const dp = await sql`SELECT column_name FROM information_schema.columns WHERE table_name = 'dailyProgress' ORDER BY ordinal_position`;
    console.log('\ndailyProgress columns:', dp.map(r => r.column_name).join(', '), dp.length === 8 ? 'OK' : 'FAIL');

    // 8. Sample data checks
    const sampleQB = await sql`SELECT id, course, topic, difficulty, "correctAnswer" FROM "questionBank" LIMIT 3`;
    console.log('\nSample questionBank rows:');
    for (const row of sampleQB) {
      console.log('  id=' + row.id, row.course, row.topic, row.difficulty, 'ans=' + row.correctAnswer);
    }

    const sampleHR = await sql`SELECT id, category, substring(question, 1, 50) as q FROM "hrQuestions" LIMIT 3`;
    console.log('\nSample hrQuestions rows:');
    for (const row of sampleHR) {
      console.log('  id=' + row.id, row.category, row.q);
    }

    console.log('\n=== VERIFICATION COMPLETE ===');
  } catch (e) {
    console.error('VERIFICATION ERROR:', e.message);
    process.exit(1);
  }
})();
