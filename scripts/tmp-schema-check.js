require('dotenv').config({ path: require('path').join(__dirname, '..', '.env.local') });
const { neon } = require('@neondatabase/serverless');
const sql = neon(process.env.DRIZZLE_DB_URL);
(async () => {
  const r = await sql`SELECT column_name, data_type, character_maximum_length, is_nullable FROM information_schema.columns WHERE table_name='questionBank' ORDER BY ordinal_position`;
  console.log(JSON.stringify(r, null, 1));
  const c = await sql`SELECT course, count(*) FROM "questionBank" GROUP BY course`;
  console.log(JSON.stringify(c));
})();
