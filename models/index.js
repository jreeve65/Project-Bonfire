// import all models here
const User = require("./User");
const Hobby = require("./Hobby");
const Post = require("./Post");
const Comment = require("./Comment");
const Event = require("./Event");
const UserHobbies = require("./UserHobbies.js");

// Hobbies to User relationships
Hobby.belongsToMany(User, {through:{ model: UserHobbies,}});
User.belongsToMany(Hobby, { through:{ model: UserHobbies,} });
// Hobby.belongsToMany(User,{
//   foreignKey: 'user_id',
// });
//Hobby
Hobby.hasMany(Post,{
  foreignKey: 'hobby_id',
});

Hobby.hasMany(Event,{
  foreignKey: 'hobby_id',
})

//User
User.hasMany(Post,{
  foreignKey: 'user_id',
});
User.hasMany(Comment,{
  foreignKey: 'user_id',
});
User.hasMany(Event,{
  foreignKey: 'user_id',
});

//Post
Post.belongsTo(Hobby,{
  foreignKey: 'hobby_id',
});
Post.belongsTo(User,{
  foreignKey: 'user_id',
});
Post.hasMany(Comment,{
  foreignKey: 'post_id',
});
//Comment
Comment.belongsTo(Post,{
  foreignKey:'post_id',
});
Comment.belongsTo(User,{
  foreignKey: 'user_id',
});
//Event
Event.belongsTo(Hobby,{
  foreignKey:'hobby_id',
});
Event.belongsTo(User,{
  foreignKey: 'user_id',
});

module.exports = { User, Hobby, Post, Event,Comment,UserHobbies};
