const Blog = require ("../model/blogschema.js"); 
const mongoose = require ("mongoose");
const { JWT } = require ("../helper/jwt.js");
const bcrypt = require ("bcrypt");



module.exports= class UserController {
  static async createBlog(req, res) {
      try {
          const { title,description, content, tags } = req.body;
          const blog = await Blog.create({
              title,
              description,
              content,
              author: req.user.userId,
              tags,
              comments: [], // Initialize comments array
              likes: [],    // Initialize likes array
          });
          return res.status(200).json({
              status: 'success',
              data: blog,
          });
      } catch (error) {
          return res.status(500).json({
              status: 'error',
              message: error.message,
          });
      }
  }

  // Add comment to a blog post
  static async addComment(req, res) {
      try {
          const { id } = req.params;
          const { comment } = req.body;

          if (!mongoose.Types.ObjectId.isValid(id)) {
              return res.status(400).json({
                  status: 'fail',
                  message: 'Invalid blog ID',
              });
          }
          const blog = await Blog.findByIdAndUpdate(
              id,
              { $push: { comments: comment } }, // Automatically add the comment to the blog's comments array
              { new: true }
          );

          return res.status(200).json({
              status: 'success',
              data: blog,
          });
      } catch (error) {
          return res.status(500).json({
              status: 'error',
              message: error.message,
          });
      }
  }
  
  // Like a blog post
  static async likeBlog(req, res) {
      try {
          const { id } = req.params;
          const { userId } = req.user;
          if (!mongoose.Types.ObjectId.isValid(id)) {
              return res.status(400).json({
                  status: 'fail',
                  message: 'Invalid blog ID',
              });
          }
          const blog = await Blog.findByIdAndUpdate(
              id,
              { $addToSet: { likes: userId } }, 
              { new: true }
          );

          return res.status(200).json({
              status: 'success',
              data: blog,
          });
      } catch (error) {
          return res.status(500).json({
              status: 'error',
              message: error.message,
          });
      }
  }
  





  static async getAllBlogs(req, res) {
    try {
      const allBlogs = await Blog.find().populate("author");
      return res.status(200).json({
        status: "success",
        data: allBlogs,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  static async getBlogById(req, res) {
    try {
      const { id } = req.params;

      console.log(req.user)

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          status: "fail",
          message: "Invalid blog ID",
        });
      }

      const blog = await Blog.findById(id).populate("author");

      if (!blog) {
        return res.status(404).json({
          status: "fail",
          message: "Blog not found",
        });
      }

      return res.status(200).json({
        status: "success",
        data: blog,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  static async updateBlog(req, res) {

    console.log('I am called')
    try {
      const { id } = req.params;
      const { title, content, tags } = req.body;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          status: "fail",
          message: "Invalid blog ID",
        });
      }

      const updatedBlog = await Blog.findByIdAndUpdate(
        id,
        { title, content, tags },
        { new: true }
      );

      if (!updatedBlog) {
        return res.status(404).json({
          status: "fail",
          message: "Blog not found",
        });
      }

      return res.status(200).json({
        status: "success",
        data: updatedBlog,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  static async deleteBlog(req, res) {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          status: "fail",
          message: "Invalid blog ID",
        });
      }

      const deletedBlog = await Blog.findByIdAndDelete(id);

      if (!deletedBlog) {
        return res.status(404).json({
          status: "fail",
          message: "Blog not found",
        });
      }

      return res.status(200).json({
        status: "success",
        message: "Blog successfully deleted",
        data: deletedBlog,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }
}