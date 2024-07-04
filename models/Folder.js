const mongoose = require("mongoose")

const FolderSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false
    },
    folderID: {
        type: String,
        required: true
    },
    userID: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Folder", FolderSchema)