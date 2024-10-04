const mongoose = require("mongoose");

  const productSchema = new mongoose.Schema({

    name: { type: String,  required: true,},

    description: {type: String, required: true,},

    price: {type: Number, required: true,},

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'},

    image: {type: String,required: true,},

    rating: {type: Number, default: 0},

    numReviews: {type: Number,default: 0,}
});




  module.exports = mongoose.model("Product", productSchema);
