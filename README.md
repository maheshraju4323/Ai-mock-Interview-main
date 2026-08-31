# AI Mock Interview

## Overview

AI-powered platform where users can practice mock interviews, answer AI-generated questions, receive feedback, ratings, and performance reports.

## Features

- AI-powered Mock Interviews
- Technical Interviews
- HR Interviews
- Behavioral Interviews
- Coding Interviews
- CSE interview preparation
- ECE/EC interview preparation
- Mechanical Engineering interview preparation
- AI-generated questions
- Answer evaluation and feedback
- Performance reports
- Question bank and practice
- User authentication
- Interview history

## Interview Flow

Create New Interview
→ Select Branch
→ Select Job Role
→ Select Interview Type
→ Enter Interview Details
→ Generate AI Questions
→ Answer Questions
→ Receive AI Feedback
→ View Performance Report

## Supported Branches

- Computer Science Engineering (CSE)
- Electronics and Communication Engineering (ECE/EC)
- Mechanical Engineering

## Interview Types

- Technical Interview
- HR Interview
- Behavioral Interview
- Coding Interview

## Technology Stack

- Next.js
- React
- Tailwind CSS
- Google Gemini AI
- Neon PostgreSQL
- Drizzle ORM
- Clerk Authentication

## Installation

```bash
git clone https://github.com/maheshraju4323/Ai-mock-Interview-main.git
cd Ai-mock-Interview-main
npm install
npm run dev
```

## Getting Started

1. Clone the repository using the command above.
2. Install dependencies with `npm install`.
3. Start the development server with `npm run dev`.
4. Open your browser and go to http://localhost:3000 to access the application.

## Environment Variables

Before running the application, create a `.env.local` file in the project root with the following keys:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
GEMINI_API_KEY=your_gemini_api_key
DRIZZLE_DB_URL=your_neon_postgresql_connection_string
```

You can obtain these by signing up for:

- [Clerk](https://clerk.com) for authentication keys
- [Google AI Studio](https://aistudio.google.com) for the Gemini API key
- [Neon](https://neon.tech) for a serverless PostgreSQL connection string

## Usage

- **Create an account** to start your mock interview sessions.
- **Select a branch and interview type** (technical, HR, behavioral, coding) for your target role.
- **Enter your interview details** (job role, description, and experience level).
- **Answer AI-generated questions** tailored to your branch and interview type.
- **Receive feedback and ratings** on each of your answers.
- **Review your performance reports** and interview history to keep improving.
