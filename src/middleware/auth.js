const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  // const token = req.headers["x-access-token"]

  let header, token
  if (
    !(header = req.header("Authorization")) ||
    !(token = header.replace("Bearer ",""))
  ) {
    return res.status(400).send({
      status: "response fail",
      error: {
        message: "access denied"
      }
    })
  }

  try {
    // if (!token) {
    //   return res.status(400).send({
    //     status: "Response fails",
    //     error: {
    //       message: "Access Denied"
    //     }
    //   })
    // } else {
    //   jwt.verify(token, "W4ysbucks", (err, decoded) => {
    //     if (err) {
    //       res.json({auth: false, message: "failed to authenticate"})
    //     } else {
    //       req.user = decoded.user
    //       next()
    //     }
    //   })
    // }

    const privateKey = "W4ysBucks"
    //lakukan verify token oleh jsonwebtoken
    const verified = jwt.verify(token, privateKey)

    //tambahkan request user sehingga bisa diakses di next function, middleware, etc
    req.user = verified

    //lanjut ke berikutnya
    next()
  } catch (err) {
    console.log("token", token)
    //jika proses verify gagal maka kirim response invalid token
    return res.status(401).send({
      status: "response fail",
      error: {
        message: "invalid token",
      },
    });
  }
};
