CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS "user" (
	user_id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
	name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS "link" (
	link_id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
	link VARCHAR(255) NOT NULL,
	user_id uuid NOT NULL,
	FOREIGN KEY (user_id) REFERENCES "user" (user_id) ON DELETE CASCADE
);