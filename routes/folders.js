const express = require('express');
const router = express.Router();
const folderController = require("../controllers/folder.js")
let passport = require("../configs/passportConfig.js")

router.post("/create", passport.authenticate('jwt', { session: false }), folderController.create)
router.delete("/deleteFolderByFolderID", passport.authenticate('jwt', { session: false }), folderController.deleteFolderByFolderID)
router.get("/getFolderByFolderID", passport.authenticate('jwt', { session: false }), folderController.getFolderByFolderID)
router.get("/getFoldersByUserID", passport.authenticate('jwt', { session: false }), folderController.getFoldersByUserID)

router.get("/findFoldersByTitle", passport.authenticate('jwt', { session: false }), folderController.findFoldersByTitle)


module.exports = router;