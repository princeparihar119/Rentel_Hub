const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const path = require("path");
const listingController = require("../controllers/listings.js");

//multer
const multer  = require('multer')
const { storage } = require("../cloudConfig.js")
const upload = multer({ storage });

//views listing index.ejs
router.get("/", wrapAsync(listingController.index));

//new.ejs
router.get("/new", isLoggedIn, listingController.renderNewForm);

//show.ejs
router.get("/:id", wrapAsync(listingController.showListing));

//Create route, Post Route
router.post("/", isLoggedIn, upload.single('listing[image]'), validateListing, wrapAsync(listingController.createListing));

//edit
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

// update route
router.put("/:id", isLoggedIn, isOwner, upload.single('listing[image]'), validateListing, wrapAsync(listingController.updateListing));

//Delete Route
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

module.exports = router;