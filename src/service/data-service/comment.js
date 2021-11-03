'use strict';

const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../../const`);

class CommentService {
  findAll(article) {
    return article.comments;
  }

  createComment(article, comment) {
    const newComment = Object.assign({
      id: nanoid(MAX_ID_LENGTH)
    }, comment);

    article.comments.push(newComment);

    return newComment;
  }

  deleteComment(article, commentId) {
    const deletedComment = article.comments.find((comment) => comment.id === commentId);

    if (!deletedComment) {
      return null;
    }

    article.comments.filter((comment) => comment.id !== deletedComment.id);

    return deletedComment;
  }
}

module.exports = CommentService;
