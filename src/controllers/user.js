const {User} = require('../../models')

//GET ALL USERS
exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll()

        if(!users) {
            return res.status(400).send({
                status: "user data empty",
                data: []
            })
        }

        res.send({
            status: "success",
            data: {users: users}
        })
    } catch (err) {
        console.log(err)
        return res.status(500).send({
            error: {
                message: "server error"
            }
        })
    }
}

//GET SPECIFIC User BY ID
exports.getUser = async (req, res) => {
    try {
        const {id} = req.params
        const user = await User.findOne({where: {id},
        attributes: {
            exclude: ["createdAt", "updatedAt"]
        }})

        if(!user) {
            return res.status(400).send({
                status: "data user not found",
                data: []
            })
        }

        res.send({
            status: "success",
            user
        })
    } catch (err) {
        console.log(err)
        return res.status(500).send({
            error: {
                status: "server error"
            }
        })
    }
}

//EDIT PRODUCT
exports.updateUser = async (req, res) => {
    try {
        const {body, files} = req
        console.log("FILE", files)
        const fileName = files.profpic[0].filename
        const {id} = req.params
        console.log("BODY", body)
        
        const checkUser = await User.findOne({where: {id}})

        if (!checkUser) {
            return res.status(400).send({
              status: "data user not found",
              data: []
            })
        }

        await User.update({...body, profpic: fileName}, {where: {id}})

        const user = await User.findOne({where: {id}})

        res.send({
            status: "success",
            data: {
                user
            }
        })
    } catch (err) {
        console.log(err)
        return res.status(500).send({
            error: {
                status: "server error"
            }
        })
    }
}

//DELETE USER BY ID
exports.deleteUser = async (req, res) => {
    try {
        // let users = await Users.findAll()
        const {id} = req.params
        const checkUserById = await User.findOne({where: {id}})

        if (!checkUserById) {
            res.send({
                status: "user data not found",
                data: []
            })
        }

        await User.destroy({where: {id}}).then(user => {
            res.send({
                status: "success",
                data: {
                    id
                }
            })
        })
    } catch (err) {
        console.log(err)
        return res.status(500).send({
            error: {
                message: "Server Error"
            }
        })
    }
}

