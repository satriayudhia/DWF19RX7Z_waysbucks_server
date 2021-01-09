const { Product } = require("../../models");
const Joi = require("joi");

//GET ALL PRODUCTS
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (!products) {
      return res.status(400).send({
        status: "data product empty",
        data: [],
      });
    }

    res.send({
      status: "success",
      data: {
        products,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      error: {
        status: "server error",
      },
    });
  }
};

//GET SPECIFIC PRODUCT BY ID
exports.getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({
      where: { id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (!product) {
      return res.status(400).send({
        status: "data product not found",
        data: [],
      });
    }

    res.send({
      status: "success",
      data: {
        product,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      error: {
        status: "server error",
      },
    });
  }
};

//ADD NEW PRODUCT
exports.addProduct = async (req, res) => {
  try {
    const { body, files } = req;
    const fileName = files.photo[0].filename;

    const schema = Joi.object({
      name: Joi.string().min(3).required(),
      price: Joi.number().min(5).required(),
    });

    const { error } = schema.validate(body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).send({
        status: "validation error",
        error: {
          message: error.details.map((error) => error.message),
        },
      });
    }

    const product = await Product.create({ ...body, photo: fileName });

    res.send({
      status: "success",
      data: {
        product,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      error: {
        status: "server error",
      },
    });
  }
};

//EDIT PRODUCT
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { body, files } = req;
    const fileName = files.photo[0].filename;

    //Cek apakah produk dengan id yg input ada
    const checkProduct = await Product.findOne({ where: { id } });

    if (!checkProduct) {
      return res.status(400).send({
        status: "data not found",
        data: {
          post: null,
        },
      });
    }

    await Product.update({ ...body, photo: fileName }, { where: { id } });

    const product = await Product.findOne({ where: { id } });

    res.send({
      status: "success",
      data: {
        product,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      error: {
        status: "server error",
      },
    });
  }
};

//DELETE PRODUCT BY ID
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({
      where: { id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (!product) {
      return res.status(400).send({
        status: "data product not found",
        data: [],
      });
    }

    await Product.destroy({ where: { id } });

    res.send({
      status: "success",
      data: {
        id,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      error: {
        status: "server error",
      },
    });
  }
};

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
