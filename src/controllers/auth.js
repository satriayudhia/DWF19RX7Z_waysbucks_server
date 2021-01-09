const {User} = require('../../models')
const Joi = require('joi')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.register = async (req, res) => {
    try {
        const {body} = req

        const schema = Joi.object({
            fullname: Joi.string().min(2).required(),
            email: Joi.string().email().min(10).required(),
            password: Joi.string().min(8).required(),
            profpic: Joi.string(),
            status: Joi.string(),
            isAdmin: Joi.boolean()
        })

        const { error } = schema.validate(body, {
            abortEarly: false,
        });

        if (error) {
            return res.status(400).send({
              status: "input validation error",
              error: {
                message: error.details.map((error) => error.message),
              },
            });
        }

        const {email} = req.body
        const userCheck = await User.findOne({where: {email}})

        if(userCheck) {
            return res.status(400).send({
                status: "email already registered",
                data: []
            })
        }

        const {fullname, password, status, profpic, isAdmin} = body
        const hashedPassword = await bcrypt.hash(password, 10)

        console.log("hashpassword::", hashedPassword)

        const newUser = await User.create({
            fullname,
            password: hashedPassword,
            email,
            status,
            profpic,
            isAdmin
        })

        const privateKey = "W4ysBucks"

        const token = jwt.sign({id: newUser.id}, privateKey)

        res.send({
            status: "success",
            data: {
                name: newUser.name,
                email: newUser.email,
                token
            }
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

exports.login = async (req, res) => {
    try {
      const { body } = req
  
      //validasi login
      const schema = Joi.object({
        email: Joi.string().email().min(10).required(),
        password: Joi.string().min(8).required()
      })
  
      const { error } = schema.validate(body, {
        abortEarly: false
      })
  
      //jika ada error stop disini dan kirim response error
      if (error) {
        return res.status(400).send({
          status: "input validation error",
          error: {
            message: error.details.map((error) => error.message)
          }
        })
      }
  
      const { email, password } = req.body;
  
      //cek apakah email terdaftar
      const user = await User.findOne({
        where: {
          email
        },
      })
  
      //jika tidak terdaftar makan invalid login
      if (!user) {
        return res.status(400).send({
          status: "login failed",
          error: {
            message: "invalid login"
          }
        })
      }
  
      //melakukan comparasi terhadapat password yang diinput oleh user
      //dengan password yang ada di database
      const validPass = await bcrypt.compare(password, user.password);
  
      //jika password gak valid maka bilang invalid login
      if (!validPass) {
        return res.status(400).send({
          status: "login failed",
          error: {
            message: "invalid login"
          }
        })
      }
  
      const privateKey = "W4ysBucks"
      const token = jwt.sign(
        {
          id: user.id,
        },
        privateKey
      );
  
      //response login dengan token
      res.send({
        status: "success",
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token,
        }
      })
    } catch (err) {
      //error here
      console.log(err);
      return res.status(500).send({
        error: {
          message: "Server Error"
        }
      })
    }
  }
  

  exports.checkAuth = async (req, res) => {
    try {
      const userId = req.user.id
      const user = await User.findOne({
        where: {
          id: userId
        }
      })

      res.send({
        status: "success",
        message: "user valid",
        data: user
      })
      
    } catch (error) {
      console.log(err);
      return res.status(500).send({
        error: {
          message: "Server Error"
        }
      })
    }
  }