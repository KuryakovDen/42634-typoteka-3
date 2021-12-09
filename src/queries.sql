// Запрос на получение списка всех категорий
SELECT *
FROM CATEGORIES

// Запрос на получение списка категорий, для которых создана минимум одна публикация (идентификатор, наименование категории)
SELECT *
FROM CATEGORIES CAT
JOIN ARTICLE_CATEGORIES AC ON CAT.ID = AC.CATEGORYID

// Запрос на получение списка категорий с количеством публикаций (идентификатор, наименование категории, количество публикаций в категории)
SELECT CAT.NAME AS "Имя категории",
	COUNT(AC.ARTICLEID) AS "Кол-во публикаций"
FROM CATEGORIES CAT
JOIN ARTICLE_CATEGORIES AC ON CAT.ID = AC.CATEGORYID
GROUP BY CAT.NAME

// Запрос на получение списка публикаций (идентификатор публикации, заголовок публикации, анонс публикации, дата публикации, имя и фамилия автора, контактный email, количество комментариев, наименование категорий). Сначала свежие публикации
SELECT AR.ID AS "ID публикации",
	AR.TITLE AS "Заголовок публикации",
	AR.ANNOUNCE AS "Анонс",
	AR.CREATEDDATE AS "Дата публикации",
	AR.IMAGE AS "Путь к изображению",
	US.NAME || ' ' || US.LASTNAME AS "Имя и фамилия автора",
	US.EMAIL,
	COUNT(CM.ID) AS "Кол-во комментариев",
	STRING_AGG(DISTINCT CA.NAME,

		', ')
FROM ARTICLES AR
JOIN ARTICLE_CATEGORIES AC ON AR.ID = AC.ARTICLEID
JOIN CATEGORIES CA ON AC.CATEGORYID = CA.ID
LEFT JOIN COMMENTS CM ON AR.ID = CM.ARTICLEID
JOIN USERS US ON AR.USERID = US.ID
GROUP BY AR.ID,
	AR.TITLE,
	AR.ANNOUNCE,
	AR. FULLTEXT,
	AR.CREATEDDATE,
	AR.IMAGE,
	US.NAME || ' ' || US.LASTNAME,
	US.EMAIL
ORDER BY AR.CREATEDDATE DESC

// Запрос на получение полной информации определённой публикации (идентификатор публикации, заголовок публикации, анонс, полный текст публикации, дата публикации, путь к изображению, имя и фамилия автора, контактный email, количество комментариев, наименование категорий)
SELECT AR.ID AS "ID публикации",
	AR.TITLE AS "Заголовок публикации",
	AR.ANNOUNCE AS "Анонс",
	AR. FULLTEXT AS "Полный текст",
	AR.CREATEDDATE AS "Дата публикации",
	AR.IMAGE AS "Путь к изображению",
	US.NAME || ' ' || US.LASTNAME AS "Имя и фамилия автора",
	US.EMAIL,
	COUNT(CM.ID) AS "Кол-во комментариев",

	(SELECT STRING_AGG(DISTINCT CA.NAME,

										', ')
		FROM ARTICLE_CATEGORIES AC
		JOIN CATEGORIES CA ON AC.CATEGORYID = CA.ID
		WHERE ARTICLEID = 2) AS "Список категорий"
FROM ARTICLES AR
JOIN USERS US ON AR.USERID = US.ID
JOIN COMMENTS CM ON AR.ID = CM.ARTICLEID
WHERE AR.ID = 2
GROUP BY AR.ID,
	AR.TITLE,
	AR.ANNOUNCE,
	AR. FULLTEXT,
	AR.CREATEDDATE,
	AR.IMAGE,
	US.NAME || ' ' || US.LASTNAME,
	US.EMAIL,
	(SELECT STRING_AGG(DISTINCT CA.NAME,

										', ')
		FROM ARTICLE_CATEGORIES AC
		JOIN CATEGORIES CA ON AC.CATEGORYID = CA.ID
		WHERE ARTICLEID = 2)

// Запрос на получение списка из 5 свежих комментариев (идентификатор комментария, идентификатор публикации, имя и фамилия автора, текст комментария)
SELECT CM.ID AS "ID комментария",
	CM.ARTICLEID AS "ID публикации",
	US.NAME || ' ' || US.LASTNAME AS "Имя и фамилия автора",
	CM.TEXT AS "Текст комментария"
FROM COMMENTS CM
JOIN USERS US ON CM.USERID = US.ID
ORDER BY CM.CREATEDDATE DESC
LIMIT 5

// Запрос на получение списка комментариев для определённой публикации (идентификатор комментария, идентификатор публикации, имя и фамилия автора, текст комментария). Сначала новые комментарии
SELECT CM.ID AS "ID комментария",
	CM.ARTICLEID AS "ID публикации",
	US.NAME || ' ' || US.LASTNAME AS "Имя и фамилия автора",
	CM.TEXT AS "Текст комментария"
FROM COMMENTS CM
JOIN USERS US ON CM.USERID = US.ID
WHERE CM.ARTICLEID = 3
ORDER BY CM.CREATEDDATE DESC

// Запрос на обновление заголовка определённой публикации на «Как я встретил Новый год»
UPDATE ARTICLES
SET TITLE = 'Как я встретил Новый год'
WHERE ID = 2
