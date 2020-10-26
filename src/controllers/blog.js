const { validationResult } = require('express-validator');
const BlogPost = require('../models/blog');
const { Error } = require('mongoose');
const path = require('path');
const fs = require('fs');

exports.createBlogPost = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const err = new Error('Input Value Tidak Sesuai');
        err.errorStatus = 400;
        err.data = errors.array();
        throw err;
    }

    if (!req.file) {
        const err = new Error('Image harus di upload');
        err.errorStatus = 422;
        throw err;
    }

    const title = req.body.title;
    const body = req.body.body;
    const image = req.file.path;

    const Posting = new BlogPost({
        title: title,
        body: body,
        image: image,
        author: { uid: 1, name: 'Ardan Juniar' }
    });

    Posting.save()
        .then(result => {
            res.status(201).json({
                message: 'Create Blog Post Success',
                data: result
            });
        })
        .catch(err => {
            console.log('Err: ', err);
        });
}

exports.getAllBlogPost = (req, res, next) => {
    BlogPost.find()
        .then(result => {
            res.status(200).json({
                message: 'Data blog post berhasil dipanggil',
                data: result
            })
        })
        .catch(err => {
            next(err)
        });
}

exports.getBlogPostById = (req, res, next) => {
    const postId = req.params.postId;
    BlogPost.findById(postId)
        .then(result => {
            if (!result) {
                const error = new Error('Blog post tidak ditemukan');
                error.errorStatus = 404;
                throw error;
            }

            res.status(200).json({
                message: 'Data blog post berhasil dipanggil',
                data: result,
            });
        })
        .catch(err => {
            next(err);
        });
}

exports.updateBlogPost = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const err = new Error('Input Value Tidak Sesuai');
        err.errorStatus = 400;
        err.data = errors.array();
        throw err;
    }

    if (!req.file) {
        const err = new Error('Image harus di upload');
        err.errorStatus = 422;
        throw err;
    }

    const postId = req.params.postId;
    const title = req.body.title;
    const body = req.body.body;
    const image = req.file.path;

    BlogPost.findById(postId)
        .then(post => {
            if (!post) {
                const error = new Error('Blog post tidak ditemukan');
                error.errorStatus = 404;
                throw error;
            }

            post.title = title;
            post.body = body;
            post.image = image;

            return post.save();
        })
        .then(result => {
            res.status(200).json({
                message: 'Update sukses',
                data: result,
            })
        })
        .catch(err => {
            next(err);
        });

}

exports.deleteBlogPost = (req, res, next) => {
    const postId = req.params.postId;

    BlogPost.findById(postId)
        .then(post => {
            if (!post) {
                const err = new Error('Input Value Tidak Sesuai');
                err.errorStatus = 400;
                err.data = errors.array();
                throw err;
            }

            removeImage(post.image);
            return BlogPost.findByIdAndRemove(postId);
        })
        .then(result => {
            res.status(200).json({
                message: 'Hapus blog post berhasil',
                data: result,
            });
        })
        .catch(err => {
            next(err);
        });
}

const removeImage = (filePath) => {
    filePath = path.join(__dirname, '../..', filePath);
    fs.unlink(filePath, err => {
        console.log(err)
    });
}