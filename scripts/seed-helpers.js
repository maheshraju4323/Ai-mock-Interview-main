require('dotenv').config({ path: require('path').join(__dirname, '..', '.env.local') });
const { neon } = require('@neondatabase/serverless');
const sql = neon(process.env.DRIZZLE_DB_URL);

async function seedCourse(courseName, questions) {
  const before = await sql`SELECT count(*)::int AS c FROM "questionBank" WHERE "course" = ${courseName}`;
  if (before[0].c >= 100) {
    console.log(courseName + ': already seeded (' + before[0].c + ' questions). Skipping.');
    return 0;
  }

    let inserted = 0;
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      const topic = q.topic !== undefined ? q.topic : q[0];
      const difficulty = q.difficulty !== undefined ? q.difficulty : q[1];
      const question = q.question !== undefined ? q.question : q[2];
      const options = q.options !== undefined ? q.options : q[3];
      const correctAnswer = q.correctAnswer !== undefined ? q.correctAnswer : q[4];
      const explanation = q.explanation !== undefined ? q.explanation : q[5];
      const opts = typeof options === 'string' ? options : JSON.stringify(options);
      await sql`INSERT INTO "questionBank" ("course","topic","difficulty","question","options","correctAnswer","explanation") VALUES (${courseName},${topic},${difficulty},${question},${opts},${correctAnswer},${explanation})`;
      inserted++;
      if (inserted % 25 === 0 || inserted === questions.length) {
        console.log(courseName + ': inserted ' + inserted + '/' + questions.length);
      }
    }
  const after = await sql`SELECT count(*)::int AS c FROM "questionBank" WHERE "course" = ${courseName}`;
  console.log(courseName + ': done. Total in DB: ' + after[0].c);
  return inserted;
}

module.exports = { seedCourse };
