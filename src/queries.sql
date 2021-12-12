// Запрос на получение списка всех категорий
SELECT *
FROM categories

// Запрос на получение списка категорий, для которых создана минимум одна публикация (идентификатор, наименование категории)
SELECT *
FROM categories cat
JOIN article_categories ac ON cat.id = ac.categoryId

// Запрос на получение списка категорий с количеством публикаций (идентификатор, наименование категории, количество публикаций в категории)
SELECT cat.name AS "Имя категории",
	COUNT(ac.articleId) AS "Кол-во публикаций"
FROM categories cat
JOIN article_categories ac ON cat.id = ac.categoryId
GROUP BY cat.name

// Запрос на получение списка публикаций (идентификатор публикации, заголовок публикации, анонс публикации, дата публикации, имя и фамилия автора, контактный email, количество комментариев, наименование категорий). Сначала свежие публикации
SELECT ar.id AS "ID публикации",
	ar.title AS "Заголовок публикации",
	ar.announce AS "Анонс",
	ar.createdDate AS "Дата публикации",
	ar.image AS "Путь к изображению",
	us.name || ' ' || us.lastName AS "Имя и фамилия автора",
	us.email,
	COUNT(cm.id) AS "Кол-во комментариев",
	STRING_AGG(DISTINCT ca.name, ', ')
FROM articles ar
JOIN article_categories ac ON ar.id = ac.articleId
JOIN categories ca ON ac.categoryId = ca.id
LEFT JOIN comments cm ON ar.id = cm.articleId
JOIN users us ON ar.userId = us.id
GROUP BY ar.id,
	ar.title,
	ar.announce,
	ar.fullText,
	ar.createdDate,
	ar.image,
	us.name || ' ' || us.lastName,
	us.email
ORDER BY ar.createdDate DESC

// Запрос на получение полной информации определённой публикации (идентификатор публикации, заголовок публикации, анонс, полный текст публикации, дата публикации, путь к изображению, имя и фамилия автора, контактный email, количество комментариев, наименование категорий)
SELECT ar.id AS "ID публикации",
	ar.title AS "Заголовок публикации",
	ar.announce AS "Анонс",
	ar.fullText AS "Полный текст",
	ar.createdDate AS "Дата публикации",
	ar.image AS "Путь к изображению",
	us.name || ' ' || us.lastName AS "Имя и фамилия автора",
	us.email,
	COUNT(cm.id) AS "Кол-во комментариев",

	(SELECT STRING_AGG(DISTINCT ca.name, ', ')
		FROM article_categories ac
		JOIN categories ca ON ac.categoryId = ca.id
		WHERE articleId = 2) AS "Список категорий"
FROM articles ar
JOIN users us ON ar.userId = us.id
JOIN comments cm ON ar.id = cm.articleId
WHERE ar.id = 2
GROUP BY ar.id,
	ar.title,
	ar.announce,
	ar.fullText,
	ar.createdDate,
	ar.image,
	us.name || ' ' || us.lastName,
	us.email,
	(SELECT STRING_AGG(DISTINCT ca.name, ', ')
		FROM article_categories ac
		JOIN categories ca ON ac.categoryId = ca.id
		WHERE articleId = 2)

// Запрос на получение списка из 5 свежих комментариев (идентификатор комментария, идентификатор публикации, имя и фамилия автора, текст комментария)
SELECT cm.id AS "ID комментария",
	cm.articleId AS "ID публикации",
	us.name || ' ' || us.lastName AS "Имя и фамилия автора",
	cm.fullText AS "Текст комментария"
FROM comments cm
JOIN users us ON cm.userId = us.id
ORDER BY cm.createdDate DESC
LIMIT 5

// Запрос на получение списка комментариев для определённой публикации (идентификатор комментария, идентификатор публикации, имя и фамилия автора, текст комментария). Сначала новые комментарии
SELECT cm.id AS "ID комментария",
	cm.articleId AS "ID публикации",
	us.name || ' ' || us.lastName AS "Имя и фамилия автора",
	cm.fullText AS "Текст комментария"
FROM comments cm
JOIN users us ON cm.userId = us.id
WHERE cm.articleId = 1
ORDER BY cm.createdDate DESC

// Запрос на обновление заголовка определённой публикации на «Как я встретил Новый год»
UPDATE articles
SET title = 'Как я встретил Новый год'
WHERE id = 2
