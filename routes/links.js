const express = require('express');
const router = express.Router();
const taskController = require('../controllers/link.js');
let passport = require("../configs/passportConfig.js")
let upload = require("../configs/upload.js")

router.post("/create", upload.single("img"), passport.authenticate('jwt', { session: false }), taskController.create)
router.get("/getLinkByID", passport.authenticate('jwt', { session: false }), taskController.getLinkByID)
router.get("/getLinksByFolderID", passport.authenticate('jwt', { session: false }), taskController.getLinksByFolderID)
router.delete("/deleteLinkByLinkID", passport.authenticate('jwt', { session: false }), taskController.deleteLinkByLinkID)
router.put("/moveLinkToOtherFolder", passport.authenticate('jwt', { session: false }), taskController.moveLinkToOtherFolder)

module.exports = router;