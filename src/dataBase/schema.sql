DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
	id serial primary key,
  	username text not null,
  	email text not null unique,
  	password text not null	
);