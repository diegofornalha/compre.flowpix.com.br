-- Create the users table
create table users (
  id uuid references auth.users primary key,
  wallet_address text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create the transactions table
create table transactions (
  id bigint primary key generated always as identity,
  user_id uuid references users(id),
  amount decimal not null,
  currency text not null,
  status text not null,
  transaction_hash text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create the rewards table
create table rewards (
  id bigint primary key generated always as identity,
  user_id uuid references users(id),
  amount decimal not null,
  status text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table users enable row level security;
alter table transactions enable row level security;
alter table rewards enable row level security;

-- Create policies
create policy "Users can read their own data"
on users for select
using (auth.uid() = id);

create policy "Users can update their own data"
on users for update
using (auth.uid() = id);

create policy "Users can read their own transactions"
on transactions for select
using (auth.uid() = user_id);

create policy "Users can read their own rewards"
on rewards for select
using (auth.uid() = user_id); 