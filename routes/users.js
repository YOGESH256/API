const router = require("express").Router();
const User = require("../models/User");
const auth = require("../middleware/auth")
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const jwt = require("jsonwebtoken");

router.get("/user" , auth ,  async(req , res) => {

  try {
   const {  user : loggedInuser} = req.user;
   res.json(loggedInuser);









  } catch (e) {
    console.log(e);
     res.status(500).json(e);

  }

})


router.post("/follow/:id" , auth,  async(req , res) => {
  const {user :loggedInuser} = req.user;
  if(loggedInuser._id !== req.params.id)
  {


    const user = await User.findById(req.params.id)
    const currentUser = await User.findById(loggedInuser._id)

    if(!user.followers.includes(loggedInuser._id))
    {
      await user.updateOne({$push : {followers : loggedInuser._id}})
      await currentUser.updateOne({$push : {following : user._id}})

      res.status(200).json("User has been follwed");



    }
    else {
      res.status(403).json("you can follow yourself")
    }



  }
  else {
    res.status(403).json("You can't follow yourself");
  }
})


router.post("/unfollow/:id" , auth,  async(req , res) => {
  const {user :loggedInuser} = req.user;
  if(loggedInuser._id !== req.params.id)
  {


    const user = await User.findById(req.params.id)
    const currentUser = await User.findById(loggedInuser._id)

    if(user.followers.includes(loggedInuser._id))
    {
      await user.updateOne({$pull : {followers : loggedInuser._id}})
      await currentUser.updateOne({$pull : {following : user._id}})

      res.status(200).json("User has been unfollwed");



    }
    else {
      res.status(403).json("you don't follow this user")
    }



  }
  else {
    res.status(403).json("You can't unfollow yourself");
  }
})




router.post('/posts' ,auth , async(req , res) => {


  const {user :loggedInuser} = req.user;

console.log(loggedInuser._id);

  try {
      const { title , desc} = req.body;


       const post = new Post({
         userId:loggedInuser._id,
         title,
         desc
       })

       console.log(post);

       const savedPost = await post.save()

       // console.log(savedPost);


       res.status(200).json({
         title: savedPost.title,
         desc: savedPost.desc,
         postId: savedPost._id,
         createdAt: savedPost.createdAt.toString()


       });



       console.log("j");


  } catch (e) {

    console.log(e);
res.status(401).json(e);
  }



})


router.delete('/posts/:id' ,auth , async(req , res) => {


const {user :loggedInuser} = req.user;

  try {
   const post = await Post.findById(req.params.id);

   console.log(loggedInuser._id);
   console.log(post.userId);

   if (post.userId.toString() === loggedInuser._id) {
     await post.deleteOne();
     res.status(200).json("the post has been deleted");
   } else {
     res.status(403).json("you can delete only your post");
   }
 } catch (err) {
   res.status(500).json(err);
 }




})


router.post("/like/:id", auth , async (req, res) => {

  const {user :loggedInuser} = req.user;

  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(loggedInuser._id)) {
      await post.updateOne({ $push: { likes: loggedInuser._id } });
      res.status(200).json("The post has been liked");
    } else {
      res.status(200).json("You have already like this post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post("/unlike/:id",auth, async (req, res) => {

  const {user :loggedInuser} = req.user;

  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(loggedInuser._id)) {

      res.status(200).json("The post can't be unliked twice");
    } else {
      await post.updateOne({ $pull: { likes: loggedInuser._id} });
      res.status(200).json("The post has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post("/comment/:id",auth, async (req, res) => {

  const {user :loggedInuser} = req.user;

  try {

    var comment = await Comment.create({
               'user': loggedInuser._id,
               'content': req.body.content,
               'onModel': "Post",
               'modelRef': req.params.id
           })


        commentSaved =    await comment.save();
        const post = await Post.findById(req.params.id );
        await post.updateOne({ $push: { comments: commentSaved._id} });


      res.status(200).json("The comment has been added to the post");


  } catch (err) {
    res.status(500).json(err);
  }
});



router.post("/posts/:id",auth, async (req, res) => {

  const {user :loggedInuser} = req.user;

  try {

    const post = await Post.find({ _id :req.params.id ,  }).populate('likes comments');







      res.status(200).json({
        post

      });


  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/all_posts",auth, async (req, res) => {

  const {user :loggedInuser} = req.user;

  try {

    const posts = await Post.find({userId : loggedInuser._id}).populate('likes comments');

const ld = []


 posts.map( (post) => {


 ld.push({id : post._id , title : post.title , desc: post.desc , createdAt:post.createdAt , comments:post.comments , likeslength :post.likes.length })


})








      res.status(200).json({
        ld

      });


  } catch (err) {
    res.status(500).json(err);
  }
});








module.exports = router
