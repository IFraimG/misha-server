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
        let folders = await Folder.find({userID: req.query.userID}).exec()
        let foldersUpdate = []
        
        if (folders == null) res.status(404).send("Not Found")
        else {
            for (let i = 0; i < folders.length; i++) {
                let link = await Link.find({ folderID: folders[i].folderID }).limit(1)
                foldersUpdate.push({
                    title: folders[i].title,
                    folderID: folders[i].folderID,
                    userID: folders[i].userID,
                    dateOfCreated: folders[i].dateOfCreated,
                    position: folders[i].position,
                    preview: link != null && link?.length && link[0]?.image != null > 0 ? link[0].image : ""
                })
            }
            res.send({ folders: foldersUpdate })
        }
    } catch (error) {
        console.log(error.message);
        res.status(400).send(error.message)
    }
}

module.exports.findFoldersByTitle = async (req, res) => {
    try {
        const titleRegex = new RegExp(`^${req.query.title}`, 'i')

        let folders = await Folder.find({ title: { $regex: titleRegex }, userID: req.query.userID }).exec()
        let foldersUpdate = []
        
        if (folders == null) res.status(404).send("Not Found")
        else {
            for (let i = 0; i < folders.length; i++) {
                let link = await Link.find({ folderID: folders[i].folderID }).limit(1)
                foldersUpdate.push({
                    title: folders[i].title,
                    folderID: folders[i].folderID,
                    userID: folders[i].userID,
                    dateOfCreated: folders[i].dateOfCreated,
                    position: folders[i].position,
                    preview: link != null ? link[0].image : ""
                })
            }
            res.send({ folders: foldersUpdate })
        }
    } catch (error) {
        console.log(error.message);
        res.status(400).send(error.message)
    }
}