DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
	id serial primary key,
  	username text not null,
  	email text not null unique,
	cities text[] default '{}',
	detached varchar(60),
  	password text not null,
	reset_key varchar(10) default ''	
);