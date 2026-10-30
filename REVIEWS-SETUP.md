# Make reviews public and permanent (free, about 5 minutes)

Reviews need a small online database so every visitor sees the same wall and nothing disappears.
This project uses Supabase (free plan).

1. Create an account at https://supabase.com and click "New project".
2. Open the SQL Editor, paste this, and click Run:

```sql
create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 40),
  role text check (char_length(role) <= 60),
  rating int not null check (rating between 1 and 5),
  message text not null check (char_length(message) between 10 and 500),
  created_at timestamptz not null default now()
);
alter table public.reviews enable row level security;
create policy "anyone can read reviews" on public.reviews for select using (true);
create policy "anyone can add a review" on public.reviews for insert with check (true);
```

3. Go to Project Settings > API. Copy the Project URL and the "anon public" key.
4. In this folder, copy `.env.example` to `.env` and paste both values.
5. Restart `npm run dev` (or rebuild). The "Demo mode" banner disappears.

## Deleting a review
Visitors can add reviews but can never edit or delete them. Only you can remove one:
Supabase dashboard > Table Editor > reviews > select the row > Delete.

## Hosting note
When you deploy (Netlify, Vercel...), add the same two variables in the host's environment settings.
