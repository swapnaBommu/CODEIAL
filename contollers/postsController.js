const Post = require('../models/post');
const Comment = require('../models/comment');
module.exports.create = async  function(req,res){
    try{
        let posts = await Post.create({
            content:req.body.content,
            user:req.user._id
        });
        return res.redirect('back');
    }
    catch(err ){
        console.log('error in creating the post'); 
        return;
        
    };
    
};

module.exports.deletePost = async function(req,res){
    
    let post  = await Post.findByIdAndDelete(req.params.id);
    console.log(post.user);
    console.log(req.user.id);
        if(post.user == req.user.id){
            console.log('inside if');
           

            let c = await Comment.deleteMany( {post:req.params.id});
            return res.redirect('back');


        }else{
            return res.redirect('back');
        }
}          