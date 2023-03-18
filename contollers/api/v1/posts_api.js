const Post = require('../../../models/post');
const Comment = require('../../../models/comment');
module.exports.index =async function(req,res){


    let posts = await Post.find({})
        .sort('createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });

    return res.json(200,{
        message:'list of posts',
        posts:posts
    });
}

module.exports.deletePost = async function(req,res){
    try{
        let post  = await Post.findById(req.params.id);
        //if(post.user == req.user.id){
            Post.findByIdAndDelete(req.params.id);
            let c = await Comment.deleteMany( {post:req.params.id});
            
            return res.json(200,{
                message:'posts and associated comments deleted successfully'
                
            });
            return res.redirect('back');
    
    
        // }else{
        //     req.flash('error','You can not delete this post');
        //     return res.redirect('back');
        // }

    }catch(err){
        return res.json(500,{
            message:'internal server error'
        });
    }
   
} 