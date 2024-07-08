const Folder = require("../models/Folder")
const Link = require("../models/Link")
const generateRandomString = require("../utils/generateRandomString.js")

module.exports.create = async (req, res) => {
    try {
        const formattedDate =  new Date().toLocaleDateString('ru-RU', options = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })

        let countDocuments = await Folder.countDocuments()
        
        let folder = await Folder.create({ 
            title: req.body.title,
            folderID: generateRandomString(20),
            userID: req.body.userID,
            dateOfCreated: formattedDate,
            position: countDocuments
        })

        res.send(folder) 
    } catch (err) {
        console.log(err.message);
        res.status(400).send(err.message)
    }
}

module.exports.deleteFolderByFolderID = async (req, res) => {
    try {
        await Folder.findOneAndDelete({ folderID: req.query.folderID })

        res.send({ status: "misha" })
    } catch (error) {
        console.log(error.message);
        res.status(400).send(error.message)
    }
}

module.exports.getFolderByFolderID = async (req, res) => {
    try {
        let result = await Folder.findOne({ folderID: req.query.folderID }).exec()
        if (result == null) res.status(404).send("Not Found")
        else res.send(result)
    } catch (error) {
        console.log(error.message);
        res.status(400).send(error.message)
    }
}

module.exports.getFoldersByUserID = async (req, res) => {
    try {
        let result = await Folder.find({userID: req.query.userID}).exec()
        
        if (result == null) res.status(404).send("Not Found")
        else res.send({ folders: result })
    } catch (error) {
        console.log(error.message);
        res.status(400).send(error.message)
    }
}
