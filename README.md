# Focus Flow

A modern, full-stack todo application built with Next.js 15, Supabase, and Tailwind CSS. Features user authentication, real-time updates, and a clean, responsive interface.

## Features

- 🔐 User Authentication with Supabase
- ✨ Modern UI with Tailwind CSS and Shadcn UI
- 🔄 Real-time Updates
- 🌓 Dark/Light Mode
- 📱 Responsive Design
- 🚀 Server-Side Rendering

## Tech Stack

- [Next.js 15](https://nextjs.org/)
- [Supabase](https://supabase.com/) - Backend and Authentication
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Shadcn UI](https://ui.shadcn.com/) - UI Components
- [TypeScript](https://www.typescriptlang.org/)

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js 18.17 or later
- npm or yarn
- A Supabase account

## Installation

1. Clone the repository:

```bash
git clone https://github.com/kagancubukcu/next-todo.git
cd next-todo
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory with the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Set up your Supabase project:

   - Create a new project in Supabase
   - Create a new table named `todos` with the following schema:
     ```sql
     id: uuid (primary key)
     user_id: uuid (foreign key to auth.users)
     task: text
     is_complete: boolean
     created_at: timestamp with time zone
     ```
   - Enable Row Level Security (RLS) and configure appropriate policies

5. Start the development server:

```bash
npm run dev
# or
yarn dev
```

6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

Make sure to set up the following environment variables in your `.env.local` file:

| Variable                        | Description                             |
| ------------------------------- | --------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | Your Supabase project URL               |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase project's anon/public key |

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
