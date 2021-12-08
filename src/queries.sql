// Запрос на получение списка всех категорий
SELECT *
FROM CATEGORIES

// Запрос на получение списка категорий, для которых создана минимум одна публикация (идентификатор, наименование категории)
SELECT *
FROM CATEGORIES CAT
JOIN ARTICLE_CATEGORIES AC ON CAT.ID = AC.CATEGORY_ID

// Запрос на получение списка категорий с количеством публикаций (идентификатор, наименование категории, количество публикаций в категории)
SELECT CAT.NAME AS "Имя категории",
	COUNT(AC.ARTICLE_ID) AS "Кол-во публикаций"
FROM CATEGORIES CAT
JOIN ARTICLE_CATEGORIES AC ON CAT.ID = AC.CATEGORY_ID
GROUP BY CAT.NAME

// Запрос на получение списка публикаций (идентификатор публикации, заголовок публикации, анонс публикации, дата публикации, имя и фамилия автора, контактный email, количество комментариев, наименование категорий). Сначала свежие публикации


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
		JOIN CATEGORIES CA ON AC.CATEGORY_ID = CA.ID
		WHERE ARTICLE_ID = 2) AS "Список категорий"
FROM ARTICLES AR
JOIN USERS US ON AR.USER_ID = US.ID
JOIN COMMENTS CM ON AR.ID = CM.ARTICLE_ID
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
		JOIN CATEGORIES CA ON AC.CATEGORY_ID = CA.ID
		WHERE ARTICLE_ID = 2)

// Запрос на получение списка из 5 свежих комментариев (идентификатор комментария, идентификатор публикации, имя и фамилия автора, текст комментария)
SELECT CM.ID AS "ID комментария",
	CM.ARTICLE_ID AS "ID публикации",
	US.NAME || ' ' || US.LASTNAME AS "Имя и фамилия автора",
	CM.TEXT AS "Текст комментария"
FROM COMMENTS CM
JOIN USERS US ON CM.USER_ID = US.ID
ORDER BY CM.CREATEDDATE DESC
LIMIT 5

// Запрос на получение списка комментариев для определённой публикации (идентификатор комментария, идентификатор публикации, имя и фамилия автора, текст комментария). Сначала новые комментарии
SELECT CM.ID AS "ID комментария",
	CM.ARTICLE_ID AS "ID публикации",
	US.NAME || ' ' || US.LASTNAME AS "Имя и фамилия автора",
	CM.TEXT AS "Текст комментария"
FROM COMMENTS CM
JOIN USERS US ON CM.USER_ID = US.ID
WHERE CM.ARTICLE_ID = 3
ORDER BY CM.CREATEDDATE DESC

// Запрос на обновление заголовка определённой публикации на «Как я встретил Новый год»
UPDATE ARTICLES
SET TITLE = 'Как я встретил Новый год'
WHERE ID = 2
