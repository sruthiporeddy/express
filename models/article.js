const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const ArticleSchema = new mongoose.Schema({
    slug: {
        type: String,
        lowercase: true,
        unique: true
    },
    title: String,
    description: String,
    body: String,
    favoritesCount: {
        type: Number,
        default: 0
    },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

ArticleSchema.plugin(uniqueValidator, {message: 'is already taken'});

ArticleSchema.methods.toJSONFor = function(user) {
    return {
        slug: this.slug,
        title: this.title,
        description : this.description,
        body: this.body,
        author: this.author.toProfileJSONFor(user)
    }
}

mongoose.model('Article', ArticleSchema);