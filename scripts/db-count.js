require('dotenv').config({ path: require('path').join(__dirname, '..', '.env.local') });
const { neon } = require('@neondatabase/serverless');
const sql = neon(process.env.DRIZZLE_DB_URL);

(async () => {
  try {
    const mi = await sql`SELECT count(*) as c FROM "mockInterview"`;
    console.log('mockInterview:', mi[0].c);
    const ua = await sql`SELECT count(*) as c FROM "userAnswer"`;
    console.log('userAnswer:', ua[0].c);
    const co = await sql`SELECT id, title FROM "courses"`;
    console.log('courses:', co.length, JSON.stringify(co));
    const un = await sql`SELECT id, title, course_id FROM "units" ORDER BY id`;
    console.log('units:', un.length, JSON.stringify(un));
    const le = await sql`SELECT count(*) as c FROM "lessons"`;
    console.log('lessons:', le[0].c);
    const ch = await sql`SELECT count(*) as c FROM "challenges"`;
    console.log('challenges:', ch[0].c);
    const op = await sql`SELECT count(*) as c FROM "challenges_options"`;
    console.log('challenges_options:', op[0].c);
    const qb = await sql`SELECT count(*) as c FROM "questionBank"`;
    console.log('questionBank:', qb[0].c);
    const hr = await sql`SELECT count(*) as c FROM "hrQuestions"`;
    console.log('hrQuestions:', hr[0].c);
  } catch (e) {
    console.error('ERROR:', e.message);
    process.exit(1);
  }
})();
