const mongoose = require("mongoose")

const LinkSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    link: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    linkID: {
        type: String,
        required: true
    },
    folderID: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Link", LinkSchema)