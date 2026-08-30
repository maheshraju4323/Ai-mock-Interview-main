const MS_PER_DAY = 24 * 60 * 60 * 1000;

function toISODate(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return y + "-" + m + "-" + day;
}

function parseDate(str) {
  const [y, m, d] = str.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

export function getCurrentWeekRange(now) {
  const d = now || new Date();
  const day = d.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;
  const monday = new Date(d);
  monday.setDate(d.getDate() + diffToMonday);
  monday.setHours(0, 0, 0, 0);
  const sunday = addDays(monday, 6);
  return {
    weekStart: toISODate(monday),
    weekEnd: toISODate(sunday),
  };
}

export function getWeekRangeFromDate(dateStr) {
  const d = parseDate(dateStr);
  return getCurrentWeekRange(d);
}

export function formatWeekLabel(weekStart, weekEnd) {
  const s = parseDate(weekStart);
  const e = parseDate(weekEnd);
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  return (
    months[s.getMonth()] +
    " " +
    s.getDate() +
    " - " +
    months[e.getMonth()] +
    " " +
    e.getDate()
  );
}

export function getWeeksUntilReset(now) {
  const { weekEnd } = getCurrentWeekRange(now);
  const end = parseDate(weekEnd);
  end.setHours(23, 59, 59, 999);
  const diff = end.getTime() - (now ? now.getTime() : Date.now());
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0 };
  const totalMinutes = Math.floor(diff / (60 * 1000));
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;
  return { days, hours, minutes };
}

export function getPreviousWeeks(count, now) {
  const result = [];
  let current = getCurrentWeekRange(now);
  for (let i = 0; i < count; i++) {
    const end = parseDate(current.weekStart);
    end.setDate(end.getDate() - 1);
    const prev = getCurrentWeekRange(end);
    result.push(prev);
    current = prev;
  }
  return result;
}

export function formatDateShort(dateStr) {
  const d = parseDate(dateStr);
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  return months[d.getMonth()] + " " + d.getDate();
}

export function getStreakFromActivity(activityDates) {
  if (!activityDates || activityDates.length === 0) return 0;
  const uniqueDays = [...new Set(activityDates)].sort().reverse();
  let streak = 1;
  for (let i = 0; i < uniqueDays.length - 1; i++) {
    const curr = parseDate(uniqueDays[i]);
    const prev = parseDate(uniqueDays[i + 1]);
    const diffDays = Math.round((curr - prev) / MS_PER_DAY);
    if (diffDays === 1) streak++;
    else break;
  }
  return streak;
}
