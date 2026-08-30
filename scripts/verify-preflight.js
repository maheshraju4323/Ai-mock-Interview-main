require('dotenv').config({ path: require('path').join(__dirname, '..', '.env.local') });
const { neon } = require('@neondatabase/serverless');
const sql = neon(process.env.DRIZZLE_DB_URL);

(async () => {
  try {
    const mi = await sql`SELECT id, "jobPosition", "createdBy" FROM "mockInterview"`;
    console.log('mockInterview:', mi.length, JSON.stringify(mi));
    const ua = await sql`SELECT id, "mockId", rating FROM "userAnswer"`;
    console.log('userAnswer:', ua.length, JSON.stringify(ua));
    const qb = await sql`SELECT count(*) as c FROM "questionBank"`;
    console.log('questionBank:', qb[0].c);
    const hr = await sql`SELECT count(*) as c FROM "hrQuestions"`;
    console.log('hrQuestions:', hr[0].c);
    const co = await sql`SELECT count(*) as c FROM "courses"`;
    console.log('courses:', co[0].c);
    const dp = await sql`SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'dailyProgress' ORDER BY ordinal_position`;
    console.log('dailyProgress columns:', JSON.stringify(dp));
  } catch (e) {
    console.error('ERROR:', e.message);
    process.exit(1);
  }
})();
