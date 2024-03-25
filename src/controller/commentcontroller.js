const Comment = require("../model/commentschema.js");
const mongoose = require("mongoose");

module.exports = class CommentController {
  static async addComment(req, res) {
    try {
      const { name, email, comment, blogId } = req.body;
      const newComment = await Comment.create({
        name,
        blogId,
        email,
        comment,
      });
      return res.status(200).json({
        status: "success",
        data: newComment,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  static async getCommentById(req, res) {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          status: "fail",
          message: "Invalid comment ID",
        });
      }

      const comment = await Comment.findById(id);

      if (!comment) {
        return res.status(404).json({
          status: "fail",
          message: "Comment not found",
        });
      }

      return res.status(200).json({
        status: "success",
        data: comment,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  static async deleteComment(req, res) {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          status: "fail",
          message: "Invalid comment ID",
        });
      }

      const deletedComment = await Comment.findByIdAndDelete(id);

      if (!deletedComment) {
        return res.status(404).json({
          status: "fail",
          message: "Comment not found",
        });
      }

      return res.status(200).json({
        status: "success",
        message: "Comment successfully deleted",
        data: deletedComment,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  static async getAllComments(req, res) {
    try {
      const comments = await Comment.find();

      return res.status(200).json({
        status: "success",
        data: comments,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }
};
