// Запрос на заполнение таблицы users
insert into users (name, lastname, email, password, avatar) values
('Денис', 'Куряков', 'fifer2@yandex.ru', '123456', null),
('Иван', 'Иванов', 'fifer16@yandex.ru', '5f4dcc3b5aa765d61d8327deb882cf99', 'avatar2.jpg'),
('Петр', 'Петров', 'petrov@yandex.ru', '5f4dcc3b5aa765d61d8327deb882cf98', 'avatar4.jpg'),
('Владимир', 'Васин', 'vasin@mail.ru', '5f4dcc3b5aa765d61d8327deb882cf97', 'avatar1.jpg'),
('Алёна', 'Габисова', 'gadisova@mail.ru', '5f4dcc3b5aa765d61d8327deb882cf95', null),
('Екатерина', 'Байдашева', 'baydasheva@yandex.ru', 'qwerty', null);

// Запрос на заполнение таблицы categories
insert into categories (name) values
('Деревья'),
('Разное'),
('Автомобили'),
('ИТ'),
('За жизнь'),
('Техника'),
('Одежда'),
('Музыка'),
('Живопись'),
('Аксессуары'),
('Книги'),
('Кино')

// Запрос на заполнение таблицы articles
insert into articles (title, createdDate, image, announce, fullText, user_id) values
('Пиши, сокращай', '2021-10-19T10:35:40.954Z', 'avatar1.jpg', 'О том, как я попал в IT.', 'Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Первая большая ёлка была установлена только в 1938 году.', 9),
('Как собрать камни бесконечности', '2021-11-07T10:35:40.954Z', 'avatar3.jpg', 'Золотое сечение — соотношение двух величин, гармоническая пропорция.', 'Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры.', 11),
('Как я стал программистом', '2021-11-21T10:35:40.954Z', 'avatar2.jpg', 'Достичь успеха помогут ежедневные повторения.', 'Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.', 12)

// Запрос на заполнение таблицы article_categories
insert into article_categories (article_id, category_id) values
(1, 7),
(1, 10),
(2, 8),
(2, 11),
(2, 15),
(2, 17),
(3, 16)

// Запрос на заполнение таблицы comments
insert into comments (article_id, user_id, createdDate, text) values
(1, 10, '2021-11-07 10:35:40.954', 'Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Хочу такую же футболку :-) Планируете записать видосик на эту тему Мне кажется или я уже читал это где-то? Согласен с автором! Совсем немного... Это где ж такие красоты?'),
(1, 12, '2021-10-19 10:35:40.954', 'Планируете записать видосик на эту тему Мне кажется или я уже читал это где-то? Это где ж такие красоты?'),
(2, 9, '2021-11-21 10:35:40.954', 'Мне кажется или я уже читал это где-то?'),
(2, 13, '2021-10-18 10:35:40.954', 'Плюсую, но слишком много буквы! Мне кажется или я уже читал это где-то? Совсем немного...'),
(2, 11, '2021-11-07 10:35:40.954', 'Согласен с автором!'),
(3, 14, '2021-11-07 10:35:40.954', 'Ощущение, что вы меня поучаете.'),
(3, 12, '2021-11-21 10:35:40.954', 'Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.')
