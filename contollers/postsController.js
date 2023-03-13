const Post = require('../models/post');
const Comment = require('../models/comment');
module.exports.create = async  function(req,res){
    try{
        let posts = await Post.create({
            content:req.body.content,
            user:req.user._id
        });
        req.flash('success','Post published!');
        return res.redirect('back');
    }
    catch(err ){
        req.flash('error',err);
        return;
        
    };
    
};

module.exports.deletePost = async function(req,res){
    
    let post  = await Post.findByIdAndDelete(req.params.id);
    if(post.user == req.user.id){

        let c = await Comment.deleteMany( {post:req.params.id});
        req.flash('success','Post and assosiated comments deleted');
        return res.redirect('back');


    }else{
        req.flash('error','You can not delete this post');
        return res.redirect('back');
    }
}          