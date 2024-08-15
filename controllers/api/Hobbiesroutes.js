const router = require("express").Router();
const {Post, Hobby,Event, User} = require("../../models");


router.get("/:id", async (req,res)=>{
    const hobbyData = await Hobby.findByPk(req.params.id, {
        include: [
            {
                model: Post,
                attributes: [
                    'id',
                    'title', 
                    'user_id',                   
                ],
                include: [
                    {
                        model:User,
                        attributes: ['username']
                    }
                ]
            },
            {
                model: Event,
                attributes: [
                    'id',
                    'title',
                    'location',
                    'event_time',

                ]
            },
                        
        ]
    });
  
    const blog = hobbyData.get({plain:true});
    // const authorData =await User.findAll({where:{id:blog.posts[0].user_id}});
    // const authors = authorData.map((author)=>author.get({plain:true}));

   
    // console.log(blog);
    // console.log(authors);
//    console.log(blog);
//    console.log(hobbyData.posts.user);
    res.render("hobby",{
        hobby_name: blog.hobby_name,
        // username: blog.posts.user.username,
        posts: blog.posts,
    });
    });
module.exports = router;