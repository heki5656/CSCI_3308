create database movie_db;

\c movie_db;

create table if not exists reviews(
  id serial primary key,
  title varchar(200) not null,
  review varchar(1000),
  review_date timestamp not null
);
