const express = require("express");
const router = express.Router({mergeParams: true});// to receive id or other info
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {reviewSchema} = require("../schema.js");
const reviews = require("../routes/review.js");
const Review = require("../models/review.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");

// validation for schema middlewares -> middleware



// reviews
// post Route
router.post("/",isLoggedIn, validateReview, wrapAsync(reviewController.createReview));


// delete review rout
router.delete("/:reviewId",isLoggedIn, isReviewAuthor, wrapAsync(reviewController.destroyReview));

module.exports = router;
