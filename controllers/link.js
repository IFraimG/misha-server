const Link = require("../models/Link")
const generateRandomString = require("../utils/generateRandomString.js")
const fs = require("fs");

module.exports.create = async (req, res) => {
    try {
        const body = JSON.parse(req.body.body);

        let linkResult = await Link.create({ 
            title: body.title,
            description: body.description,
            linkID: generateRandomString(20),
            folderID: body.folderid,
            link: body.link,
            image: req.file?.filename != null ? req.file?.filename : "",
        })

        res.send(linkResult)
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