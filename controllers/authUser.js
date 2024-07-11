let User = require("../models/User.js")
let { jwtsecret } = require("../configs/jwt.js")
let jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const generateRandomString = require("../utils/generateRandomString.js")

module.exports.login = async (req, res) => {
  let user = await User.findOne({phone: req.body.phone}).exec()
  if (!user) {
    return res.status(404).send({ token: "" })
  } else {
    console.log("res", req.body);
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) return res.status(400).send({ token: "" })
    else {
      let token = jwt.sign({ 
        sub: user.id,
        phone: user.phone,
      }, jwtsecret)
      return res.send({token: "Bearer " + token, user: { phone: user.phone, id: user.id }})
    }
  }
}

module.exports.signup = async (req, res, next) => {
  const isUserWithPhone = await User.findOne({ phone: req.body.phone }).exec()
  console.log("res", req.body);
  if (isUserWithPhone != null) return res.status(403).send({ message: "Пользователь с такой почтой уже существует" })

  const salt = await bcrypt.genSalt(10)
  const password = await bcrypt.hash(req.body.password, salt);
  let user = await User.create({ password, phone: req.body.phone, id: generateRandomString(20) })
  let token = jwt.sign({
    sub: user.id,
    phone: user.phone
  }, jwtsecret)
  res.send({token: "Bearer " + token, user: { phone: user.phone, id: user.id }})
}