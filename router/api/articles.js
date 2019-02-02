const mongoose = require('mongoose');
const router = require('express').Router();
const User = mongoose.model('User');
const Article = mongoose.model('Article');
const auth = require('../auth')


router.post('/', auth.required, function(req,res,next){
   
    User.findById(req.payload.id).then((user) => {
        if(!user) {
            return res.sendStatus(401);
        }
       
        var article = new Article(req.body);
        article.author = user;
        return article.save().then(() => {
            console.log(article.author.username);
            return res.json({article: article.toJSONFor(user)})
        })
    }).catch(next);
})

router.get('/',auth.optional, function(req,res,next){
    console.log(req.query.author);

    let author = new Promise((resolve,reject)=>{
        resolve(User.findOne({username: req.query.author}));
        reject('error message');
    })
    author.then((results) => {
        console.log(results)
    }).catch(console.log('error'));
    
});

module.exports = router;