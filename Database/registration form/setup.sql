CREATE DATABASE registration;
\c registration;

CREATE TABLE registrations (
  id SERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone_number TEXT,
  gender TEXT,
  program TEXT,
  registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
