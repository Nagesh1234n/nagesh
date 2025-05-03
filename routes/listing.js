const express = require("express");
const router = express.Router();

const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema, reviewSchema} = require("../schema.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer');// require
const {storage} = require("../cloudConfig.js");

const upload = multer({ storage });// save file in uploads folder


router
.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn, upload.single("listing[image]"),wrapAsync(listingController.createListing));
// .post(upload.single('listing[image]'),(req, res)=>{
//  validateListing,  res.send(req.file);
// });

//create new listings
router.get("/new",isLoggedIn,(listingController.renderNewForm) );

router
.route("/:id")
.get( wrapAsync(listingController.showListing))
.put(isLoggedIn, isOwner, upload.single("listing[image]"),validateListing,wrapAsync(listingController.updateListing))
.delete(isLoggedIn, isOwner, wrapAsync(listingController.distroyListing));

// index rout
//router.get("/", wrapAsync(listingController.index));

// show rout
//router.get("/:id", wrapAsync(listingController.showListing));



//edit rout
router.get("/:id/edit", isLoggedIn, isOwner,wrapAsync(listingController.renderEditForm));

//update rout
//router.put("/:id",validateListing,isLoggedIn, isOwner,wrapAsync(listingController.updateListing));

// Delete rout
//router.delete("/:id",isLoggedIn, isOwner, wrapAsync(listingController.distroyListing));

module.exports = router;

