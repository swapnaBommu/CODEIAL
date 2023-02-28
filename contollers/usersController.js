module.exports.profile = function(req,res){
    return res.render('users',{
        title:"Users"
    });
};
module.exports.name = function(req,res){
    return res.end("<h1>USERS name</h1>");
};