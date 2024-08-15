const router = require("express").Router();

// Import any models you plan to use for data's routes here
const {
  User,
  Hobby,
  Event,
  UserHobbies,
  Post,
  Comment,
} = require("../models/");

// If you would like to use an authGuard middleware, import it here

// add a get / (landing page) route here
router.get("/", async (req, res) => {
  try {
    // const homeUser = req.session.user_id
    
    //   const profile = await(User.findByPk(req.session.id))
    let hobbyArray = [];
    if(req.session.user_id){
      const UserHobbiesData = await UserHobbies.findAll({where:{user_id:req.session.user_id}});
     
        const hobbies = UserHobbiesData.map((hobby)=> hobby.get({plain:true}));
        // const name = profile.username;
        
       
         for(let i = 0; i<hobbies.length;i++){
          let hobbyToPush =await Hobby.findByPk(hobbies[i].hobby_id);
          const hobby = hobbyToPush.get({plain: true});
          hobbyArray.push(hobby);

  
      };
      }
     

    res.render("home", {
      hobbyArray,
      loggedIn: req.session.logged_in,
      username: req.session.username,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get a post and all comments linked to it
router.get("/post/:id", async (req, res) => {
  try {
    const postWithComments = await Post.findByPk(req.params.id, {
      attributes: ["id", "message", "user_id", "created_at"],
      include: [
        {
          model: User,
          attributes:["username"],
        },
        {
          model: Comment,
          attributes: ["id", "message", "post_id"],
          include: [{ model: User, attributes: ["username"] }],
        },
      ],
    });
    if (!postWithComments) {
      return res.status(404).json({ error: "Post not found" });
    }
    
    const thread = postWithComments.get({ plain: true });
    

    const comments = thread.comments || [];
    

    const commentArray = comments.map((comment) => comment);

    
    res.render("single-post", {
      thread,
      postWithComments,
      commentArray,
      comments,
      // username: comments.user.username
      // loggedIn: req.session.logged_in,
      // username: req.session.username,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// add a get /login route here
router.get("/login", (req, res) => {
  try {
    res.render("login");
  } catch (err) {
    res.status(500).json(err);
  }
});

// add a get /signup route here
router.get("/signup", (req, res) => {
  try {
    res.render("signup");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
