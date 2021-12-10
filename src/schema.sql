CREATE TABLE public.users (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name varchar(50) NOT NULL,
  last_name varchar(80) NOT NULL,
  email varchar(80) UNIQUE NOT NULL,
  password varchar(100) NOT NULL,
  avatar varchar(50)
);

CREATE TABLE public.categories (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name varchar(50) UNIQUE NOT NULL
);

CREATE TABLE public.articles (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title varchar(150) NOT NULL,
  created_date timestamp DEFAULT current_timestamp,
  image varchar(50) NOT NULL,
  announce varchar(250) NOT NULL,
  full_text text NOT NULL,
  user_id integer NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE public.article_categories (
  article_id integer NOT NULL,
  category_id integer NOT NULL,
  PRIMARY KEY (article_id, category_id),
  FOREIGN KEY (article_id) REFERENCES articles(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (category_id) REFERENCES categories(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE public.comments (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  article_id integer NOT NULL,
  user_id integer NOT NULL,
  created_date timestamp NOT NULL,
  text text NOT NULL,
  FOREIGN KEY (article_id) REFERENCES articles(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE INDEX ON articles(title);
