const router = require("express").Router();

// import any models you plan to use for this data's routes here
const { myBlogPost } = require("../../models");


router.post('/', async (req, res) => {
    try {
        const postData = await myBlogPost.create(req.body,
            { post_title: req.body.post_title,
              post_content: req.body.post_content,
              user_id: req.session.user_id
            });
            res.status(200).json(postData);
    } catch (err) {
        res.status(400).json(err);
    }
});


router.put("/:id", apiGuard, async (req, res) => {
  try {
    const [updatedRows] = await ExampleData.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (updatedRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", apiGuard, async (req, res) => {
  try {
    const [destroyedRows] = ExampleData.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (destroyedRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;