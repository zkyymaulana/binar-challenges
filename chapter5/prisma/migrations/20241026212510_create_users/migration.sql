CREATE TABLE users (
	id bigserial NOT NULL,
	"name" varchar NOT NULL,
	email varchar NOT NULL,
	"password" varchar NOT NULL,
	profile_picture varchar NULL,
	role_id int DEFAULT 2 NOT NULL,
	CONSTRAINT users_pk PRIMARY KEY (id)
);