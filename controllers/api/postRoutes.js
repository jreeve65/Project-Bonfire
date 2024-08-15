const router = require("express").Router();

// import any models you plan to use for this data's routes here
const { Post, Comment, Hobby } = require("../../models");

// GET all posts
router.get("/", async (req, res) => {
  try {
    // Example: Fetch all postData
    const postData = await Post.findAll();
    console.log(postData);
    // res.render('all', { postData });
    res.status(200).json(postData); // Pass postData to the template
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load Posts" });
  }
});

// // Search by Post by ID -- still good
// router.get("/:id", async (req, res) => {
//   try {
//     // Example: Fetch all post
//     const post = await Post.findByPk(req.params.id);
//     console.log(post);
//     // res.render('all', { post });
//     res.status(200).json(post); // Pass post to the template
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to load post" });
//   }
// });

// Post a new Post
router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const postData = await Post.create({
      message: req.body.post.message,
      title: req.body.post.title,
      user_id: req.session.user_id,
      hobby_id: req.body.post.hobby_id,
    });
    res.status(200).json(postData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// Delete a Post
router.delete("/:id", async (req, res) => {
  try {
    const result = await Post.destroy({
      where: { id: req.params.id },
    });
    if (!result) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete post" });
  }
});

// Get a post and all comments linked to it
router.get("/:id", async (req, res) => {
  try {
    const postWithComments = await Post.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          required: false,
        },
      ],
    });

    if (!postWithComments) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json(postWithComments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load post and comments" });
  }
});

// } catch (err) {
//   res.status(500).json(err);
// }});
// idk what the below does.
// router.post('/', async (req, res) => {
//     try {
//         const postData = await Post.create(req.body,
//             { post_title: req.body.post_title,
//               post_content: req.body.post_content,
//               user_id: req.session.user_id
//             });
//             res.status(200).json(postData);
//     } catch (err) {
//         res.status(400).json(err);
//     }
// });

// router.get('/:id', async (req, res) => {
//     try {
//         // Example: Fetch all post
//         const post = await Post.findByPk();
//         console.log(post);
//         // res.render('all', { post });
//         res.status(200).json(post); // Pass post to the template
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Failed to load post' });
//     }
// });

module.exports = router;
