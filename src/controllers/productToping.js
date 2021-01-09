const { ProductToping } = require("../../models");
const Joi = require("joi");

//ADD NEW PRODUCT-TOPING
exports.addProductToping = async (req, res) => {
  try {
    const { body } = req;

    const schema = Joi.object({
      transactionId: Joi.number().required(),
      ProductId: Joi.number().required(),
      TopingId: Joi.optional(),
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

    const productToping = await ProductToping.create(body);

    res.send({
      status: "success",
      data: {
        productToping,
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

//DELETE PRODUCT-TOPING BY PRODUCT ID & TRANSACTION ID
exports.deleteProductToping = async (req, res) => {
  try {
    const { idTransaction } = req.params;
    const { body } = req;
    console.log("ID TRANSACTION", idTransaction);
    console.log("BODY", body);

    await ProductToping.destroy({
      where: { transactionId: idTransaction, productId: body.productId },
    });

    res.send({
      status: "success",
      data: [],
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
