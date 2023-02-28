module.exports.home = function(req,res){

    return res.render('home',{
        title:"Home"
    });
};

module.exports.home2 = function(req,res){
    return res.send('<P>This is second home controlser</p>');
};