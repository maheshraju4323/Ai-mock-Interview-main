require('dotenv').config({ path: require('path').join(__dirname, '..', '.env.local') });
const { neon } = require('@neondatabase/serverless');
const sql = neon(process.env.DRIZZLE_DB_URL);

const MS_PER_DAY = 24 * 60 * 60 * 1000;

function toISODate(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return y + '-' + m + '-' + day;
}

function parseDate(str) {
  const [y, m, d] = str.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function getCurrentWeekRange(dateStr) {
  const d = dateStr ? parseDate(dateStr) : new Date();
  const day = d.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;
  const monday = new Date(d);
  monday.setDate(d.getDate() + diffToMonday);
  monday.setHours(0, 0, 0, 0);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  return {
    weekStart: toISODate(monday),
    weekEnd: toISODate(sunday),
  };
}

(async () => {
  try {
    console.log('=== Retroactive Competition Seeding ===\n');

    const interviews = await sql`SELECT "createdBy", "createdAt", "id" FROM "mockInterview"`;
    console.log('Found', interviews.length, 'mock interviews');

    const answers = await sql`SELECT "userEmail", "createdAt", "rating", "id" FROM "userAnswer"`;
    console.log('Found', answers.length, 'user answers\n');

    const userData = {};

    for (const interview of interviews) {
      const email = interview.createdBy;
      const date = interview.createdAt;
      if (!email || !date) continue;

      if (!userData[email]) userData[email] = { answers: [], interviews: [] };
      userData[email].interviews.push({ date, id: interview.id });
    }

    for (const answer of answers) {
      const email = answer.userEmail;
      const date = answer.createdAt;
      const rating = parseFloat(answer.rating) || 0;
      if (!email || !date) continue;

      if (!userData[email]) userData[email] = { answers: [], interviews: [] };
      userData[email].answers.push({ date, rating, id: answer.id });
    }

    let totalPointsAwarded = 0;
    let totalRecords = 0;

    for (const [email, data] of Object.entries(userData)) {
      const weekPoints = {};

      for (const interview of data.interviews) {
        const week = getCurrentWeekRange(interview.date);
        if (!weekPoints[week.weekStart]) {
          weekPoints[week.weekStart] = {
            weekStart: week.weekStart,
            weekEnd: week.weekEnd,
            points: 0,
            questionsCompleted: 0,
            correctAnswers: 0,
            interviewsCompleted: 0,
            challengesCompleted: 0,
          };
        }
        weekPoints[week.weekStart].points += 100;
        weekPoints[week.weekStart].interviewsCompleted += 1;
      }

      for (const answer of data.answers) {
        const week = getCurrentWeekRange(answer.date);
        if (!weekPoints[week.weekStart]) {
          weekPoints[week.weekStart] = {
            weekStart: week.weekStart,
            weekEnd: week.weekEnd,
            points: 0,
            questionsCompleted: 0,
            correctAnswers: 0,
            interviewsCompleted: 0,
            challengesCompleted: 0,
          };
        }
        weekPoints[week.weekStart].points += 10;
        weekPoints[week.weekStart].questionsCompleted += 1;

        if (answer.rating >= 5) {
          weekPoints[week.weekStart].points += 20;
          weekPoints[week.weekStart].correctAnswers += 1;
        }
      }

      const userName = email.split('@')[0];

      for (const [weekStart, wp] of Object.entries(weekPoints)) {
        const existing = await sql`SELECT id FROM "weeklyCompetition" WHERE "userId" = ${email} AND "weekStart" = ${weekStart}`;
        if (existing.length > 0) {
          await sql`UPDATE "weeklyCompetition" SET "points" = ${wp.points}, "questionsCompleted" = ${wp.questionsCompleted}, "correctAnswers" = ${wp.correctAnswers}, "interviewsCompleted" = ${wp.interviewsCompleted}, "updatedAt" = ${new Date().toISOString()} WHERE "userId" = ${email} AND "weekStart" = ${weekStart}`;
        } else {
          await sql`INSERT INTO "weeklyCompetition" ("userId", "userName", "weekStart", "weekEnd", "points", "questionsCompleted", "correctAnswers", "interviewsCompleted", "challengesCompleted", "createdAt", "updatedAt") VALUES (${email}, ${userName}, ${weekStart}, ${wp.weekEnd}, ${wp.points}, ${wp.questionsCompleted}, ${wp.correctAnswers}, ${wp.interviewsCompleted}, ${wp.challengesCompleted}, ${new Date().toISOString()}, ${new Date().toISOString()})`;
        }
        totalPointsAwarded += wp.points;
        totalRecords++;
      }
    }

    const allEntries = await sql`SELECT "userId", "userName", "weekStart", "points" FROM "weeklyCompetition" ORDER BY "weekStart", "points" DESC`;
    console.log('\n--- Weekly Competition Entries ---');
    for (const entry of allEntries) {
      console.log(entry.userName + ' (' + entry.userId.substring(0, 20) + '...): ' + entry.points + ' pts [' + entry.weekStart + ']');
    }

    console.log('\n=== Summary ===');
    console.log('Total records created/updated:', totalRecords);
    console.log('Total points awarded:', totalPointsAwarded);
    console.log('Existing data untouched: mockInterview=' + interviews.length + ', userAnswer=' + answers.length);

  } catch (e) {
    console.error('ERROR:', e.message);
    console.error(e.stack);
    process.exit(1);
  }
})();
