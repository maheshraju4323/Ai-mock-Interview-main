require('dotenv').config({ path: '.env.local' });
const { neon } = require('@neondatabase/serverless');
const sql = neon(process.env.DRIZZLE_DB_URL);

(async () => {
  const r = await sql`SELECT table_name FROM information_schema.tables WHERE table_schema='public' ORDER BY table_name`;
  console.log('ALL TABLES:', r.map(x => x.table_name).join(', '));
  
  for (const t of r.map(x => x.table_name)) {
    const ct = await sql`SELECT count(*) as c FROM ${sql(t)}`;
    console.log(t + ': ' + ct[0].c);
  }
})();
