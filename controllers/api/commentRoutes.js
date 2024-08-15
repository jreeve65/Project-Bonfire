const router = require("express").Router();
const {Comment,User,Hobby} = require("../../models");

// GET all comments

router.get('/', async (req, res) => {
    try {
        // Example: Fetch all comments
        const comments = await Comment.findAll();
        console.log(comments);
        // res.render('all', { comments });
        res.status(200).json(comments); // Pass comments to the template
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to load comments' });
    }
});
// // Get all comments linked to a post
// router.get('/:id', async (req, res) => {
//     try {
//         // Example: Fetch all comments
//         const comments = await Comment.findByPk();
//         console.log(comments);
//         // res.render('all', { comments });
//         res.status(200).json(comments); // Pass comments to the template
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Failed to load comments' });
//     }
// });

router.get('/:id', async (req, res) => {
    try {
        // Example: Fetch all comments
        const comments = await Comment.findByPk(req.params.id);
        console.log(comments);
        // res.render('all', { comments });
        res.status(200).json(comments); // Pass comments to the template
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to load comments' });
    }
});

// POST a comment linked to a post

router.post('/', async (req, res) => {
    try {
        const comData = await Comment.create({
            message: req.body.message,
            user_id: req.session.user_id,
            post_id: req.body.post_id,
        });
        res.status(200).json(comData);
    } catch (err) {
        res.status(400).json(err);
    }
});



module.exports = router;