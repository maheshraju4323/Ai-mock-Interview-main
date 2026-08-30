import { relations } from "drizzle-orm";
import { boolean, integer, pgEnum, serial, text, varchar } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

export const MockInterview = pgTable('mockInterview', {
    id: serial('id').primaryKey(),
    jsonMockResp: text('jsonMockResp').notNull(),
    jobPosition: varchar('jobPosition').notNull(),
    jobDesc: varchar('jobDesc').notNull(),
    jobExperience: varchar('jobExperience').notNull(),
    createdBy: varchar('createdBy').notNull(),
    createdAt: varchar('createdAt'),
    mockId: varchar('mockId').notNull()
});

export const Question = pgTable('question', {
    id: serial('id').primaryKey(),
    MockQuestionJsonResp: text('MockQuestionJsonResp').notNull(),
    jobPosition: varchar('jobPosition').notNull(),
    jobDesc: varchar('jobDesc').notNull(),
    jobExperience: varchar('jobExperience').notNull(),
    typeQuestion: varchar('typeQuestion').notNull(),
    company: varchar('company').notNull(),
    createdBy: varchar('createdBy').notNull(),
    createdAt: varchar('createdAt'),
    mockId: varchar('mockId').notNull()
});

export const UserAnswer = pgTable('userAnswer', {
    id: serial('id').primaryKey(),
    mockIdRef: varchar('mockId').notNull(),
    question: varchar('question').notNull(),
    correctAns: text('correctAns'),
    userAns: text('userAns'),
    feedback: text('feedback'),
    rating: varchar('rating'),
    userEmail: varchar('userEmail'),
    createdAt: varchar('createdAt')
});

export const courses = pgTable("courses", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    imageSrc: text("image_src").notNull()
});

export const coursesRelations = relations(courses, ({ many }) => ({
    userProgress: many(userProgress),
    units: many(units)
}));

export const units = pgTable("units", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(), // unit 1
    description: text("description").notNull(), // learn the basics of software development
    courseId: integer("course_id").references(() => courses.id, { onDelete: "cascade" }).notNull(),
    order: integer("order").notNull()
})

export const unitsRelations = relations(units, ({ many, one }) => ({
    course: one(courses, {
        fields: [units.courseId],
        references: [courses.id],
    }),
    lessons: many(lessons)
}))

export const challengesEnum = pgEnum("type", ["SELECT","ASSIST"])

export const challenges = pgTable("challenges",{
    id: serial("id").primaryKey(),
    lessonId: integer("lesson_id").references(()=>lessons.id, {onDelete:"cascade"}).notNull(),
    type: challengesEnum("type").notNull(),
    duoQuestion: text("question").notNull(),
    order: integer("order").notNull()
})

export const challengesRelations = relations(challenges, ({one, many})=>({
    lesson: one(lessons,{
        fields:[challenges.lessonId],
        references: [lessons.id]
    }),
    challengeOptions: many(challengesOptions),
    challengeProgress: many(challengeProgress)
}))


export const challengesOptions = pgTable("challenges_options",{
    id: serial("id").primaryKey(),
    challengeId: integer("challenge_id").references(()=>challenges.id, {onDelete:"cascade"}).notNull(),
    text: text("text").notNull(),
    correct: boolean("correct").notNull(),
    imageSrc: text("image_src"),
    audioSrc: text("audio_src")
})

export const challengeOptionsRelations = relations(challengesOptions, ({one})=>({
    challenge: one(challenges,{
        fields:[challengesOptions.challengeId],
        references: [challenges.id]
    }),
}))


export const challengeProgress = pgTable("challenge_progress",{
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    challengeId: integer("challenge_id").references(()=>challenges.id, {onDelete:"cascade"}).notNull(),
    completed: boolean("completed").notNull().default(false)
})

export const challengeProgressRelations = relations(challengeProgress, ({one})=>({
    challenge: one(challenges,{
        fields:[challengeProgress.challengeId],
        references: [challenges.id]
    }),
}))

export const lessons = pgTable("lessons", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    unitId: integer("unit_id").references(() => units.id, { onDelete: "cascade" }).notNull(),
    order: integer("order").notNull()
})

