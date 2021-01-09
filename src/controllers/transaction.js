const { Transaction, User, Product, Toping } = require("../../models");
const Joi = require("joi");

// ==================== //
// GET ALL TRANSACTIONS //
// ==================== //
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "UserId", "userId"],
      },
      include: [
        {
          model: User,
          as: "user",
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "status",
              "isAdmin",
              "password",
              "profpic",
            ],
          },
        },
        {
          model: Product,
          through: { attributes: [] },
          as: "products",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
          include: [
            {
              model: Toping,
              as: "topings",
              through: { attributes: [] },
              attributes: {
                exclude: ["createdAt", "updatedAt", "photo"],
              },
            },
          ],
        },
      ],
    });

    if (!transactions) {
      return res.status(400).send({
        status: "data product empty",
        data: [],
      });
    }

    res.send({
      status: "success",
      data: {
        transactions,
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

// ===================== //
// GET TRANSACTION BY ID //
// ===================== //
exports.getTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findOne({
      where: { id },
      attributes: {
        exclude: ["createdAt", "updatedAt", "UserId", "userId"],
      },
      include: [
        {
          model: User,
          as: "user",
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "status",
              "isAdmin",
              "password",
              "profpic",
            ],
          },
        },
        {
          model: Product,
          through: { attributes: [] },
          as: "products",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
          include: [
            {
              model: Toping,
              as: "topings",
              through: { attributes: [] },
              attributes: {
                exclude: ["createdAt", "updatedAt", "photo"],
              },
            },
          ],
        },
      ],
    });

    if (!transaction) {
      return res.status(400).send({
        status: "data product empty",
        data: [],
      });
    }

    res.send({
      status: "success",
      data: {
        transaction,
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

// ========================== //
// GET TRANSACTION BY USER ID //
// ========================== //
exports.getTransactionUser = async (req, res) => {
  try {
    const { idUser } = req.params;
    console.log("idUser", idUser);
    const transaction = await Transaction.findOne({
      where: { userId: idUser },
      attributes: {
        exclude: ["createdAt", "updatedAt", "UserId", "userId"],
      },
      include: [
        {
          model: User,
          as: "user",
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "status",
              "isAdmin",
              "password",
              "profpic",
            ],
          },
        },
        {
          model: Product,
          through: { attributes: [] },
          as: "products",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
          include: [
            {
              model: Toping,
              as: "topings",
              through: { attributes: [] },
              attributes: {
                exclude: ["createdAt", "updatedAt", "photo"],
              },
            },
          ],
        },
      ],
    });

    if (!transaction) {
      return res.send({
        status: "transaction data empty",
        data: [],
      });
    }

    res.send({
      status: "success",
      data: {
        transaction,
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

// =================== //
// ADD NEW TRANSACTION //
// =================== //
exports.addTransaction = async (req, res) => {
  try {
    const { body } = req;
    // const fileName = files.attachment[0].filename

    const schema = Joi.object({
      userId: Joi.number().required(),
      name: Joi.string(),
      email: Joi.string().email(),
      phone: Joi.string().max(12).min(5),
      address: Joi.string().min(5),
      posCode: Joi.string(),
      status: Joi.string(),
      income: Joi.number(),
    });

    const { error } = schema.validate(body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).send({
        status: "validation error",
        errors: {
          message: error.details.map((detail) => detail.message),
        },
      });
    }

    const transaction = await Transaction.create(body);

    if (!transaction) {
      return res.status(400).send({
        status: "failed to add new transaction",
        data: [],
      });
    }

    const response = await Transaction.findOne({
      where: { id: transaction.id },
    });

    res.send({
      status: "success",
      data: {
        response,
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

// ================ //
// EDIT TRANSACTION //
// ================ //
exports.updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log("value id", id)
    const { body, files } = req;
    console.log("BODY", body);
    const fileName = files.attachment[0].filename;

    const schema = Joi.object({
      userId: Joi.number(),
      name: Joi.string(),
      email: Joi.string().email(),
      phone: Joi.string(),
      address: Joi.string().min(5),
      posCode: Joi.string(),
      status: Joi.string(),
      income: Joi.number(),
    });

    const { error } = schema.validate(body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).send({
        status: "validation error",
        errors: {
          message: error.details.map((detail) => detail.message),
        },
      });
    }

    const checkTransaction = await Transaction.findOne({ where: { id } });

    if (!checkTransaction) {
      return res.status(400).send({
        status: "data transaction not found",
        data: [],
      });
    }

    const transactionUpdate = await Transaction.update(
      { ...body, attachment: fileName },
      { where: { id } }
    );

    if (!transactionUpdate) {
      return res.status(400).send({
        status: "failed to edit transaction",
        data: [],
      });
    }

    const transaction = await Transaction.findOne({ where: { id } });

    res.send({
      status: "success",
      data: {
        transaction,
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

// ======================= //
// EDIT STATUS TRANSACTION //
// ======================= //
exports.updateTransactionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const schema = Joi.object({
      status: Joi.string(),
    });

    const { error } = schema.validate(body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).send({
        status: "validation error",
        errors: {
          message: error.details.map((detail) => detail.message),
        },
      });
    }

    const checkTransaction = await Transaction.findOne({ where: { id } });

    if (!checkTransaction) {
      return res.status(400).send({
        status: "data transaction not found",
        data: [],
      });
    }

    const transactionUpdate = await Transaction.update(body, { where: { id } });

    if (!transactionUpdate) {
      return res.status(400).send({
        status: "failed to edit transaction",
        data: [],
      });
    }

    const transaction = await Transaction.findOne({ where: { id } });

    res.send({
      status: "success",
      data: {
        transaction,
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

// ================== //
// DELETE TRANSACTION //
// ================== //
exports.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findOne({ where: { id } });

    if (!transaction) {
      return res.status(400).send({
        status: "data transaction not found",
        data: [],
      });
    }

    await Transaction.destroy({ where: { id } });

    res.send({
      status: "success",
      transaction,
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
