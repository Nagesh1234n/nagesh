const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    description: String,
    // image:{
      
    //     type: String,
       
    //   
    //     default:"https://gardenfl.com/wp-content/uploads/2020/02/coconut-cluster-on-coconut-tree-PN99UCT-scaled.jpg",
    //     set: (v) => v ===""? "https://gardenfl.com/wp-content/uploads/2020/02/coconut-cluster-on-coconut-tree-PN99UCT-scaled.jpg": v,
    // },
    image: {
        filename: String,
        url: String,
        
    },
    
   
    price: {
        type: Number,
    },
    location: {
        type: String,
    },
    country: {
        type: String,
    },
    reviews:[
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        }
    ],
    owner:{
        type: Schema.Types.ObjectId,
        ref:"User",
    }

});
// post mongoose middleware
// middleware if call->findByIdAndDelete(id), in delete listing
listingSchema.post("findOneAndDelete", async(listing)=>{
    if(listing){
        await Review.deleteMany({_id: {$in:listing.reviews}});
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;