export const lessonsRelations = relations(lessons, ({one, many})=>({
    unit: one(units,{
        fields:[lessons.unitId],
        references: [units.id]
    }),
    challenges: many(challenges)
}))

export const userProgress = pgTable("user_progress", {
    userId: text("user_id").primaryKey(),
    userName: text("user_name").notNull().default("User"),
    userImageSrc: text("user_image_src").notNull().default("/logo.svg"),
    activeCourseId: integer("active_course_id").references(() => courses.id, { onDelete: "cascade" }),
    hearts: integer("hearts").notNull().default(5),
    points: integer("points").notNull().default(0),
});


export const userProgressRelations = relations(userProgress, ({ one }) => ({
    activeCourse: one(courses, {
        fields: [userProgress.activeCourseId],
        references: [courses.id]
    })
}));

export const dailyProgress = pgTable('dailyProgress', {
  id: serial('id').primaryKey(),
  userId: text('userId').notNull(),
  date: varchar('date').notNull(),
  questionsAnswered: integer('questionsAnswered').notNull().default(0),
  correctAnswers: integer('correctAnswers').notNull().default(0),
  interviewsCompleted: integer('interviewsCompleted').notNull().default(0),
  pointsEarned: integer('pointsEarned').notNull().default(0),
  streakDays: integer('streakDays').notNull().default(0),
});

export const Newsletter = pgTable('newsletter', {
    id: serial('id').primaryKey(),
    newName: varchar('newName'),
    newEmail: varchar('newEmail'),
    newMessage: text('newMessage'),
    createdAt: varchar('createdAt')
});

export const QuestionBank = pgTable('questionBank', {
    id: serial('id').primaryKey(),
    course: varchar('course').notNull(),
    topic: varchar('topic').notNull(),
    difficulty: varchar('difficulty').notNull(),
    question: text('question').notNull(),
    options: text('options'),
    correctAnswer: varchar('correctAnswer').notNull(),
    explanation: text('explanation').notNull(),
});

export const HrQuestions = pgTable('hrQuestions', {
    id: serial('id').primaryKey(),
    category: varchar('category').notNull(),
    question: text('question').notNull(),
    suggestedAnswer: text('suggestedAnswer'),
    tips: text('tips'),
});

export const weeklyCompetition = pgTable('weeklyCompetition', {
    id: serial('id').primaryKey(),
    userId: text('userId').notNull(),
    userName: text('userName').notNull().default('User'),
    weekStart: varchar('weekStart').notNull(),
    weekEnd: varchar('weekEnd').notNull(),
    points: integer('points').notNull().default(0),
    questionsCompleted: integer('questionsCompleted').notNull().default(0),
    correctAnswers: integer('correctAnswers').notNull().default(0),
    interviewsCompleted: integer('interviewsCompleted').notNull().default(0),
    challengesCompleted: integer('challengesCompleted').notNull().default(0),
    createdAt: varchar('createdAt'),
    updatedAt: varchar('updatedAt'),
});

export const weeklyCompetitionHistory = pgTable('weeklyCompetitionHistory', {
    id: serial('id').primaryKey(),
    userId: text('userId').notNull(),
    userName: text('userName').notNull().default('User'),
    weekStart: varchar('weekStart').notNull(),
    weekEnd: varchar('weekEnd').notNull(),
    points: integer('points').notNull().default(0),
    questionsCompleted: integer('questionsCompleted').notNull().default(0),
    correctAnswers: integer('correctAnswers').notNull().default(0),
    interviewsCompleted: integer('interviewsCompleted').notNull().default(0),
    challengesCompleted: integer('challengesCompleted').notNull().default(0),
    rank: integer('rank'),
    createdAt: varchar('createdAt'),
});

export const pointsLog = pgTable('pointsLog', {
    id: serial('id').primaryKey(),
    userId: text('userId').notNull(),
    weekStart: varchar('weekStart').notNull(),
    activityType: varchar('activityType').notNull(),
    activityId: varchar('activityId').notNull(),
    points: integer('points').notNull().default(0),
    createdAt: varchar('createdAt'),
});
