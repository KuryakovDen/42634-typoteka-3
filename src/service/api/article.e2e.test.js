'use strict';

const express = require(`express`);
const request = require(`supertest`);

const {HttpCode} = require(`../../const`);
const article = require(`./article`);
const DataService = require(`../data-service/article`);
const CommentService = require(`../data-service/comment`);

const mockData = [
  {
    "id": "R3YVnm",
    "title": "Обзор новейшего смартфона",
    "createdDate": "2021-10-02T13:13:23.935Z",
    "announce": [
      "Ёлки — это не просто красивое дерево. Это прочная древесина.",
      "Первая большая ёлка была установлена только в 1938 году."
    ],
    "fullText": [
      "Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?",
      "Он написал больше 30 хитов.",
      "Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.",
      "Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете."
    ],
    "category": [
      "Аксессуары",
      "Одежда",
      "Кино",
      "IT"
    ],
    "comments": [
      {
        "id": "HDUd_6",
        "text": "Хочу такую же футболку :-) Плюсую, но слишком много буквы! Совсем немного... Согласен с автором!"
      },
      {
        "id": "1UXafx",
        "text": "Плюсую, но слишком много буквы! Согласен с автором! Хочу такую же футболку :-)"
      }
    ]
  },
  {
    "id": "SkzPxK",
    "title": "Как собрать камни бесконечности",
    "createdDate": "2021-09-25T13:13:23.935Z",
    "announce": [
      "Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.",
      "Первая большая ёлка была установлена только в 1938 году.",
      "Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?"
    ],
    "fullText": [
      "Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.",
      "Вы можете достичь всего. Стоит только немного постараться и запастись книгами."
    ],
    "category": [
      "Книги",
      "Кино",
      "Железо",
      "За жизнь"
    ],
    "comments": [
      {
        "id": "wy0dEr",
        "text": "Согласен с автором! Хочу такую же футболку :-) Мне кажется или я уже читал это где-то? Совсем немного..."
      }
    ]
  },
  {
    "id": "LwyX41",
    "title": "Трудно быть Богом",
    "createdDate": "2021-09-07T13:13:23.935Z",
    "announce": [
      "Первая большая ёлка была установлена только в 1938 году.",
      "Это один из лучших рок-музыкантов."
    ],
    "fullText": [
      "Из под его пера вышло 8 платиновых альбомов.",
      "Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.",
      "О том, как я попал в IT."
    ],
    "category": [
      "Деревья",
      "За жизнь",
      "Одежда"
    ],
    "comments": [
      {
        "id": "_oRuXV",
        "text": "Это где ж такие красоты?"
      },
      {
        "id": "k4QCzz",
        "text": "Ноутбуки победили. Плюсую, но слишком много буквы! Совсем немного..."
      },
      {
        "id": "po3G2t",
        "text": "Согласен с автором! Совсем немного... Это где ж такие красоты?"
      },
      {
        "id": "pS4NQU",
        "text": "Это где ж такие красоты? Совсем немного... Планируете записать видосик на эту тему"
      },
      {
        "id": "wxRMMg",
        "text": "Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Мне кажется или я уже читал это где-то? Согласен с автором! Плюсую, но слишком много буквы!"
      }
    ]
  }
];

const createAPI = () => {
  const app = express();
  const cloneData = JSON.parse(JSON.stringify(mockData));

  app.use(express.json());
  article(app, new DataService(cloneData), new CommentService());

  return app;
};

describe(`API returns a list of all articles`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/articles`);
  });

  test(`Status code must be 200`, () => expect(response.statusCode).toBe(HttpCode.SUCCESS));
  test(`Correct count of articles`, () => expect(response.body.length).toBe(3));
  test(`Correct id of first article`, () => expect(response.body[0].id).toBe(`R3YVnm`));
});

describe(`API returns an article with given id`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/articles/LwyX41`)
  });

  test(`Status code must be 200`, () => expect(response.statusCode).toBe(HttpCode.SUCCESS));
  test(`Correct title of current article`, () => expect(response.body.title).toBe(`Трудно быть Богом`));
});

