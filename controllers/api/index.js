const router = require("express").Router();

// Import all of the routes from /api/ here
const userRoutes = require("./userRoutes");
const eventRoutes = require("./eventRoutes");
const postRoutes = require("./postRoutes");
const hobbiesRoutes = require("./Hobbiesroutes");
// const hobby = require("./hobbyRoutes");
// const blogRoutes = require("./blogRoutes");
const commentRoutes = require("./commentRoutes");


// Connect the routes to the router here
router.use("/users", userRoutes);
// router.use("/myBlogs", myBlogRoutes);
// router.use("/myEventRoutes", myEventRoutes);
router.use("/event", eventRoutes);
router.use("/post", postRoutes);
router.use("/hobbies",hobbiesRoutes);
// router.use("/hobby", hobbiesRoutes);
// router.use("/blogs", blogRoutes);
router.use("/comment", commentRoutes);


// router.use("/exampleData", exampleDataRoutes);

module.exports = router;
