const {Toping} = require('../../models')
const Joi = require('joi')

//GET ALL TOPINGS
exports.getTopings = async (req, res) => {
    try {
        const topings = await Toping.findAll({
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            }
        })

        if(!topings) {
            return res.status(400).send({
                status: "data toping empty",
                data: []
            })
        }

        res.send({
            status: "success",
            data: {
                topings
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

//GET SPECIFIC TOPING BY ID
exports.getToping = async (req, res) => {
    try {
        const {id} = req.params
        const toping = await Toping.findOne({where: {id},
        attributes: {
            exclude: ["createdAt", "updatedAt"]
        }})

        if(!toping) {
            return res.status(400).send({
                status: "data toping not found",
                data: []
            })
        }

        res.send({
            status: "success",
            data: {
                toping
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

//ADD NEW TOPING
exports.addToping = async (req, res) => {
    try {
        const {body, files} = req
        const fileName = files.photo[0].filename

        const schema = Joi.object({
            name: Joi.string().min(3).required(),
            price: Joi.number().min(3).required()
        })

        const { error } = schema.validate(body, {
            abortEarly: false,
        })

        if (error) {
            return res.status(400).send({
              status: "validation error",
              error: {
                message: error.details.map((error) => error.message)
              }
            })
        }

        const toping = await Toping.create({...body, photo: fileName})

        res.send({
            status: "success",
            toping
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

//EDIT TOPING
exports.updateToping = async (req, res) => {
    try {
        const {id} = req.params
        const {body} = req

        const checkToping = await Toping.findOne({where: {id}})

        if (!checkToping) {
            return res.status(400).send({
              status: "data not found",
              data: {
                post: null,
              },
            });
        }

        const schema = Joi.object({
            name: Joi.string().min(3),
            price: Joi.number().min(3)
        })

        const { error } = schema.validate(body, {
            abortEarly: false,
        })

        if (error) {
            return res.status(400).send({
              status: "validation error",
              error: {
                message: error.details.map((error) => error.message)
              }
            })
        }

        await Toping.update(body, {where: {id}})

        const toping = await Toping.findOne({where: {id}})

        res.send({
            status: "success",
            data: {
                toping
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

//DELETE TOPING BY ID
exports.deleteToping = async (req, res) => {
    try {
        const {id} = req.params
        const toping = await Toping.findOne({where: {id},
        attributes: {
            exclude: ["createdAt", "updatedAt"]
        }})

        if(!toping) {
            return res.status(400).send({
                status: "data toping not found",
                data: []
            })
        }

        await Toping.destroy({where: {id}})

        res.send({
            status: "success",
            data: {
                id
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

//RESTORE DELETED PRODUCT
// exports.restoreProduct = async (req, res) => {
//     try {
//         const {id} = req.params
//         const product = await Products.restore({where: {id}})

//         res.send({
//             status: `product with id: ${id} successfully restored`,
//             product
//         })
//     } catch (err) {
//         console.log(err)
//         return res.status(500).send({
//             error: {
//                 status: "server error"
//             }
//         })
//     }
// }
