'use strict';

const {Router} = require(`express`);
const articlesRouter = new Router();
const api = require(`../api`).getAPI();
const multer = require(`multer`);
const path = require(`path`);
const {UPLOAD_DIR} = require("../../const");
const {nanoid} = require(`nanoid`);
const {ensureArray} = require(`../../utils`)


const uploadDirAbsolute = path.resolve(__dirname, UPLOAD_DIR);

const storage = multer.diskStorage({
  destination: uploadDirAbsolute,
  filename: (req, file, cb) => {
    const uniqueName = nanoid(10);
    const extension = file.originalname.split('.').pop();
    cb(null, `${uniqueName}.${extension}`);
  }
});

const upload = multer({storage});

articlesRouter.get(`/category/:id`, (req, res) => res.render(`articles/articles-by-category`));

articlesRouter.get(`/add`, async (req, res) => {
  const categories = await api.getCategories();
  res.render(`articles/post`, {categories});
});

articlesRouter.get(`/edit/:id`, async (req, res) => {
  const {id} = req.params;
  const [article, categories] = await Promise.all([
    api.getArticle(id),
    api.getCategories()
  ]);
  res.render(`articles/post`, {article, categories});
});

articlesRouter.post(`/add`, upload.single(`upload`), async (req, res) => {
  // в `body` содержатся текстовые данные формы
  // в `file` — данные о сохранённом файле
  const {body, file} = req;
  const articleData = {
    picture: file.filename,
    fullText: body.fullText,
    title: body.title,
    announce: body.announce,
    createdDate: body.createdDate,
    category: ensureArray(body.category),
  };
  try {
    await api.createArticle(articleData);
    res.redirect(`/my`);
  } catch (error) {
    res.redirect(`back`);
  }
});

module.exports = articlesRouter;
