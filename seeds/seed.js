const sequelize = require("../config/connection");

// Reminder- import any models you want to seed here
const { User, Hobby, Post, Comment, UserHobbies } = require("../models");

// Reminder- import any data you want to seed here
const hobbyData = require("./hobbyData.json");
const userData = require("./userData.json");
const postData = require("./postData.json");
const commentData= require("./commentData.json");
const userHobbyData = require("./UserHobbiesData.json")
const seedDatabase = async () => {
  // sync all models
  await sequelize.sync({ force: true });
  console.log("Sequelize synced");

  // bulkCreate example users
  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  console.log("Users created");

  // bulkCreate example data
  await Hobby.bulkCreate(hobbyData, {
    
    returning: true,
  });
  console.log("Hobbies data created");

  await Post.bulkCreate(postData, {
    
    returning: true,
  });
  console.log("new Post data created");
  await Comment.bulkCreate(commentData,{
    returning: true,
  })
  console.log("new Comment data added");

  // Reminder- add any other models you want to seed here
  await UserHobbies.bulkCreate(userHobbyData,{
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