describe(`API creates an article if data is valid`, () => {
  const app = createAPI();
  let response;

  const newArticle = {
    title: `Новая публикация`,
    createdDate: `2021-10-02T13:13:23.935Z`,
    announce: `Ёлки — это не просто красивое дерево. Это прочная древесина.`,
    fullText: `Он написал больше 30 хитов.`,
    category: `Одежда`
  };

  beforeAll(async () => {
    response = await request(app)
      .post(`/articles`)
      .send(newArticle)
  });

  test(`Status code must be 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));
  test(`Returns article created`, () => expect(response.body).toEqual(expect.objectContaining(newArticle)));
  test(`Article count is changed`, () => request(app)
    .get(`/articles`)
    .expect((res) => expect(res.body.length).toBe(4)));
});

describe(`API refuses to create an article if data is invalid`, () => {
  const app = createAPI();

  const newArticle = {
    title: `Новая публикация`,
    createdDate: `2021-10-02T13:13:23.935Z`,
    announce: `Ёлки — это не просто красивое дерево. Это прочная древесина.`,
    fullText: `Он написал больше 30 хитов.`,
    category: `Одежда`
  };

  test(`Without any required property response code is 400`, async () => {
    for (const key of Object.keys(newArticle)) {
      const badArticle = {...newArticle};
      delete badArticle[key];
      await request(app)
        .post(`/articles`)
        .send(badArticle)
        .expect(HttpCode.BAD_REQUEST)
    }
  });
});

describe(`API changes existent article`, () => {
  const app = createAPI();
  let response;

  const newArticle = {
    title: `Новая публикация`,
    createdDate: `2021-10-02T13:13:23.935Z`,
    announce: `Ёлки — это не просто красивое дерево. Это прочная древесина.`,
    fullText: `Он написал больше 30 хитов.`,
    category: `Одежда`
  };

  beforeAll(async () => {
    response = await request(app)
      .put(`/articles/LwyX41`)
      .send(newArticle)
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.SUCCESS));
  test(`Returns changed article`, () => expect(response.body).toEqual(expect.objectContaining(newArticle)));
  test(`Article is really changed`, () => request(app)
    .get(`/articles/LwyX41`)
    .expect((res) => expect(res.body.title).toBe(`Новая публикация`))
  );
});

test(`API returns status code 404 when trying to change non-existent article`, () => {
  const app = createAPI();

  const validArticle = {
    title: `Новая публикация`,
    createdDate: `2021-10-02T13:13:23.935Z`,
    announce: `Ёлки — это не просто красивое дерево. Это прочная древесина.`,
    fullText: `Он написал больше 30 хитов.`,
    category: `Одежда`
  };

  return request(app)
    .put(`/articles/NO_EXT`)
    .send(validArticle)
    .expect(HttpCode.NOT_FOUND)
});

test(`API returns status code 400 when trying to change an article with invalid data`, () => {
  const app = createAPI();

  const invalidArticle = {
    title: `Новая публикация`,
    createdDate: `2021-10-02T13:13:23.935Z`,
    announce: `Ёлки — это не просто красивое дерево. Это прочная древесина.`,
    fullText: `Он написал больше 30 хитов.`
  };

  return request(app)
    .put(`/articles/LwyX41`)
    .send(invalidArticle)
    .expect(HttpCode.BAD_REQUEST)
});

describe(`API correctly deletes an article`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .delete(`/articles/SkzPxK`)
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.SUCCESS));
  test(`Returns deleted article`, () => expect(response.body.id).toBe(`SkzPxK`));
  test(`Article count is 2 now`, () => request(app)
    .get(`/articles`)
    .expect((res) => expect(res.body.length).toBe(2))
  );
});

test(`API refuses to delete non-existent article`, () => {
  const app = createAPI();

  return request(app)
    .delete(`articles/NOT_EXT`)
    .expect(HttpCode.NOT_FOUND)
});


test(`API refuses to create a comment to non-existent article and returns status code 404`, () => {
  const app = createAPI();

  return request(app)
    .post(`articles/NO_EXT/comments`)
    .send({
      test: `Unknown`
    })
    .expect(HttpCode.NOT_FOUND)
});

describe(`API returns a list of comments to given article`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/articles/SkzPxK/comments`)
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.SUCCESS));
  test(`Correct count of comments`, () => expect(response.body.length).toBe(1));
  test(`Correct first id`, () => expect(response.body[0].id).toBe(`wy0dEr`));
});

test(`API refuses to delete non-existent comment`, () => {
  const app = createAPI();

  return request(app)
    .delete(`/articles/SkzPxK/comments/NO_EXT`)
    .expect(HttpCode.NOT_FOUND)
});

describe(`API creates a comment if data is valid`, () => {
  const app = createAPI();
  let response;

  const newComment = {
    text: `Some description`
  };

  beforeAll(async () => {
    response = await request(app)
      .post(`/articles/SkzPxK/comments`)
      .send(newComment)
  });

  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));
  test(`Comment created`, () => expect(response.body).toEqual(expect.objectContaining(newComment)));

  test(`Comment count has changed`, () => {
    request(app)
      .get(`/articles/SkzPxK/comments`)
      .expect((res) => expect(res.body.length).toBe(2))
  });
});

test(`API refuses to create a comment when data is invalid, and returns status code 400`, () => {
  const app = createAPI();

  return request(app)
    .post(`/articles/SkzPxK/comments`)
    .send({})
    .expect(HttpCode.BAD_REQUEST)
});

describe(`API correctly deletes a comment`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .delete(`/articles/SkzPxK/comments/wy0dEr`)
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.SUCCESS));
  test(`Returns deleted comment`, () => expect(response.body.id).toBe(`wy0dEr`));

  test(`Comment count has changed`, () => {
    request(app)
      .get(`/articles/SkzPxK/comments`)
      .expect((res) => expect(res.body.length).toBe(0))
  });
});
