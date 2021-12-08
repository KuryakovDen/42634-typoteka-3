CREATE TABLE articles (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title varchar(150) NOT NULL,
  createdDate timestamp NOT NULL,
  image varchar(50) NOT NULL,
  announce varchar(250) NOT NULL,
  fullText text NOT NULL
);

CREATE TABLE categories (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name varchar(50) NOT NULL
);

CREATE TABLE article_categories (
  article_id integer NOT NULL,
  category_id integer NOT NULL,
  PRIMARY KEY(article_id, category_id)
);

CREATE TABLE users (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name varchar(50) NOT NULL,
  lastName varchar(80) NOT NULL,
  email varchar(80) NOT NULL,
  password varchar(100) NOT NULL,
  avatar varchar(50),
);

CREATE TABLE comments (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  article_id integer NOT NULL,
  user_id integer NOT NULL,
  createdDate: timestamp NOT NULL,
  text text NOT NULL
);
