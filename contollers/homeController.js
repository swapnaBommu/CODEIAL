module.exports.home = function(req,res){

    return res.end('<h1>Express is up for codeial </h1>');
};

module.exports.home2 = function(req,res){
    return res.send('<P>This is second home controlser</p>');
};