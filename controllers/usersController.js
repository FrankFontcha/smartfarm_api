const config = require("../config")
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const requestIP = require("request-ip");

exports.login = (req, res) => {
    let payload = {
        "email": req.body.email,
        "userip": "0.0.0.0",
        "role": "user",
    }

    const dataUser = new User(req.body)

    dataUser.save((error, savedUser) => {
        if (error) {
            if (error.message) {
                res.json({ status: 400, error: error.message })
            } else {
                res.json({ status: 400, error: error })
            }
        } else {
            const userToken = jwt.sign(payload, config.app.jwtToken)
            res.json({ status: 200, token: userToken, data: savedUser })
        }
    })
};

exports.register = (req, res) => {

    let payload = {
        "login": req.body.username,
        "email": req.body.email,
        "userip": "",
    }

    const dataUser = new User(req.body)

    dataUser.save((error, savedUser) => {
        if (error) {
            if (error.message) {
                res.json({ status: 400, error: error.message })
            } else {
                res.json({ status: 400, error: error })
            }
        } else {
            const userToken = jwt.sign(payload, config.app.jwtToken)
            res.json({ status: 200, token: userToken, data: savedUser })
        }
    })
};