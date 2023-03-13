const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create =async function(req,res){
    try{    
        let post = await Post.findById(req.body.post);

        if (post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
            post.comments.push(comment);
            post.save();

            return res.redirect('/');
            
        }
    
    }catch(err){
        console.log('Error while creating a comment',err);
    }


}

module.exports.destory = async function(req,res){
    try{
        let comment = await  Comment.findById(req.params.id);
        if(comment.user == req.user.id){
           console.log('inside if of destroy comment');
            let postId = comment.post;
            Comment.findByIdAndDelete(req.params.id);
            let post = await Post.findByIdAndUpdate(postId, { $pull : { comments : req.params.id}});
            
            
            return res.redirect('back');
            
        } else{
            return res.redirect('back');
        }
    }catch(err){
        console.log('Error while deleting comment',err);
        return;
    }
   
};