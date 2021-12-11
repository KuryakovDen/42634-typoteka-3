CREATE TABLE public.users (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name varchar(50) NOT NULL,
  lastName varchar(80) NOT NULL,
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
  createdDate timestamp DEFAULT current_timestamp,
  image varchar(50) NOT NULL,
  announce varchar(250) NOT NULL,
  fullText text NOT NULL,
  userId integer NOT NULL,
  FOREIGN KEY (userId) REFERENCES users(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE public.article_categories (
  articleId integer NOT NULL,
  categoryId integer NOT NULL,
  PRIMARY KEY (articleId, categoryId),
  FOREIGN KEY (articleId) REFERENCES articles(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (categoryId) REFERENCES categories(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE public.comments (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  articleId integer NOT NULL,
  userId integer NOT NULL,
  createdDate timestamp NOT NULL,
  fullText text NOT NULL,
  FOREIGN KEY (articleId) REFERENCES articles(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (userId) REFERENCES users(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE INDEX ON articles(title);
