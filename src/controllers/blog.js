const { validationResult } = require('express-validator');

exports.createBlogPost = (req, res, next) => {
    const title = req.body.title;
    // const image = req.body.image;
    const body = req.body.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const err = new Error('Invalid Value Tidak Sesuai');
        err.errorStatus = 400;
        err.data = errors.array();
        throw err;
    }

    const result = {
        message: "Create Blog Post Success",
        data: {
            post_id: 1,
            title: title,
            image: "imagefile.png",
            body: body,
            created_at: "19/10/2020",
            author: {
                uid: 1,
                name: "Sample"
            }
        }
    }

    res.status(201).json(result);
}