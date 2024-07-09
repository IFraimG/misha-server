const Link = require("../models/Link")
const generateRandomString = require("../utils/generateRandomString.js")

module.exports.create = async (req, res) => {
    try {
        console.log("req body", req.body)
        let link = await Link.create({ 
            title: req.body.title,
            description: req.body.description,
            linkID: generateRandomString(20),
            folderID: req.body.folderID,
            userID: req.body.userID,
            image: req.file.filename,
        })
        console.log(req.file);

        res.send(link)
    } catch (err) {
        console.log(err.message);
        res.status(400).send(err.message)
    }
}

module.exports.getLinkByID = async (req, res) => {
    try {
        let result = await Link.findOne({ linkID: req.query.linkID })

        if (result == null) res.status(404).send("Not Found")
        else res.send(result)
    } catch (error) {
        console.log(error.message);
        res.status(400).send(error.message)
    }
}

module.exports.getLinksByFolderID = async (req, res) => {
    try {
        let result = await Link.find({ folderID: req.query.folderID }).exec()

        if (result == null) res.status(404).send("Not Found")
        else res.send({ links: result })
    } catch (error) {
        console.log(error.message);
        res.status(400).send(error.message)
    }
}

module.exports.deleteLinkByLinkID = async (req, res) => {
    try {
        await Link.deleteOne({ linkID: req.query.linkID })
        
        res.send({ status: "misha" })
    } catch (error) {
        console.log(error.message);
        res.status(400).send(error.message)
    }
}

module.exports.moveLinkToOtherFolder = async (req, res) => {
    try {
        let link = await Link.findOne({ linkID: req.body.linkID }).exec()
        if (result == null) res.status(404).send("Not Found")
        else {
            link.folderID = req.body.folderID
            await link.save()
    
            res.send(link)
        }
    } catch (error) {
        console.log(error.message);
        res.status(400).send(error.message)
    }
}